import { LanguageMap } from "@/constants/languages";
import { Chats } from "@/types/chats";
import { handleKeyDown } from "@/utils/keyDown";
import { formatTime } from "@/utils/timeFormatter";
import { PaperAirplaneIcon, PaperClipIcon } from "@heroicons/react/24/outline";
import { FormEvent, useState } from "react";

interface ChatInputProps {
  setChats: React.Dispatch<React.SetStateAction<Chats[]>>;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  showError: (message: string) => void;
  languageDetector: LanguageDetectorInstance | null;
}

export default function ChatInput({
  setChats,
  loading,
  setLoading,
  showError,
  languageDetector,
}: ChatInputProps) {
  const [inputText, setInputText] = useState("");

  const handleDetect = async (text: string) => {
    if (!languageDetector) return { name: "Unknown", langCode: "unknown" };

    try {
      const detectionResults = await languageDetector.detect(text);
      if (Array.isArray(detectionResults) && detectionResults.length > 0) {
        const detectedLangCode =
          detectionResults[0].detectedLanguage || "unknown";
        return {
          name: LanguageMap[detectedLangCode]?.name || "Unknown",
          langCode: detectedLangCode,
        };
      }
    } catch {
      showError("Language detection failed. Please try again.");
    }
    return { name: "Unknown", langCode: "unknown" };
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputText.trim()) {
      showError("Please enter text for processing.");
      return;
    }

    const timestamp = formatTime(new Date());
    const newChat = { text: inputText, time: timestamp, isUser: true };

    setChats((prev) => [...prev, newChat]);
    setInputText("");
    setLoading(true);

    try {
      const { name: detectedLang, langCode: detectedLangCode } =
        await handleDetect(inputText);

      setChats((prev) =>
        prev.map((chat, index) =>
          index === prev.length - 1
            ? { ...chat, detectedLang, detectedLangCode }
            : chat
        )
      );
    } catch {
      showError("Failed to process your message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="max-w-[808px] w-full mx-auto p-4"
      onSubmit={handleSubmit}
      aria-label="Message input form"
    >
      <div className="relative">
        <textarea
          className={`${
            inputText ? "py-3" : "pt-4"
          } px-14 rounded-2xl w-full border-2 border-[#CBD5E1] shadow-lg text-[#475569] focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5] focus:ring-opacity-50 min-h-20 sm:min-h-28 max-h-40 resize-none`}
          placeholder="Enter text..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Message input"
          role="textbox"
          aria-multiline="true"
        />
        <div className="absolute top-7 left-3 -translate-y-1/2 flex items-center justify-center rounded-full p-1">
          <PaperClipIcon className="size-6 text-[#94A3B8]" aria-hidden="true" />
        </div>
        <button
          type="submit"
          className="absolute top-7 right-3 -translate-y-1/2 p-2 w-10 rounded-md bg-[#4F46E5] flex items-center justify-center hover:bg-[#3B38D6] focus:ring-2 focus:ring-offset-2 focus:ring-[#4F46E5] disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
          aria-label="Send message"
        >
          <PaperAirplaneIcon className="size-5 text-white" aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}
