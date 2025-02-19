export {};

declare global {
  interface Window {
    ai?: {
      summarizer: {
        capabilities: () => Promise<{ available: "no" | "readily" | "eventually" }>;
        create: (options: SummarizerOptions) => Promise<SummarizerInstance>;
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
}
