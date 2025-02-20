"use client";

import {
  Bars3Icon,
  ChevronDownIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  LanguageIcon,
  MagnifyingGlassIcon
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from "react";
import Avater from "../../../public/images/avater.jpg";

const apiOptions = [
  {
    icon: DocumentTextIcon,
    title: "Summarizer API",
    description: "Convert long text into concise summaries",
  },
  {
    icon: LanguageIcon,
    title: "Translator API",
    description: "Translate text between multiple languages",
  },
  {
    icon: MagnifyingGlassIcon,
    title: "Detector API",
    description: "Detect and analyze text patterns",
  },
];

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav role="navigation" aria-label="Main navigation">
      <div className="max-sm:hidden flex items-center justify-between border-b border-b-[#CBD5E1] py-[19px] px-8">
        <div className="relative">
          <button
            className="flex gap-2 items-center focus:outline-none focus:ring-2 focus:ring-[#4F46E5] rounded-md p-2 hover:bg-gray-50 transition-colors duration-200"
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <p className="font-bold text-[18px] text-[#475569] leading-6 tracking-[-0.144px]">
              Chrome APIs
            </p>
            <ChevronDownIcon
              className={`text-[#475569] size-5 transition-transform duration-200 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div
              className="absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="api-options-button"
            >
              {apiOptions.map((option, index) => (
                <button
                  key={index}
                  className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none group transition-colors duration-200"
                  role="menuitem"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#EEF2FF] group-hover:bg-[#4F46E5]/10 transition-colors duration-200">
                    <option.icon className="w-5 h-5 text-[#4F46E5]" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-[16px] font-semibold text-[#1E293B] group-hover:text-[#4F46E5] transition-colors duration-200">
                      {option.title}
                    </h3>
                    <p className="text-[14px] text-[#64748B]">
                      {option.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-3 items-center">
          <button
            className="w-10 h-10 flex items-center justify-center border border-[#CBD5E1] rounded-full p-1 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] transition-colors duration-200"
            aria-label="Menu"
          >
            <Bars3Icon className="size-5 text-[#475569]" />
          </button>
          <button
            className="w-10 h-10 flex items-center justify-center border border-[#CBD5E1] rounded-full p-1 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] transition-colors duration-200"
            aria-label="Settings"
          >
            <Cog6ToothIcon className="size-5 text-[#475569]" />
          </button>
          <button
            className="focus:outline-none focus:ring-2 focus:ring-[#4F46E5] rounded-full transition-transform duration-200 hover:scale-105"
            aria-label="Profile"
          >
            <Image
              width={40}
              height={40}
              src={Avater}
              alt="Profile picture"
              style={{ objectFit: "cover" }}
              className="w-10 h-10 rounded-full border p-1"
            />
          </button>
        </div>
      </div>

      <div className="sm:hidden flex flex-col">
        <div className="flex items-center justify-between py-3 px-4 border-b border-b-[#CBD5E1]">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M29.9688 11.3511C29.9688 11.3649 29.9688 11.3774 29.9601 11.3911L27.1251 24.3749C27.0378 24.8321 26.7938 25.2445 26.4351 25.5411C26.0764 25.8378 25.6255 26 25.1601 25.9999H6.83882C6.37359 25.9997 5.92297 25.8373 5.56454 25.5407C5.20611 25.2441 4.9623 24.8319 4.87507 24.3749L2.04007 11.3911C2.04007 11.3774 2.03382 11.3649 2.03132 11.3511C1.95373 10.9213 2.01901 10.4778 2.21718 10.0885C2.41536 9.69925 2.73553 9.38555 3.12878 9.19538C3.52203 9.0052 3.96673 8.949 4.39493 9.03536C4.82313 9.12172 5.21128 9.3459 5.50007 9.67364L9.70882 14.2099L14.1838 4.17364C14.184 4.16947 14.184 4.1653 14.1838 4.16114C14.3438 3.81407 14.5999 3.52012 14.9218 3.31408C15.2437 3.10804 15.6179 2.99854 16.0001 2.99854C16.3822 2.99854 16.7564 3.10804 17.0783 3.31408C17.4002 3.52012 17.6563 3.81407 17.8163 4.16114C17.8161 4.1653 17.8161 4.16947 17.8163 4.17364L22.2913 14.2099L26.5001 9.67364C26.7895 9.34833 27.1771 9.12635 27.6041 9.0414C28.0312 8.95645 28.4742 9.01317 28.8661 9.20294C29.258 9.39272 29.5772 9.70519 29.7753 10.0929C29.9734 10.4806 30.0396 10.9224 29.9638 11.3511H29.9688Z"
                fill="#4F46E5"
              />
            </svg>
            <h1 className="font-extrabold leading-[38px] text-2xl text-[#1E293B] tracking-[-0.39px]">
              AI text processor
            </h1>
          </div>

          <button
            className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] transition-colors duration-200"
            aria-label="Toggle mobile menu"
          >
            <Bars3Icon className="size-6 text-[#475569]" />
          </button>
        </div>

        <div className="p-4 flex gap-3 justify-end border-b border-b-[#E2E8F0] w-full">
          <button
            className="w-10 h-10 flex items-center justify-center border border-[#CBD5E1] rounded-full p-1 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] transition-colors duration-200"
            aria-label="Settings"
          >
            <Cog6ToothIcon className="size-5 text-[#475569]" />
          </button>
          <button
            className="focus:outline-none focus:ring-2 focus:ring-[#4F46E5] rounded-full transition-transform duration-200 hover:scale-105"
            aria-label="Profile"
          >
            <Image
              width={40}
              height={40}
              src={Avater}
              alt="Profile picture"
              style={{ objectFit: "cover" }}
              className="w-10 h-10 rounded-full border p-1"
            />
          </button>
        </div>
      </div>
    </nav>
  );
}
