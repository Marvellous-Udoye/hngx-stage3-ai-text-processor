import { LanguageMap } from "@/constants/languages";

export const getAvailableLanguages = (detectedLangCode: string) => {
  return Object.entries(LanguageMap)
    .filter(([langCode]) => langCode !== detectedLangCode)
    .map(([, value]) => value);
};