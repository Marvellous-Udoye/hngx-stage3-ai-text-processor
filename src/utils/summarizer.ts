export const summarizeText = async (textToSummarize: string) => {
  if (typeof window === "undefined" || !window.ai?.summarizer) {
    console.error("Summarizer API is not available.");
    return null;
  }

  const options: SummarizerOptions = {
    sharedContext: "This can be any random text",
    type: "tl;dr",
    format: "markdown",
    length: "medium",
  };

  try {
    const available = (await window.ai.summarizer.capabilities()).available;

    if (available === "no") {
      console.log("The Summarizer API isn't usable.");
      return null;
    }

    if (available === "readily") {
      console.log("The Summarizer API can be used immediately.");
    }

    const summarizer = await window.ai.summarizer.create(options);

    if (available === "after-download") {
      console.log("The Summarizer API an be used after the model is downloaded.");
      summarizer.addEventListener(
        "downloadprogress",
        (e: { loaded: number; total: number }) => {
          console.log(`Download progress: ${e.loaded}/${e.total}`);
        }
      );
      await summarizer.ready;
    }

    const summary = await summarizer.summarize(textToSummarize);
    return summary;
  } catch (error) {
    console.error("Error using Summarizer API:", error);
    return null;
  }
};
