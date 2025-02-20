"use client";

import { Chats } from "@/types/chats";
import { useEffect, useState } from "react";
import ChatInput from "./ChatInput";
import MessageList from "./MesssageList";
import Navbar from "./Navbar";

export default function ChatWindow() {
  const [summarizer, setSummarizer] = useState<SummarizerInstance | null>(null);
  const [translator, setTranslator] = useState<TranslatorInstance | null>(null);
  const [languageDetector, setLanguageDetector] =
    useState<LanguageDetectorInstance | null>(null);
  const [chats, setChats] = useState<Chats[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ show: boolean; message: string }>({
    show: false,
    message: "",
  });

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

          if (window.ai.translator) {
            const translatorAvailable = (
              await window.ai.translator.capabilities()
            ).available;
            if (translatorAvailable !== "no") {
              const translatorInstance = await window.ai.translator.create({
                sourceLanguage: "en",
                targetLanguage: "fr",
              });
              await translatorInstance.ready;
              setTranslator(translatorInstance);
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

  return (
    <div className="max-w-[1000px] w-full">
      <Navbar />
      <MessageList
        chats={chats}
        setChats={setChats}
        loading={loading}
        error={error}
        summarizer={summarizer}
        languageDetector={languageDetector}
        translator={translator}
        showError={showError}
        setLoading={setLoading}
      />
      <ChatInput
        setChats={setChats}
        loading={loading}
        setLoading={setLoading}
        showError={showError}
        languageDetector={languageDetector}
      />
    </div>
  );
}
