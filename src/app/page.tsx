import ChatWindow from "@/components/chat/ChatWindow";
import Features from "@/components/features/Features";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <main className="flex">
      <Sidebar />
      <Features />
      <ChatWindow />
    </main>
  );
}
