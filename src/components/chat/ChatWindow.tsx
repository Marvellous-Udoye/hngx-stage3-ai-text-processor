"use client";

import Typewriter from "@/hooks/useTypewriter";
import { PaperAirplaneIcon, PaperClipIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import Avater from "../../../public/images/avater.jpg";
import Sparkles from "../../../public/images/Sparkle.svg";
import Navbar from "./Navbar";

export default function ChatWindow() {
  const [inputText, setInputText] = useState("");
  const [chats, setChats] = useState<
    {
      text: string;
      time: string;
      isUser: boolean;
      detectedLang?: string;
      summary?: string;
    }[]
  >([]);
  const [summarizer, setSummarizer] = useState<SummarizerInstance | null>(null);
  const [languageDetector, setLanguageDetector] =
    useState<LanguageDetectorInstance | null>(null);
  const [loading, setLoading] = useState(false);

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
              sharedContext: "Random text",
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
      let detectedLang = "Unknown";
      if (languageDetector) {
        detectedLang = await languageDetector.detect(inputText);
      }

      setChats((prev) => [
        ...prev,
        { text: inputText, time: timestamp, isUser: false, detectedLang },
      ]);
    } catch (error) {
      console.error("Language detection failed:", error);
      setChats((prev) => [
        ...prev,
        { text: "Error detecting language.", time: timestamp, isUser: false },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSummarize = async (index: number) => {
    if (!summarizer) return;

    setLoading(true);

    try {
      const summary = await summarizer.summarize(chats[index].text);

      setChats((prev) =>
        prev.map((chat, i) => (i === index ? { ...chat, summary } : chat))
      );
    } catch (error) {
      console.error("Summarization failed:", error);
    } finally {
      setLoading(false);
    }
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
            {!chat.isUser && (
              <Image
                width={24}
                height={24}
                src={Sparkles}
                alt="AI picture"
                className="w-6 h-6 rounded-full"
              />
            )}
            {chat.isUser && (
              <Image
                width={24}
                height={24}
                src={Avater}
                alt="Profile picture"
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
                    : "bg-[#F8FAFC] text-black"
                }`}
              >
                {chat.isUser ? (
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

              {chat.detectedLang === "en" &&
                chat.text.length > 150 &&
                !chat.summary && (
                  <button
                    onClick={() => handleSummarize(index)}
                    className="mt-2 px-4 py-2 bg-[#4F46E5] text-white rounded-lg hover:bg-[#3B38D6]"
                  >
                    Summarize
                  </button>
                )}

              {chat.summary && (
                <p className="mt-2 p-3 bg-gray-100 text-gray-700 rounded-lg">
                  <strong>Summary:</strong> {chat.summary}
                </p>
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
