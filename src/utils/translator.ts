export const translateText = async (text: string, targetLanguage: TranslatorOptions["targetLanguage"]) => {
  if (typeof window === "undefined" || !window.ai?.translator) {
    console.error("Translator API is not available.");
    return null;
  }

  const options: TranslatorOptions = {
    sourceLanguage: "en", 
    targetLanguage,
  };

  try {
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
