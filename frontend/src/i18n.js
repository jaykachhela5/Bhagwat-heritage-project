import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import hi from "./locales/hi.json";
import mr from "./locales/mr.json";
import gu from "./locales/gu.json";
import bn from "./locales/bn.json";
import ta from "./locales/ta.json";
import te from "./locales/te.json";
import kn from "./locales/kn.json";
import pa from "./locales/pa.json";
import sa from "./locales/sa.json";
import { DEFAULT_LANGUAGE, LANGUAGE_STORAGE_KEY, normalizeLanguage, setStoredLanguage } from "./utils/language";

const resources = {
  en: { translation: en },
  hi: { translation: hi },
  mr: { translation: mr },
  gu: { translation: gu },
  bn: { translation: bn },
  ta: { translation: ta },
  te: { translation: te },
  kn: { translation: kn },
  pa: { translation: pa },
  sa: { translation: sa },
};

const LEGACY_LANGUAGE_STORAGE_KEY = "bhagwat-language";

const migrateLegacyLanguage = () => {
  if (typeof window === "undefined") {
    return;
  }

  const activeStoredLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);

  if (activeStoredLanguage) {
    return;
  }

  const legacyLanguage = window.localStorage.getItem(LEGACY_LANGUAGE_STORAGE_KEY);

  if (legacyLanguage) {
    setStoredLanguage(legacyLanguage);
  }
};

const syncDocumentLanguage = (language) => {
  if (typeof document === "undefined") {
    return;
  }

  document.documentElement.lang = normalizeLanguage(language ?? DEFAULT_LANGUAGE);
};

migrateLegacyLanguage();

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: ["en", "hi", "mr", "gu", "bn", "ta", "te", "kn", "pa", "sa"],
    load: "languageOnly",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "htmlTag"],
      caches: ["localStorage"],
      lookupLocalStorage: LANGUAGE_STORAGE_KEY,
    },
    react: {
      useSuspense: false,
    },
  });

syncDocumentLanguage(i18n.resolvedLanguage ?? i18n.language);
i18n.on("languageChanged", syncDocumentLanguage);
i18n.on("languageChanged", setStoredLanguage);

export default i18n;
