"use client";

import {
  ChevronDownIcon,
  CpuChipIcon,
  LightBulbIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { useState } from 'react';

const options = [
  {
    icon: CpuChipIcon,
    title: "Smart Summarize",
    description: "Generate concise and insightful summaries instantly",
  },
  {
    icon: ShoppingCartIcon,
    title: "Quick Translate",
    description: "Translate text across multiple languages effortlessly",
  },
  {
    icon: LightBulbIcon,
    title: "Deep Detect",
    description: "Identify key elements and insights within any text",
  },
];

export default function Header() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <header role="banner" className="bg-white">
      <div className="flex items-center py-5 px-6 border-b border-b-[#CBD5E1] gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          aria-hidden="true"
          role="img"
          className="flex-shrink-0"
        >
          <path
            d="M29.9688 11.3511C29.9688 11.3649 29.9688 11.3774 29.9601 11.3911L27.1251 24.3749C27.0378 24.8321 26.7938 25.2445 26.4351 25.5411C26.0764 25.8378 25.6255 26 25.1601 25.9999H6.83882C6.37359 25.9997 5.92297 25.8373 5.56454 25.5407C5.20611 25.2441 4.9623 24.8319 4.87507 24.3749L2.04007 11.3911C2.04007 11.3774 2.03382 11.3649 2.03132 11.3511C1.95373 10.9213 2.01901 10.4778 2.21718 10.0885C2.41536 9.69925 2.73553 9.38555 3.12878 9.19538C3.52203 9.0052 3.96673 8.949 4.39493 9.03536C4.82313 9.12172 5.21128 9.3459 5.50007 9.67364L9.70882 14.2099L14.1838 4.17364C14.184 4.16947 14.184 4.1653 14.1838 4.16114C14.3438 3.81407 14.5999 3.52012 14.9218 3.31408C15.2437 3.10804 15.6179 2.99854 16.0001 2.99854C16.3822 2.99854 16.7564 3.10804 17.0783 3.31408C17.4002 3.52012 17.6563 3.81407 17.8163 4.16114C17.8161 4.1653 17.8161 4.16947 17.8163 4.17364L22.2913 14.2099L26.5001 9.67364C26.7895 9.34833 27.1771 9.12635 27.6041 9.0414C28.0312 8.95645 28.4742 9.01317 28.8661 9.20294C29.258 9.39272 29.5772 9.70519 29.7753 10.0929C29.9734 10.4806 30.0396 10.9224 29.9638 11.3511H29.9688Z"
            fill="#4F46E5"
          />
        </svg>
        <h1 className="font-extrabold leading-[38px] text-[30px] text-[#1E293B] tracking-[-0.39px]">
          AI text processor
        </h1>
      </div>

      <nav aria-label="Feature options">
        <ul className="flex flex-col" role="menu">
          {options.map((option, index) => (
            <li key={index} role="none" className="border-b border-b-[#CBD5E1]">
              <button
                className={`w-full px-6 py-3 focus:outline-none focus:bg-gray-50 group transition-all duration-300 ${
                  expandedIndex === index ? "bg-gray-50" : ""
                }`}
                role="menuitem"
                aria-expanded={expandedIndex === index}
                aria-controls={`description-${index}`}
                onClick={() => toggleExpand(index)}
                tabIndex={0}
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 group-hover:bg-[#EEF2FF] transition-colors duration-300">
                    <option.icon
                      className="w-5 h-5 text-[#94A3B8] group-hover:text-[#4F46E5]"
                      aria-hidden="true"
                    />
                  </div>
                  <span className="relative">
                    <h3 className="text-[18px] leading-6 font-bold tracking-[-0.144px] text-[#1E293B] group-hover:text-[#4F46E5] transition-colors duration-300">
                      {option.title}
                    </h3>
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#4F46E5] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                  </span>
                  <ChevronDownIcon
                    className={`w-5 h-5 ml-auto text-[#94A3B8] transition-transform duration-300 ${
                      expandedIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </div>
                <div
                  id={`description-${index}`}
                  className={`overflow-hidden transition-all duration-300 ${
                    expandedIndex === index
                      ? "max-h-20 mt-3 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-[14px] text-[#475569] pl-[52px]">
                    {option.description}
                  </p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
