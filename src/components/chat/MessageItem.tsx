"use client";

import Typewriter from "@/hooks/useTypewriter";
import { Chats } from "@/types/chats";
import { getAvailableLanguages } from "@/utils/getLanguages";
import { summarizeText } from "@/utils/summarizer";
import { formatTime } from "@/utils/timeFormatter";
import { translateText } from "@/utils/translator";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { useState } from "react";
import Avater from "../../../public/images/avater.jpg";
import Sparkles from "../../../public/images/Sparkle.svg";

interface MessageItemProps {
  chat: Chats;
  index: number;
  chats: Chats[];
  setChats: React.Dispatch<React.SetStateAction<Chats[]>>;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  summarizer: SummarizerInstance | null;
  translator: TranslatorInstance | null;
  showError: (message: string) => void;
}

export default function MessageItem({
  chat,
  setChats,
  loading,
  setLoading,
  showError,
}: MessageItemProps) {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<{
    name: string;
    langCode: string;
  } | null>(null);

  const handleSummarize = async () => {
    if (!chat.text) return;

    setLoading(true);
    try {
      const summary = await summarizeText(chat.text);

      if (summary) {
        const aiSummarizedChat: Chats = {
          text: summary,
          time: formatTime(new Date()),
          isUser: false,
          isTyping: true,
        };

        setChats((prev) => [...prev, aiSummarizedChat]);
      }
    } catch {
      showError("Summarization failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleTranslate = async () => {
    if (!selectedLanguage) return;

    setLoading(true);
    try {
      const translation = await translateText(
        chat.text,
        selectedLanguage.langCode as TranslatorOptions["targetLanguage"]
      );

      if (translation) {
        const aiTranslatedChat = {
          text: translation,
          time: formatTime(new Date()),
          isUser: false,
          isTyping: true,
        };

        setChats((prev) => [...prev, aiTranslatedChat]);
      }
    } catch {
      showError("Translation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`flex gap-3 mb-4 ${
        chat.isUser ? "justify-end" : "justify-start"
      }`}
      style={{ animation: "fadeIn 0.3s ease-out" }}
    >
      {chat.isUser && (
        <Image
          width={24}
          height={24}
          src={Avater}
          alt="Your profile picture"
          className="w-6 h-6 rounded-full"
        />
      )}
      {!chat.isUser && (
        <Image
          width={24}
          height={24}
          src={Sparkles}
          alt="AI assistant avatar"
          className="w-6 h-6 rounded-full"
        />
      )}

      <div className="flex flex-col gap-1.5 max-w-[80%] items-start">
        <p className="font-bold text-base leading-[22px] tracking-[-0.112px] text-[#1E293B]">
          {chat.isUser ? "You" : "AI"}
          <span className="text-[#94A3B8] font-medium text-[14px] leading-6 tracking-[-0.084px] ml-3">
            {chat.time}
          </span>
        </p>
        <div
          className={`py-2 px-3 sm:p-4 rounded-xl sm:rounded-2xl text-[#475569] leading-[25.6px] w-full ${
            chat.isUser
              ? "bg-[#4F46E5] text-white"
              : "bg-[#F8FAFC] text-[#475569]"
          }`}
          role={chat.isUser ? "complementary" : "article"}
        >
          {chat.isUser || !chat.isTyping ? (
            chat.text
          ) : (
            <Typewriter text={chat.text} speed={20} />
          )}
        </div>

        {chat.detectedLang && (
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Detected Language:{" "}
            <span className="font-semibold">{chat.detectedLang}</span>
          </p>
        )}

        {chat.isUser && chat.detectedLang && (
          <div className="flex gap-2 mt-2 flex-wrap">
            {chat.text.length > 150 && (
              <button
                onClick={handleSummarize}
                className={`px-3 sm:px-4 py-2 bg-[#4F46E5] text-white rounded-lg hover:bg-[#3B38D6] focus:ring-2 focus:ring-offset-2 focus:ring-[#4F46E5] ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
                aria-busy={loading}
              >
                Summarize
              </button>
            )}

            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="px-3 sm:px-4 py-2 bg-[#F8FAFC] text-[#475569] rounded-lg border border-[#CBD5E1] flex items-center gap-2 focus:ring-2 focus:ring-offset-2 focus:ring-[#4F46E5]"
                aria-expanded={showDropdown}
                aria-haspopup="listbox"
              >
                {selectedLanguage?.name || "Translate to"}
                <ChevronDownIcon className="w-5 h-5" aria-hidden="true" />
              </button>

              {showDropdown && (
                <div
                  className="absolute top-full left-0 mt-1 w-full bg-white border border-[#CBD5E1] rounded-lg shadow-lg z-10"
                  role="listbox"
                >
                  {getAvailableLanguages(chat.detectedLangCode || "").map(
                    (lang) => (
                      <button
                        key={lang.langCode}
                        onClick={() => {
                          setSelectedLanguage(lang);
                          setShowDropdown(false);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-[#F8FAFC] text-[#475569] focus:outline-none focus:bg-[#F8FAFC]"
                        role="option"
                        aria-selected={
                          selectedLanguage?.langCode === lang.langCode
                        }
                      >
                        {lang.name}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>

            {selectedLanguage && (
              <button
                onClick={handleTranslate}
                className={`px-4 py-2 bg-[#4F46E5] text-white rounded-lg hover:bg-[#3B38D6] focus:ring-2 focus:ring-offset-2 focus:ring-[#4F46E5] ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
                aria-busy={loading}
              >
                Translate
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
