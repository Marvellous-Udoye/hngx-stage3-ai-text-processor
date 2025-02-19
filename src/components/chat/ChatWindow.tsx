"use client";

import Typewriter from "@/hooks/useTypewriter";
import { translateText } from "@/utils/translator";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { PaperAirplaneIcon, PaperClipIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import Avater from "../../../public/images/avater.jpg";
import Sparkles from "../../../public/images/Sparkle.svg";
import Navbar from "./Navbar";

const languageMap: Record<string, { name: string; langCode: string }> = {
  en: { name: "English", langCode: "en" },
  pt: { name: "Portuguese", langCode: "pt" },
  es: { name: "Spanish", langCode: "es" },
  ru: { name: "Russian", langCode: "ru" },
  tr: { name: "Turkish", langCode: "tr" },
  fr: { name: "French", langCode: "fr" },
};

export default function ChatWindow() {
  const [inputText, setInputText] = useState("");
  const [chats, setChats] = useState<
    {
      text: string;
      time: string;
      isUser: boolean;
      detectedLang?: string;
      detectedLangCode?: string;
      isTyping?: boolean;
    }[]
  >([]);
  const [summarizer, setSummarizer] = useState<SummarizerInstance | null>(null);
  const [languageDetector, setLanguageDetector] =
    useState<LanguageDetectorInstance | null>(null);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState<Record<number, boolean>>({});
  const [selectedLanguage, setSelectedLanguage] = useState<
    Record<number, { name: string; langCode: string }>
  >({});

  // Initialize Summarizer and Language Detector
  useEffect(() => {
    const initializeAPIs = async () => {
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
            const detectorInstance = await window.ai.languageDetector.create();
            await detectorInstance.ready;
            setLanguageDetector(detectorInstance);
          }
        }
      }
    };

    initializeAPIs();
  }, []);

  const handleDetect = async (text: string) => {
    if (!languageDetector) return { name: "Unknown", langCode: "unknown" };

    try {
      const detectionResults = await languageDetector.detect(text);
      if (Array.isArray(detectionResults) && detectionResults.length > 0) {
        const detectedLangCode =
          detectionResults[0].detectedLanguage || "unknown";
        return {
          name: languageMap[detectedLangCode]?.name || "Unknown",
          langCode: detectedLangCode,
        };
      }
    } catch (error) {
      console.error("Language detection failed:", error);
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
        time: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        isUser: false,
        isTyping: true,
      };

      setChats((prev) => [...prev, aiSummaryChat]);

      // Remove isTyping after animation completes
      setTimeout(() => {
        setChats((prev) =>
          prev.map((chat, i) =>
            i === prev.length - 1 ? { ...chat, isTyping: false } : chat
          )
        );
      }, summary.length * 20 + 100); // Adjust timing based on text length
    } catch (error) {
      console.error("Summarization failed:", error);
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
          time: new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
          isUser: false,
          isTyping: true,
        };

        setChats((prev) => [...prev, aiTranslatedChat]);
      }
    } catch (error) {
      console.error("Translation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const timestamp = new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

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
    } catch (error) {
      console.error("Language detection failed:", error);
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

  const getAvailableLanguages = (detectedLangCode: string) => {
    return Object.entries(languageMap)
      .filter(([langCode]) => langCode !== detectedLangCode)
      .map(([, value]) => value);
  };

  return (
    <div className="max-w-[1000px] w-full">
      <Navbar />

      <section
        className="max-w-[808px] w-full mx-auto h-[67vh] px-4 py-8 overflow-y-auto"
        style={{ scrollbarWidth: "thin" }}
        aria-label="chat area"
      >
        {chats.map((chat, index) => (
          <div
            key={index}
            className={`flex gap-3 mb-4 ${
              chat.isUser ? "justify-end" : "justify-start"
            }`}
          >
            {chat.isUser && (
              <Image
                width={24}
                height={24}
                src={Avater}
                alt="Profile picture"
                className="w-6 h-6 rounded-full"
              />
            )}
            {!chat.isUser && (
              <Image
                width={24}
                height={24}
                src={Sparkles}
                alt="AI picture"
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
              <p
                className={`p-4 rounded-3xl text-[#475569] leading-[25.6px] ${
                  chat.isUser
                    ? "bg-[#4F46E5] text-white"
                    : "bg-[#F8FAFC] text-[#475569]"
                }`}
              >
                {chat.isUser || !chat.isTyping ? (
                  chat.text
                ) : (
                  <Typewriter text={chat.text} speed={20} />
                )}
              </p>

              {chat.detectedLang && (
                <p className="text-sm text-gray-500 mt-1">
                  Detected Language:{" "}
                  <span className="font-semibold">{chat.detectedLang}</span>
                </p>
              )}

              {chat.isUser && chat.detectedLang && (
                <div className="flex gap-2 mt-2">
                  {chat.text.length > 150 && (
                    <button
                      onClick={() => handleSummarize(index)}
                      className={`px-4 py-2 bg-[#4F46E5] text-white rounded-lg hover:bg-[#3B38D6] ${
                        loading ? "opacity-50 hover:cursor-not-allowed" : ""
                      }`}
                      disabled={loading}
                    >
                      Summarize
                    </button>
                  )}

                  <div className="relative">
                    <button
                      onClick={() => toggleDropdown(index)}
                      className="px-4 py-2 bg-[#F8FAFC] text-[#475569] rounded-lg border border-[#CBD5E1] flex items-center gap-2"
                    >
                      {selectedLanguage[index]?.name || "Translate to"}
                      <ChevronDownIcon className="w-5 h-5" />
                    </button>

                    {showDropdown[index] && (
                      <div className="absolute top-full left-0 mt-1 w-full bg-white border border-[#CBD5E1] rounded-lg shadow-lg z-10">
                        {getAvailableLanguages(chat.detectedLangCode || "").map(
                          (lang) => (
                            <button
                              key={lang.langCode}
                              onClick={() => handleLanguageSelect(index, lang)}
                              className="w-full px-4 py-2 text-left hover:bg-[#F8FAFC] text-[#475569]"
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
                      className={`px-4 py-2 bg-[#4F46E5] text-white rounded-lg hover:bg-[#3B38D6] ${
                        loading ? "opacity-50 hover:cursor-not-allowed" : ""
                      }`}
                      disabled={loading}
                    >
                      Translate
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && <p className="text-gray-500 text-end">Processing...</p>}
      </section>

      <form
        className="max-w-[808px] w-full mx-auto p-4"
        onSubmit={handleSubmit}
      >
        <div className="relative">
          <textarea
            className={`${
              inputText ? "py-3" : "pt-7"
            } px-14 rounded-xl w-full border border-[#CBD5E1] shadow-lg text-[#475569] focus:border-[#4F46E5] min-h-20 max-h-40 resize-none`}
            placeholder="Enter text..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <div className="absolute top-10 left-3 -translate-y-1/2 flex items-center justify-center rounded-full p-1">
            <PaperClipIcon className="size-6 text-[#94A3B8] cursor-pointer" />
          </div>
          <button
            type="submit"
            className="absolute top-10 right-3 -translate-y-1/2 p-4 rounded-md bg-[#4F46E5]"
          >
            <PaperAirplaneIcon className="size-6 text-white" />
          </button>
        </div>
      </form>
    </div>
  );
}
