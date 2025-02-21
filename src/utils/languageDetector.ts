export const detectLanguage = async () => {
  if (typeof window === "undefined" || !window.ai?.languageDetector) {
    console.error("Language Detector API is not available.");
    return null;
  }

  try {
    const canDetect = (await window.ai.languageDetector.capabilities()).available;

    if (canDetect === "no") {
      console.log("The Language Detector API isn't usable.");
      return null;
    }

    const detector = await window.ai.languageDetector.create();

    if (canDetect === "after-download") {
      console.log("Waiting for language detector model download...");
      await detector.ready;
    }

    return detector;
  } catch (error) {
    console.error("Error using Language Detector API:", error);
    return null;
  }
};
