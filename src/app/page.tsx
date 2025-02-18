import Features from "@/components/features/Features";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <Features />
    </div>
  );
}
