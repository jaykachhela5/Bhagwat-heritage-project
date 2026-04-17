export const LANGUAGE_STORAGE_KEY = "siteLanguage";

export const languageMap = {
  en: "EN",
  hi: "हिं",
  gu: "ગુજ",
  mr: "म",
};

export const DEFAULT_LANGUAGE = "en";

export function normalizeLanguage(language) {
  return (language ?? DEFAULT_LANGUAGE).split("-")[0];
}

export function getLanguageShortLabel(language) {
  return languageMap[normalizeLanguage(language)] ?? languageMap[DEFAULT_LANGUAGE];
}

export function getStoredLanguage() {
  if (typeof window === "undefined") {
    return DEFAULT_LANGUAGE;
  }

  return normalizeLanguage(window.localStorage.getItem(LANGUAGE_STORAGE_KEY) ?? DEFAULT_LANGUAGE);
}

export function setStoredLanguage(language) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(LANGUAGE_STORAGE_KEY, normalizeLanguage(language));
}
