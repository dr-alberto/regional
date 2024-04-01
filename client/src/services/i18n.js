import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

// https://phrase.com/blog/posts/localizing-react-apps-with-i18next/

i18next
  .use(initReactI18next)
  .use(HttpApi)
  .use(LanguageDetector)
  .init({
    interpolation: {
      escapeValue: false,
    },
    // debug: true,
    react: {
      useSuspense: false,
    },
    fallbackLng: "en",
  });

export default i18next;
