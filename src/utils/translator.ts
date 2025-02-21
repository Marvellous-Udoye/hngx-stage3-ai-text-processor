export const translateText = async (text: string, targetLanguage: TranslatorOptions["targetLanguage"]) => {
  if (typeof window === "undefined" || !window.ai?.translator) {
    console.error("Translator API is not available.");
    return null;
  }
  
  try {
    const detector = await window.ai.languageDetector.create();
    const detectedLanguages = (await detector.detect(text)) as unknown as {
      detectedLanguage: string;
      confidence: number;
    }[];
    
    if (!detectedLanguages || detectedLanguages.length === 0) {
      console.warn("No language detected, defaulting to English.");
      return null;
    }

    const mostConfident = detectedLanguages[0].detectedLanguage as TranslatorOptions["sourceLanguage"];

    const supportedLanguages: TranslatorOptions["sourceLanguage"][] = ["en", "pt", "es", "ru", "tr", "fr"];
    const sourceLanguage = supportedLanguages.includes(mostConfident) ? mostConfident : "en";

    const options: TranslatorOptions = {
      sourceLanguage,
      targetLanguage,
    };

    const available = (await window.ai.translator.capabilities()).available;
    let translator;

    if (available === "no") {
      console.log("The Translator API isn't usable.");
      return null;
    }

    if (available === "readily") {
      console.log("The Translator API can be used immediately.");
      translator = await window.ai.translator.create(options);
    } else {
      console.log("The Translator API can be used after the model is downloaded.");
      translator = await window.ai.translator.create(options);
      translator.addEventListener(
        "downloadprogress",
        (e: { loaded: number; total: number }) => {
          console.log(`Download progress: ${e.loaded}/${e.total}`);
        }
      );
      await translator.ready;
    }

    const translation = await translator.translate(text);
    return translation;
  } catch (error) {
    console.error("Error using Translator API:", error);
    return null;
  }
};
