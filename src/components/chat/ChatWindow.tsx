"use client";

import { PaperAirplaneIcon, PaperClipIcon } from "@heroicons/react/24/outline";
import Navbar from "./Navbar";

export default function ChatWindow() {
  const handleSubmit = () => {};

  return (
    <div className="max-w-[1000px] w-full">
      <Navbar />

      <section className="max-w-[808px] w-full mx-auto px-4 py-8 "></section>

      <form className="max-w-[808px] w-full mx-auto px-4 py-6 ">
        <div className="relative">
          <textarea
            name="promptAI"
            id="inputText"
            className="pt-7 px-14 rounded-xl w-full border border-[#CBD5E1] shadow-[0px_4px_8px_-2px_rgba(23,23,23,0.10),_0px_2px_4px_-2px_rgba(23,23,23,0.06)] font-medium text-base  leading-[22px] tracking-[-0.112px] text-[#475569] focus:border-[#4F46E5] min-h-20 max-h-40 resize-none overflow-hidden
"
            placeholder="Process text..."
            defaultValue=""
          />
          <div className="absolute top-10 left-3 -translate-y-1/2 flex items-center justify-center rounded-full p-1">
            <PaperClipIcon className="size-6 text-[#94A3B8] rounded-full cursor-pointer" />
          </div>
          <div
            onClick={handleSubmit}
            className="absolute top-10 right-3 -translate-y-1/2 flex items-center justify-center p-4 rounded-full bg-[#4F46E5] "
          >
            <PaperAirplaneIcon className="size-6 cursor-pointer text-white" />
          </div>
        </div>
      </form>
    </div>
  );
}
