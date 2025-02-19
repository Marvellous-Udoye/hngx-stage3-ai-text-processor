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
    { text: string; time: string; isUser: boolean }[]
  >([]);
  const [summarizer, setSummarizer] = useState<SummarizerInstance | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initializeSummarizer = async () => {
      if (typeof window !== "undefined" && window.ai?.summarizer) {
        const available = (await window.ai.summarizer.capabilities()).available;
        if (available !== "no") {
          const options = await window.ai.summarizer.create({
            sharedContext: "Random text",
            type: "tl;dr",
            format: "markdown",
            length: "medium",
          });

          await options.ready;
          setSummarizer(options);
        }
      }
    };

    initializeSummarizer();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const timestamp = new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    setChats((prev) => [
      ...prev,
      { text: inputText, time: timestamp, isUser: true },
    ]);
    setInputText("");
    setLoading(true);

    if (!summarizer) {
      alert("Summarizer API is not available.");
      setLoading(false);
      return;
    }

    try {
      const summary = await summarizer.summarize(inputText);

      setChats((prev) => [
        ...prev,
        { text: summary, time: timestamp, isUser: false },
      ]);
    } catch (error) {
      console.error("Summarization failed:", error);
      setChats((prev) => [
        ...prev,
        { text: "Error summarizing text.", time: timestamp, isUser: false },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1000px] w-full">
      <Navbar />

      <section
        className="max-w-[808px] w-full mx-auto h-[67vh] px-4 py-8 overflow-y-auto "
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
                style={{ objectFit: "cover" }}
                className="w-6 h-6 rounded-full"
              />
            )}
            {chat.isUser && (
              <Image
                width={24}
                height={24}
                src={Avater}
                alt="Profile picture"
                style={{ objectFit: "cover" }}
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
                className={`p-4 rounded-3xl text-[#475569] text-balance leading-[25.6px] ${
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
            </div>
          </div>
        ))}

        {loading && <p className="text-gray-500 text-end">Summarizing...</p>}
      </section>

      <form
        className="max-w-[808px] w-full mx-auto p-4"
        onSubmit={handleSubmit}
      >
        <div className="relative">
          <textarea
            name="promptAI"
            id="inputText"
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
            className="absolute top-10 right-3 -translate-y-1/2 flex items-center justify-center p-4 rounded-md bg-[#4F46E5]"
          >
            <PaperAirplaneIcon className="size-6 text-white cursor-pointer" />
          </button>
        </div>
      </form>
    </div>
  );
}
