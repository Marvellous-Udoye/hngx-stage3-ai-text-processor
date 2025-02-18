import Avater from "../../public/images/avater.jpg";

import {
  BellIcon,
  BoltIcon,
  ChartBarIcon,
  ChatBubbleBottomCenterTextIcon,
  Cog6ToothIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

const menuIcons = [HomeIcon, ChartBarIcon, UserIcon, BoltIcon, BellIcon];

export default function Sidebar() {
  return (
    <div className="h-screen w-20 flex flex-col items-center justify-between py-6 px-4 border border-r-[#E2E8F0] max-lg:hidden">
      <nav className="flex flex-col gap-8 ">
        <ChatBubbleBottomCenterTextIcon className="size-6 drop-shadow-lg backdrop-blur-[16px] text-[#4F46E5] flex self-center" />

        <div className="flex flex-col gap-4">
          {menuIcons.map((Icon, index) => (
            <div key={index} className="p-4">
              <Icon className="size-6 text-gray-700 cursor-pointer hover:text-[#4F46E5] transition-all duration-300" />
            </div>
          ))}
        </div>
      </nav>

      <div className="flex flex-col gap-4 items-center">
        <div className="p-4">
          <Cog6ToothIcon className="size-6 cursor-pointer hover:text-[#4F46E5] transition-all duration-300" />
        </div>{" "}
        <Image
          width={48}
          height={48}
          src={Avater}
          alt="Profile picture"
          objectFit="cover"
          className="w-12 h-12 rounded-full cursor-pointer"
        />
      </div>
    </div>
  );
}
