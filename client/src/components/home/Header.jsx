import { Button } from "../Button";
import { TextLink } from "../TextLink";
import { useTranslation } from "react-i18next";
import "animate.css";

export default function Header() {
  const { t } = useTranslation();

  return (
    <div className="relative isolate px-2 lg:px-8 bg-[url('https://raw.githubusercontent.com/dr-alberto/assets/main/bg-pattern.svg')] bg-no-repeat bg-top">
      <div className="relative mx-auto max-w-3xl pt-32 sm:pt-38 z-10 pb-10">
        <div className="flex flex-col items-center text-center py-14">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-gray-900 md:text-7xl animate__animated animate__fadeInDown">
            {t("header_title")}
          </h1>
          <p className="mt-6 text-xl leading-8 text-gray-600 animate__animated animate__fadeInDown">
            {t("header_desc")}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button text={t("header_btn_start")} url={"/register"} />
            <TextLink text={t("header_btn_more")} url={"#solution"} />
          </div>
          <div className="animate__animated animate__fadeIn">
            <img
              src="/dashboard.png"
              alt="Dashboard screenshot"
              loading="lazy"
              className="mt-10 sm:w-[78rem] sm:max-w-none rounded-md shadow-md ring-1 ring-teal-600/25"
            />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full bg-teal-600 h-36"></div>
    </div>
  );
}