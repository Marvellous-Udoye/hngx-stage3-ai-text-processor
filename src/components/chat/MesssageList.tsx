"use client";

import { Chats } from "@/types/chats";
import { useEffect, useRef } from "react";
import MessageItem from "./MessageItem";

interface MessageListProps {
  chats: Chats[];
  setChats: React.Dispatch<React.SetStateAction<Chats[]>>;
  loading: boolean;
  error: { show: boolean; message: string };
  summarizer: SummarizerInstance | null;
  translator: TranslatorInstance | null;
  languageDetector: LanguageDetectorInstance | null;
  showError: (message: string) => void;
  setLoading: (loading: boolean) => void;
}

export default function MessageList({
  chats,
  setChats,
  loading,
  error,
  summarizer,
  translator,
  showError,
  setLoading,
}: MessageListProps) {
  const chatContainerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      const container = chatContainerRef.current;
      container.scrollTop = container.scrollHeight;
    }
  }, [chats]);

  return (
    <section
      ref={chatContainerRef}
      className="max-w-[808px] w-full mx-auto h-[63vh] px-4 py-6 overflow-y-auto overflow-x-hidden relative"
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
        <MessageItem
          key={index}
          chat={chat}
          index={index}
          chats={chats}
          setChats={setChats}
          loading={loading}
          setLoading={setLoading}
          summarizer={summarizer}
          translator={translator}
          showError={showError}
        />
      ))}

      {loading && (
        <p className="text-gray-500 text-end" role="status" aria-live="polite">
          Processing...
        </p>
      )}
    </section>
  );
}
