import { Button } from "../Button";
import { TextLink } from "../TextLink";
import { RadioGroup } from "@headlessui/react";
import { useState, useEffect } from "react";
import { classNames } from "../../utils/utils";
import { Listbox } from "@headlessui/react";
import { Transition } from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/24/outline";
import { DEMO_LINK } from "../../utils/constants";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";

export default function IntegrationSection() {
  const [portalSample, setPortalSample] = useState(null);
  const [selected, setSelected] = useState(null);
  const {t} = useTranslation();
  
  const people = [
    {
      id: 1,
      name: "Brazil",
    },
    {
      id: 2,
      name: "Argentina",
    },
  ];

  useEffect(() => {
    setPortalSample("onboarding");
  }, []);

  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="mt-20 text-center text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t('integrate_header')}
          </p>
          <p className="mt-6 text-center text-lg leading-8 text-gray-600">
            {t('integrate_desc')}
          </p>
          <RadioGroup value={portalSample} onChange={setPortalSample}>
            <div className="grid grid-cols-2 gap-x-6 mt-10">
              <RadioGroup.Option
                value="onboarding"
                className={"col-span-2 sm:col-span-1"}
              >
                {({ checked }) => (
                  <div
                    className={classNames(
                      checked
                        ? "bg-slate-100 border-slate-300"
                        : "border-slate-200",
                      "my-2 border border-1 rounded-lg p-3 cursor-pointer hover:bg-slate-50"
                    )}
                  >
                    <div className="flex items-center gap-x-2 font-semibold leading-6 text-lg text-gray-900">
                      {t('integrate_onboarding_header')}
                    </div>
                    <div className="block text-md mt-1 leading-6 text-gray-700">
                      {t('integrate_onboarding_desc')}
                    </div>
                  </div>
                )}
              </RadioGroup.Option>
              <RadioGroup.Option
                value="checkout"
                className={"col-span-2 sm:col-span-1"}
              >
                {({ checked }) => (
                  <div
                    className={classNames(
                      checked
                        ? "bg-slate-100 border-slate-300"
                        : "border-slate-200",
                      "my-2 border border-1 rounded-lg p-3 cursor-pointer hover:bg-slate-50"
                    )}
                  >
                    <div className="flex items-center gap-x-2 font-semibold leading-6 text-lg text-gray-900">
                      {t('integrate_checkout_header')}
                    </div>
                    <div className="block text-md mt-1 leading-6 text-gray-700">
                      {t('integrate_checkout_desc')}
                    </div>
                  </div>
                )}
              </RadioGroup.Option>
            </div>
          </RadioGroup>

          {portalSample === "onboarding" && (
            <div className="flex flex-col mt-10">
              <div className="flex flex-wrap mt-8 rounded-xl ring-8 ring-slate-200 py-20 mb-20 text-gray-500">
                <div className="mx-auto w-full max-w-xl px-10 mb-4">
                  <form className="mt-10" disabled>
                    <p className="text-xl mb-5 text-center">
                      Create your account
                    </p>

                    <div className="flex flex-col text-gray-500 mt-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6"
                      >
                        Name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6"
                          disabled
                        />
                      </div>
                    </div>

                    <div className="flex flex-col text-gray-500 mt-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6"
                      >
                        Email
                      </label>
                      <div className="mt-2">
                        <input
                          type="email"
                          className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6"
                          disabled
                        />
                      </div>
                    </div>

                    <Listbox value={selected} onChange={setSelected}>
                      {({ open }) => (
                        <>
                          <Listbox.Label className="block text-sm font-medium leading-6 mt-4">
                            Select your country
                          </Listbox.Label>
                          <div className="relative mt-2">
                            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 sm:text-sm sm:leading-6">
                              <span className="flex items-center">
                                {/* <img src={selected.avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" /> */}
                                <span className="ml-3 block truncate">
                                  {selected ? selected.name : "Select"}
                                </span>
                              </span>
                              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                <ChevronUpDownIcon
                                  className="h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                              </span>
                            </Listbox.Button>

                            <Transition
                              show={open}
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {people.map((person) => (
                                  <Listbox.Option
                                    key={person.id}
                                    className={({ active }) =>
                                      classNames(
                                        active ? "bg-gray-400 text-white" : "",
                                        "relative cursor-default select-none py-2 pl-3 pr-9"
                                      )
                                    }
                                    value={person}
                                  >
                                    {({ selected, active }) => (
                                      <>
                                        <div className="flex items-center">
                                          {/* <img src={person.avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" /> */}
                                          <span
                                            className={classNames(
                                              selected
                                                ? "font-semibold"
                                                : "font-normal",
                                              "ml-3 block truncate"
                                            )}
                                          >
                                            {person.name}
                                          </span>
                                        </div>

                                        {selected ? (
                                          <span
                                            className={classNames(
                                              active ? "text-white" : "",
                                              "absolute inset-y-0 right-0 flex items-center pr-4"
                                            )}
                                          >
                                            <CheckIcon
                                              className="h-5 w-5"
                                              aria-hidden="true"
                                            />
                                          </span>
                                        ) : null}
                                      </>
                                    )}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </>
                      )}
                    </Listbox>

                    <div className="mt-5 text-md">
                      <p className="block leading-6 text-sm mb-2 font-semibold text-zinc-950">
                        Can't find your country?
                      </p>
                      <TextLink
                        text={"Get notified when we launch on your region"}
                        url={DEMO_LINK}
                        target={"_blank"}
                      />
                    </div>
                    <div className="float-right mt-5">
                      <button
                        className="bg-gray-400 rounded-full text-white text-sm py-1 px-2 focus:outline-none focus:shadow-outline"
                        type="button"
                      >
                        Continue
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {portalSample === "checkout" && (
            <div className="flex flex-col mt-10">
              <div className="flex flex-wrap mt-8 rounded-xl ring-8 ring-slate-200 py-20 mb-20 text-gray-500">
                <div className="w-full md:w-1/2 px-10 mb-4">
                  <div>
                    <h2 className="sr-only">Steps</h2>

                    <div>
                      <div className="overflow-hidden rounded-full bg-gray-200">
                        <div className="h-2 w-1/2 rounded-full bg-gray-300"></div>
                      </div>

                      <ol className="mt-4 grid grid-cols-3 text-sm font-medium text-gray-500">
                        <li className="flex items-center justify-start sm:gap-1.5">
                          <span className="hidden sm:inline"> Details </span>

                          <svg
                            className="h-6 w-6 sm:h-5 sm:w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                            />
                          </svg>
                        </li>

                        <li className="flex items-center justify-center sm:gap-1.5">
                          <span className="hidden sm:inline"> Address </span>

                          <svg
                            className="h-6 w-6 sm:h-5 sm:w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </li>

                        <li className="flex items-center justify-end sm:gap-1.5">
                          <span className="hidden sm:inline"> Payment </span>

                          <svg
                            className="h-6 w-6 sm:h-5 sm:w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                            />
                          </svg>
                        </li>
                      </ol>
                    </div>
                  </div>

                  <form className="mt-10" disabled>
                    <p className="text-xl mb-5">Shipping information</p>
                    <Listbox value={selected} onChange={setSelected}>
                      {({ open }) => (
                        <>
                          <Listbox.Label className="block text-sm font-medium leading-6">
                            Select your country
                          </Listbox.Label>
                          <div className="relative mt-2">
                            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 sm:text-sm sm:leading-6">
                              <span className="flex items-center">
                                {/* <img src={selected.avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" /> */}
                                <span className="ml-3 block truncate">
                                  {selected ? selected.name : "Select"}
                                </span>
                              </span>
                              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                <ChevronUpDownIcon
                                  className="h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                              </span>
                            </Listbox.Button>

                            <Transition
                              show={open}
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {people.map((person) => (
                                  <Listbox.Option
                                    key={person.id}
                                    className={({ active }) =>
                                      classNames(
                                        active ? "bg-gray-400 text-white" : "",
                                        "relative cursor-default select-none py-2 pl-3 pr-9"
                                      )
                                    }
                                    value={person}
                                  >
                                    {({ selected, active }) => (
                                      <>
                                        <div className="flex items-center">
                                          {/* <img src={person.avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" /> */}
                                          <span
                                            className={classNames(
                                              selected
                                                ? "font-semibold"
                                                : "font-normal",
                                              "ml-3 block truncate"
                                            )}
                                          >
                                            {person.name}
                                          </span>
                                        </div>

                                        {selected ? (
                                          <span
                                            className={classNames(
                                              active ? "text-white" : "",
                                              "absolute inset-y-0 right-0 flex items-center pr-4"
                                            )}
                                          >
                                            <CheckIcon
                                              className="h-5 w-5"
                                              aria-hidden="true"
                                            />
                                          </span>
                                        ) : null}
                                      </>
                                    )}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </>
                      )}
                    </Listbox>

                    <div className="mt-5 text-md">
                      <p className="block leading-6 text-sm mb-2 font-semibold text-zinc-950">
                        Can't find your country?
                      </p>
                      <TextLink
                        text={"Get notified when we launch on your region"}
                        url={DEMO_LINK}
                        target={"_blank"}
                      />
                    </div>
                    <div className="float-right mt-5">
                      <button
                        className="bg-gray-400 rounded-full text-white text-sm py-1 px-2 focus:outline-none focus:shadow-outline"
                        type="button"
                      >
                        Continue
                      </button>
                    </div>
                  </form>
                </div>

                {/* Products Column */}
                <div className="w-full md:w-1/2 px-2 mb-4">
                  {/* Iterate over products here */}
                  <p className="text-xl mb-5 text-gray-500">Order summary</p>

                  <div className="flex items-center border border-gray-200 p-5">
                    <img
                      className="h-16 w-16 object-cover mr-4 grayscale"
                      src="/makeup_kit.jpg"
                      alt="Product"
                    />
                    <div className="w-full">
                      <p className="font-semibold  flex justify-between">
                        Makeup kit
                        <p>$150.00</p>
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        The coolest makeup kit in the world.
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between mb-4 border border-gray-200 p-5 font-semibold">
                    Total
                    <p>$140.00</p>
                  </div>

                  {/* Repeat the above div for each product in the list */}
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
