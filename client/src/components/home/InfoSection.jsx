import { useTranslation } from "react-i18next";

export default function InfoSection() {
  const { t } = useTranslation();

  const solutionsList = [
    {
      title: t("sol_1_header"),
      desc: t("sol_1_desc"),
    },
    {
      title: t("sol_2_header"),
      desc: t("sol_2_desc"),
    },
    {
      title: t("sol_3_header"),
      desc: t("sol_3_desc"),
    },
    {
      title: t("sol_4_header"),
      desc: t("sol_4_desc"),
    },
  ];

  return (
    <div id="solution" className="overflow-hidden bg-slate-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="">
          <div>
            <h2 className="text-base font-semibold leading-7 text-teal-600">
              {t("sol_helper")}
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t("sol_header")}
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {t("sol_desc")}
            </p>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-x-8 max-w-none">
            <dl className="max-w-xl space-y-8 text-base leading-7 text-gray-600 col-span-3 lg:col-span-1 lg:grid-cols-1">
              {solutionsList.map((solution, item) => (
                <div className="relative pl-9 ">
                  <dt className="inline font-semibold text-gray-900 text-lg">
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
                    {solution.title}
                  </dt>
                  <br />
                  <dd className="inline">{solution.desc}</dd>
                </div>
              ))}
            </dl>
            <img
              src="/dashboard.png"
              alt="Dashboard screenshot"
              loading="lazy"
              className="w-[32rem] mt-10 lg:mt-0 max-w-none rounded-md shadow-md ring-1 ring-teal-600/25 sm:w-[64rem] md:-ml-4 lg:-ml-0 col-span-3 lg:col-span-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
