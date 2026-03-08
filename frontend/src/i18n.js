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

const syncDocumentLanguage = (language) => {
  if (typeof document === "undefined") {
    return;
  }

  document.documentElement.lang = (language ?? "en").split("-")[0];
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    supportedLngs: ["en", "hi", "mr", "gu", "bn", "ta", "te", "kn", "pa", "sa"],
    load: "languageOnly",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
      lookupLocalStorage: "bhagwat-language",
    },
    react: {
      useSuspense: false,
    },
  });

syncDocumentLanguage(i18n.resolvedLanguage ?? i18n.language);
i18n.on("languageChanged", syncDocumentLanguage);

export default i18n;
