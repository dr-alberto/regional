import { useRef } from "react";
import { Fragment } from "react";
import { Dialog, Transition, RadioGroup } from "@headlessui/react";
import { classNames } from "../../utils/utils";
import { ENDPOINT } from "../../utils/constants";

export const PublishModal = ({ open, setOpen, updatePublished, published, publishedActive, domainVerified, customDomain, portalId }) => {
  const cancelButtonRef = useRef(null);
  
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-20"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Add user portal to your website
                    </Dialog.Title>
                  </div>
                  <div className="mt-5">
                    <button
                      onClick={(e) => updatePublished("")}
                      className="right h-fit me-3 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      Set as draft
                    </button>

                    <RadioGroup
                      value={published}
                      onChange={updatePublished}
                      className={"mt-5"}
                    >
                      <RadioGroup.Label className="block text-sm font-medium leading-6 text-gray-900">
                        Publish options
                      </RadioGroup.Label>
                      <RadioGroup.Option value="standard">
                        {({ checked }) => (
                          <div
                            className={classNames(
                              checked ? "bg-slate-100 border-2 " : "",
                              "my-2 border border-1 border-slate-200 rounded-lg p-2 cursor-pointer hover:bg-slate-50"
                            )}
                          >
                            <div className="flex items-center justify-between font-semibold leading-6 text-gray-900">
                              Standard
                              {publishedActive === "standard" && (
                                <span className="text-sm font-semibold leading-6 text-teal-600">
                                  Active
                                </span>
                              )}
                            </div>

                            <div className="block text-sm leading-6 text-gray-700">
                              Use {ENDPOINT} as the portal domain
                            </div>
                          </div>
                        )}
                      </RadioGroup.Option>
                      <RadioGroup.Option value="custom">
                        {({ checked }) => (
                          <div
                            className={classNames(
                              checked ? "bg-slate-100 border-2 " : "",
                              "my-2 border border-1 border-slate-200 rounded-lg p-2 cursor-pointer hover:bg-slate-50"
                            )}
                          >
                            <div className="flex items-center justify-between font-semibold leading-6 text-gray-900">
                              Custom
                              {publishedActive === "custom" && (
                                <span className="text-sm font-semibold leading-6 text-teal-600">
                                  Active
                                </span>
                              )}
                            </div>

                            <div className="block text-sm leading-6 text-gray-700">
                              Use a custom domain as the portal domain
                            </div>
                          </div>
                        )}
                      </RadioGroup.Option>
                    </RadioGroup>
                  </div>
                  {published === "standard" && (
                    <div className="mt-5">
                      <div className="flex flex-col">
                        <div className="flex justify-between items-center">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Url
                          </label>
                        </div>

                        <div className="mt-2">
                          <input
                            type="text"
                            value={`${ENDPOINT}/live/${portalId}`}
                            disabled
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {published === "custom" && (
                    <div className="mt-5">
                      <div className="flex flex-col">
                        <div className="">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Use your custom domain
                          </label>
                          <p className="text-sm text-gray-600">
                            Setup custom domains in the site settings
                          </p>
                        </div>

                        {!domainVerified && (
                          <a
                            href="/dashboard"
                            className="mt-2 flex gap-x-2 text-sm font-bold text-teal-600 items-center hover:text-teal-500"
                          >
                            Setup
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="w-4 h-4"
                            >
                              <path
                                fillRule="evenodd"
                                d="M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </a>
                        )}
                        {domainVerified && (
                          <div className="mt-2">
                            <input
                              type="text"
                              value={`${customDomain}/live/${portalId}`}
                              disabled
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-white px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 mt-8">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={(e) => setOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};