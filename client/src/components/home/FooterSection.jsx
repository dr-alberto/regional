import LanguageSwitcher from "../LanguajeSwitcher";
import { useTranslation } from "react-i18next";

export default function FooterSection() {
  const { t } = useTranslation();

  return (
    <>
      <div
        onClick={(e) => {
          window.location.href = "/register";
        }}
        className="mx-auto max-w-7xl py-24 px-1 sm:px-6 sm:py-32 lg:px-8 cursor-pointer"
      >
        <div className="relative isolate overflow-hidden bg-teal-600 px-6 py-16 shadow-xl rounded-xl sm:px-16 md:pt-24 lg:px-16 lg:pt-0">
          <div className="mx-auto max-w-md text-center lg:mx-auto lg:py-32 ">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              {t("footer_header")}
            </h2>
            <p className="mt-6 text-lg leading-8 text-white">
              {t("footer_desc")}
            </p>
          </div>
        </div>
      </div>

      <footer className="bg-white">
        <div className="container px-6 py-8 mx-auto">
          <hr className="my-10 border-gray-200" />
          <div className="flex flex-col items-center sm:flex-row sm:justify-between">
            <p className="text-sm text-gray-500">
              © Copyright 2024. {t("rights_reserved")}
            </p>
            <LanguageSwitcher />
            <div className="flex mt-3 -mx-2 sm:mt-0">
              <a
                href="mailto:info@regionalhq.com"
                className="mx-2 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-500 dark:hover:text-gray-300"
              >
                {t("Contact")}
              </a>
              <a
                href="/terms"
                className="mx-2 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-500 dark:hover:text-gray-300"
              >
                {t("Terms")}
              </a>
              <a
                href="/privacy"
                className="mx-2 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-500 dark:hover:text-gray-300"
              >
                {t("Privacy")}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
