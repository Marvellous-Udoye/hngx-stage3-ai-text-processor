import ChatWindow from "@/components/chat/ChatWindow";
import Features from "@/components/features/Features";
import Sidebar from "@/components/Sidebar";
import Head from "next/head";

export default function Home() {
  const summarizerToken = process.env.NEXT_PUBLIC_SUMMARIZER_TOKEN;
  const detectorToken = process.env.NEXT_PUBLIC_LANGUAGE_DETECTOR_TOKEN;
  const translatorToken = process.env.NEXT_PUBLIC_TRANSLATOR_TOKEN;

  return (
    <>
      <Head>
        <meta http-equiv="origin trial" content={summarizerToken} />
        <meta http-equiv="origin trial" content={detectorToken} />
        <meta http-equiv="origin trial" content={translatorToken} />
      </Head>

      <main className="flex">
        <Sidebar />
        <Features />
        <ChatWindow />
      </main>
    </>
  );
}
