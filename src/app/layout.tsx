import Modal from "@/components/common/Modal";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Text Processor",
  description:
    "This application allows users to input text and utilize features such as summarization, translation, and language detection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const summarizerToken = process.env.NEXT_PUBLIC_SUMMARIZER_TOKEN;
  const detectorToken = process.env.NEXT_PUBLIC_LANGUAGE_DETECTOR_TOKEN;
  const translatorToken = process.env.NEXT_PUBLIC_TRANSLATOR_TOKEN;

  return (
    <html lang="en">
      <head>
        <link
          rel="shortcut icon"
          href="/images/Sparkle.svg"
          type="image/x-icon"
        />
        <meta httpEquiv="origin trial" content={summarizerToken} />
        <meta httpEquiv="origin trial" content={detectorToken} />
        <meta httpEquiv="origin trial" content={translatorToken} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Modal />
        {children}
      </body>
    </html>
  );
}
