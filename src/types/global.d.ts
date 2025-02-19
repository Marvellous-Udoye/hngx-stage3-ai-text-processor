export {};

declare global {
  interface Window {
    ai?: {
      summarizer: {
        capabilities: () => Promise<{ available: "no" | "readily" | "after-download" }>;
        create: (options: SummarizerOptions) => Promise<SummarizerInstance>;
      };
      languageDetector: {
        capabilities: () => Promise<{ available: "no" | "readily" | "after-download" }>;
        create: () => Promise<LanguageDetectorInstance>;
      };
    };
  }

  interface SummarizerOptions {
    sharedContext?: string;
    type?: "key-points" | "tl;dr" | "teaser" | "headline";
    format?: "markdown" | "plain-text";
    length?: "short" | "medium" | "long";
  }

  interface SummarizerInstance {
    ready: Promise<void>;
    addEventListener: (
      event: "downloadprogress",
      callback: (e: { loaded: number; total: number }) => void
    ) => void;
    summarize: (text: string) => Promise<string>;
  }

  interface LanguageDetectorInstance {
    ready: Promise<void>;
    addEventListener: (
      event: "downloadprogress",
      callback: (e: { loaded: number; total: number }) => void
    ) => void;
    detect: (text: string) => Promise<string>;
  }
}
