import { Button } from "../Button";
import { TextLink } from "../TextLink";
import { useTranslation } from "react-i18next";

export default function PortalSection() {
  const { t } = useTranslation();
  const solutions = [
    {
      title: t("portal_1_header"),
      desc: t("portal_1_desc"),
    },
    {
      title: t("portal_2_header"),
      desc: t("portal_2_desc"),
    },
    {
      title: t("portal_3_header"),
      desc: t("portal_3_desc"),
    },
  ];

  return (
    <div id="portal" className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4 my-auto">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-teal-600">
                Portal
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {t("portal_header")}
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                {t("portal_desc")}
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {solutions.map((solution, index) => (
                  <div className="relative pl-9" key={index}>
                    <dt className="inline font-semibold text-gray-900">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="absolute left-1 top-1 h-5 w-5 text-teal-600"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {solution.title}.
                    </dt>{" "}
                    <dd className="inline">{solution.desc}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-10 flex items-center gap-x-6">
                <Button text={t("header_btn_start")} url={"/register"} />
                <TextLink text={t("btn_live_demo")} url={"/demo"} />
              </div>
            </div>
          </div>
          <img
            src="/preview.png"
            alt="Product screenshot"
            loading="lazy"
            className="w-[58rem] max-w-none my-auto rounded-md shadow-md ring-1 ring-teal-600/25 sm:w-[57rem] md:-ml-4 lg:-ml-0"
          />
        </div>
      </div>
    </div>
  );
}
