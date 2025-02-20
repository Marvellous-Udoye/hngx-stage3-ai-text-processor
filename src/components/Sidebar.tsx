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
import Link from "next/link";

const menuItems = [
  { Icon: HomeIcon, label: "Home", href: "/" },
  { Icon: ChartBarIcon, label: "Analytics", href: "/analytics" },
  { Icon: UserIcon, label: "Profile", href: "/profile" },
  { Icon: BoltIcon, label: "Actions", href: "/actions" },
  { Icon: BellIcon, label: "Notifications", href: "/notifications" },
];

export default function Sidebar() {
  return (
    <div className="h-screen max-w-20 w-full flex flex-col items-center justify-between py-6 px-4 border border-r-[#E2E8F0] max-xl:hidden">
      <nav className="flex flex-col gap-6" role="navigation" aria-label="Main sidebar">
        <div
          className="flex self-center"
          aria-hidden="true"
        >
          <ChatBubbleBottomCenterTextIcon className="size-6 drop-shadow-lg backdrop-blur-[16px] text-[#4F46E5]" />
        </div>

        <div className="flex flex-col gap-4">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="p-4 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] rounded-lg group"
              aria-label={item.label}
            >
              <item.Icon className="size-6 text-gray-700 group-hover:text-[#4F46E5] transition-all duration-300" />
            </Link>
          ))}
        </div>
      </nav>

      <div className="flex flex-col gap-4 items-center">
        <button
          className="p-4 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] rounded-lg group"
          aria-label="Settings"
        >
          <Cog6ToothIcon className="size-6 text-gray-700 group-hover:text-[#4F46E5] transition-all duration-300" />
        </button>
        <button
          className="focus:outline-none focus:ring-2 focus:ring-[#4F46E5] rounded-full"
          aria-label="Profile"
        >
          <Image
            width={48}
            height={48}
            src={Avater}
            alt="Profile picture"
            style={{ objectFit: "cover" }}
            className="w-12 h-12 rounded-full"
          />
        </button>
      </div>
    </div>
  );
}