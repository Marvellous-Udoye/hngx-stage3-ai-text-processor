"use client";

import { LanguageMap } from "@/constants/languages";
import Typewriter from "@/hooks/useTypewriter";
import { Chats } from "@/types/chats";
import { translateText } from "@/utils/translator";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { PaperAirplaneIcon, PaperClipIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";
import Avater from "../../../public/images/avater.jpg";
import Sparkles from "../../../public/images/Sparkle.svg";
import Navbar from "./Navbar";
import { formatTime } from "@/utils/timeFormatter";
import { handleKeyDown } from "@/utils/keyDown";
import { getAvailableLanguages } from "@/utils/getLanguages";

interface ErrorState {
  show: boolean;
  message: string;
}

export default function ChatWindow() {
  const [summarizer, setSummarizer] = useState<SummarizerInstance | null>(null);
  const [showDropdown, setShowDropdown] = useState<Record<number, boolean>>({});
  const [languageDetector, setLanguageDetector] =
    useState<LanguageDetectorInstance | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<
    Record<number, { name: string; langCode: string }>
  >({});
  const [inputText, setInputText] = useState("");
  const [chats, setChats] = useState<Chats[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorState>({ show: false, message: "" });
  const chatContainerRef = useRef<HTMLElement>(null);

  // Auto-scroll effect
  useEffect(() => {
    if (chatContainerRef.current) {
      const container = chatContainerRef.current;
      container.scrollTop = container.scrollHeight;
    }
  }, [chats]);

  // Initialize Summarizer and Language Detector
  useEffect(() => {
    const initializeAPIs = async () => {
      try {
        if (typeof window !== "undefined" && window.ai) {
          if (window.ai.summarizer) {
            const summarizerAvailable = (
              await window.ai.summarizer.capabilities()
            ).available;
            if (summarizerAvailable !== "no") {
              const summarizerInstance = await window.ai.summarizer.create({
                sharedContext: "This can be any random text",
                type: "tl;dr",
                format: "markdown",
                length: "medium",
              });

              await summarizerInstance.ready;
              setSummarizer(summarizerInstance);
            }
          }

          if (window.ai.languageDetector) {
            const detectorAvailable = (
              await window.ai.languageDetector.capabilities()
            ).available;
            if (detectorAvailable !== "no") {
              const detectorInstance =
                await window.ai.languageDetector.create();
              await detectorInstance.ready;
              setLanguageDetector(detectorInstance);
            }
          }
        }
      } catch {
        showError("Failed to initialize AI services. Please try again later.");
      }
    };

    initializeAPIs();
  }, []);

  const showError = (message: string) => {
    setError({ show: true, message });
    setTimeout(() => setError({ show: false, message: "" }), 2500);
  };

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

  const handleSummarize = async (index: number) => {
    if (!summarizer) return;

    setLoading(true);
    try {
      const summary = await summarizer.summarize(chats[index].text);

      const aiSummaryChat = {
        text: summary,
        time: formatTime(new Date()),
        isUser: false,
        isTyping: true,
      };

      setChats((prev) => [...prev, aiSummaryChat]);

      setTimeout(() => {
        setChats((prev) =>
          prev.map((chat, i) =>
            i === prev.length - 1 ? { ...chat, isTyping: false } : chat
          )
        );
      }, summary.length * 20 + 100);
    } catch {
      showError("Summarization failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleTranslate = async (index: number) => {
    if (!selectedLanguage[index]) return;

    setLoading(true);
    try {
      const translation = await translateText(
        chats[index].text,
        selectedLanguage[index].langCode as TranslatorOptions["targetLanguage"]
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

  const toggleDropdown = (index: number) => {
    setShowDropdown((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleLanguageSelect = (
    index: number,
    language: { name: string; langCode: string }
  ) => {
    setSelectedLanguage((prev) => ({
      ...prev,
      [index]: language,
    }));
    setShowDropdown((prev) => ({
      ...prev,
      [index]: false,
    }));
  };

  return (
    <div className="max-w-[1000px] w-full">
      <Navbar />

      <section
        ref={chatContainerRef}
        className="max-w-[808px] w-full mx-auto h-[60vh] sm:h-[63vh] px-4 py-6 overflow-y-auto overflow-x-hidden relative"
        style={{ scrollbarWidth: "thin" }}
        aria-label="Chat messages"
        role="log"
      >
        {error.show && (
          <div
            role="alert"
            className="bg-red-50 border border-red-100 text-red-500 w-full max-w-[92%] md:max-w-[94%] px-3 sm:px-4 py-2 sm:py-3 rounded absolute top-0 sm:mx-4 mb-4"
            style={{ animation: "fadeIn 0.3s ease-out" }}
          >
            {error.message}
          </div>
        )}

        {chats.map((chat, index) => (
          <div
            key={index}
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
                      onClick={() => handleSummarize(index)}
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
                      onClick={() => toggleDropdown(index)}
                      className="px-3 sm:px-4 py-2 bg-[#F8FAFC] text-[#475569] rounded-lg border border-[#CBD5E1] flex items-center gap-2 focus:ring-2 focus:ring-offset-2 focus:ring-[#4F46E5]"
                      aria-expanded={showDropdown[index]}
                      aria-haspopup="listbox"
                    >
                      {selectedLanguage[index]?.name || "Translate to"}
                      <ChevronDownIcon className="w-5 h-5" aria-hidden="true" />
                    </button>

                    {showDropdown[index] && (
                      <div
                        className="absolute top-full left-0 mt-1 w-full bg-white border border-[#CBD5E1] rounded-lg shadow-lg z-10"
                        role="listbox"
                      >
                        {getAvailableLanguages(chat.detectedLangCode || "").map(
                          (lang) => (
                            <button
                              key={lang.langCode}
                              onClick={() => handleLanguageSelect(index, lang)}
                              className="w-full px-4 py-2 text-left hover:bg-[#F8FAFC] text-[#475569] focus:outline-none focus:bg-[#F8FAFC]"
                              role="option"
                              aria-selected={
                                selectedLanguage[index]?.langCode ===
                                lang.langCode
                              }
                            >
                              {lang.name}
                            </button>
                          )
                        )}
                      </div>
                    )}
                  </div>

                  {selectedLanguage[index] && (
                    <button
                      onClick={() => handleTranslate(index)}
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
        ))}

        {loading && (
          <p
            className="text-gray-500 text-end"
            role="status"
            aria-live="polite"
          >
            Processing...
          </p>
        )}
      </section>

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
            <PaperClipIcon
              className="size-6 text-[#94A3B8]"
              aria-hidden="true"
            />
          </div>
          <button
            type="submit"
            className="absolute top-7 right-3 -translate-y-1/2 p-2 w-10 rounded-md bg-[#4F46E5] flex items-center justify-center hover:bg-[#3B38D6] focus:ring-2 focus:ring-offset-2 focus:ring-[#4F46E5] disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
            aria-label="Send message"
          >
            <PaperAirplaneIcon
              className="size-5 text-white"
              aria-hidden="true"
            />
          </button>
        </div>
      </form>
    </div>
  );
}
