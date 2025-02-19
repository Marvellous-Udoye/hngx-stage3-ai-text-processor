"use client";

import Typewriter from "@/hooks/useTypewriter";
import { PaperAirplaneIcon, PaperClipIcon } from "@heroicons/react/24/outline";
import { FormEvent, useEffect, useState } from "react";
import Navbar from "./Navbar";

export default function ChatWindow() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [summarizer, setSummarizer] = useState<SummarizerInstance | null>(null);

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

    if (!summarizer) {
      alert("Summarizer API is not available.");
      return;
    }

    try {
      const summary = await summarizer.summarize(inputText);
      setOutputText(summary);
    } catch (error) {
      console.error("Summarization failed:", error);
      setOutputText("Error summarizing text.");
    }
  };

  return (
    <div className="max-w-[1000px] w-full">
      <Navbar />

      <section className="max-w-[808px] w-full mx-auto px-4 py-8 ">
        <div className="px-4 py-8 min-h-40 opacity-80">
          {outputText ? (
            <Typewriter text={outputText} speed={20} />
          ) : (
            "Chat area for output text"
          )}
        </div>
      </section>

      <form
        className="max-w-[808px] w-full mx-auto px-4 py-6"
        onSubmit={handleSubmit}
      >
        <div className="relative">
          <textarea
            name="promptAI"
            id="inputText"
            className={`${
              inputText ? "py-1" : "pt-7"
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
            className="absolute top-10 right-3 -translate-y-1/2 flex items-center justify-center p-4 rounded-full bg-[#4F46E5]"
          >
            <PaperAirplaneIcon className="size-6 text-white cursor-pointer" />
          </button>
        </div>
      </form>
    </div>
  );
}
