import { SparklesIcon } from "@heroicons/react/24/outline";
import Header from "./Header";

export default function Features() {
  return (
    <aside 
      className="h-screen max-w-[360px] w-full flex flex-col justify-between border-r border-r-[#E2E8F0] max-lg:hidden"
      role="complementary"
      aria-label="Features panel"
    >
      <Header />
      <button
        className="flex items-center py-5 px-6 border-b border-b-[#CBD5E1] gap-3 border-t border-t-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] hover:bg-gray-50 transition-colors duration-200"
        aria-label="Upgrade plan to get GPT-8 and more features"
      >
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-[#EEF2FF]">
          <SparklesIcon className="size-6 text-[#4F46E5]" aria-hidden="true" />
        </div>
        <div className="flex flex-col gap-1 text-left">
          <p className="text-base font-bold leading-[22px] tracking-[-0.112px] text-[#1E293B]">
            Upgrade Plan
          </p>
          <p className="text-[14px] font-normal leading-[22px] text-[#475569]">
            Get GPT-8 and more
          </p>
        </div>
      </button>
    </aside>
  );
}