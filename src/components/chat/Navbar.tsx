import { useTheme } from "@/context/ThemeContext";
import {
  Bars3Icon,
  ChevronDownIcon,
  Cog6ToothIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Avater from "../../../public/images/avater.jpg";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav>
      <div className="max-sm:hidden flex items-center justify-between border-b border-b-[#CBD5E1] py-[19px] px-8">
        <div className="flex gap-2 items-center">
          <p className="font-bold text-[18px] text-[#475569] leading-6 tracking-[-0.144px] ">
            chrome APIs
          </p>
          <ChevronDownIcon className="text-[#475569] size-6 cursor-pointer" />
        </div>

        <div
          onClick={toggleTheme}
          className="w-10 h-10 flex items-center justify-center rounded-full p-1 bg-[#EEF2FF]  cursor-pointer"
        >
          {theme == "light" ? (
            <MoonIcon className="size-6 text-[#475569]" />
          ) : (
            <SunIcon className="size-6 text-[#4F46E5]" />
          )}
        </div>

        <div className="flex gap-2 items-center">
          <div className="w-10 h-10 flex items-center justify-center border border-[#CBD5E1] rounded-full p-1 ">
            <Bars3Icon className="size-6 text-[#475569] cursor-pointer" />
          </div>
          <div className="w-10 h-10 flex items-center justify-center border border-[#CBD5E1] rounded-full p-1 ">
            <Cog6ToothIcon className="text-[#475569] cursor-pointer" />
          </div>
          <Image
            width={40}
            height={40}
            src={Avater}
            alt="Profile picture"
            style={{ objectFit: "cover" }}
            className="w-10 h-10 rounded-full cursor-pointer border p-1"
          />
        </div>
      </div>

      <div className="sm:hidden flex flex-col ">
        <div className="flex items-center justify-between py-3 px-4 border-b border-b-[#CBD5E1]">
          <div className="flex items-center gap-2 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
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

          <Bars3Icon className="size-6 text-[#475569] cursor-pointer" />
        </div>

        <div className="p-4 flex gap-2 justify-end border-b border-b-[#E2E8F0] w-full">
          <div
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-full p-1 bg-[#EEF2FF]  cursor-pointer"
          >
            {theme == "light" ? (
              <MoonIcon className="size-6 text-[#475569]" />
            ) : (
              <SunIcon className="size-6 text-[#4F46E5]" />
            )}
          </div>
          <div className="w-10 h-10 flex items-center justify-center border border-[#CBD5E1] rounded-full p-1 ">
            <Cog6ToothIcon className="text-[#475569] cursor-pointer" />
          </div>
          <Image
            width={40}
            height={40}
            src={Avater}
            alt="Profile picture"
            style={{ objectFit: "cover" }}
            className="w-10 h-10 rounded-full cursor-pointer border p-1"
          />
        </div>
      </div>
    </nav>
  );
}
