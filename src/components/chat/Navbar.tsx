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
  return (
    <div className="flex items-center justify-between border-b border-b-[#CBD5E1] py-[19px] px-8">
      <div className="flex gap-2 items-center">
        <p className="font-bold text-[18px] text-[#475569] leading-6 tracking-[-0.144px] ">
          chrome APIs
        </p>
        <ChevronDownIcon className="text-[#475569] size-6 cursor-pointer" />
      </div>

      <div className="flex gap-2">
        <div className="w-10 h-10 flex items-center justify-center rounded-full p-1 bg-[#EEF2FF]">
          <SunIcon className="size-6 text-[#4F46E5] cursor-pointer" />
        </div>
        <div className="w-10 h-10 flex items-center justify-center p-1 ">
          <MoonIcon className="size-6 text-[#475569] cursor-pointer" />
        </div>
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
          objectFit="cover"
          className="w-10 h-10 rounded-full cursor-pointer border p-1"
        />
      </div>
    </div>
  );
}
