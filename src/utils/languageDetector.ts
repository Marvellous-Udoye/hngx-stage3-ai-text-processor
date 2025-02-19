export const detectLanguage = async () => {
  if (typeof window === "undefined" || !window.ai?.languageDetector) {
    console.error("Language Detector API is not available.");
    return null;
  }

  try {
    const languageDetectorCapabilities =
      await window.ai.languageDetector.capabilities();
    const canDetect = languageDetectorCapabilities.available;

    let detector;
    if (canDetect === "no") {
      console.log("The language detector isn't usable.");
      return null;
    }
    if (canDetect === "readily") {
      console.log("The language detector can immediately be used.");
      detector = await window.ai.languageDetector.create();
    } else {
      console.log("The language detector can be used after model download.");
      detector = await window.ai.languageDetector.create();
      await detector.ready;
    }
  } catch (error) {
    console.error("Error using Language Detector API:", error);
    return null;
  }
};
