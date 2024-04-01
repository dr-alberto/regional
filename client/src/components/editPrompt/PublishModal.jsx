import { Fragment, useState, useRef } from "react";
import { Dialog, Transition, RadioGroup } from "@headlessui/react";
import { classNames } from "../../utils/utils";
import { ENDPOINT } from "../../utils/constants";

export const PublishModal = ({ open, setOpen, promptId }) => {
  const [publish, setPublish] = useState(null);
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Add this prompt to your website
                    </Dialog.Title>
                  </div>
                  <div className="mt-5">
                    <RadioGroup value={publish} onChange={setPublish}>
                      <RadioGroup.Label
                        className={
                          "block text-sm font-medium leading-6 text-gray-900"
                        }
                      >
                        Publish options
                      </RadioGroup.Label>
                      <RadioGroup.Option value="manual">
                        {({ checked }) => (
                          <div
                            className={classNames(
                              checked ? "bg-slate-100 border-2 " : "",
                              "my-2 border border-1 border-slate-200 rounded-lg p-2 cursor-pointer hover:bg-slate-50"
                            )}
                          >
                            <div className="flex items-center justify-between font-semibold leading-6 text-gray-900">
                              Manual
                            </div>
                            <div className="block text-sm leading-6 text-gray-700">
                              Add a script to your html template
                            </div>
                          </div>
                        )}
                      </RadioGroup.Option>
                      <RadioGroup.Option value="wordpress">
                        {({ checked }) => (
                          <div
                            className={classNames(
                              checked ? "bg-slate-100 border-2 " : "",
                              "my-2 border border-1 border-slate-200 rounded-lg p-2 cursor-pointer hover:bg-slate-50"
                            )}
                          >
                            <div className="flex items-center justify-between font-semibold leading-6 text-gray-900">
                              Wordpress
                            </div>
                            <div className="block text-sm leading-6 text-gray-700">
                              Custom Wordpress integration
                            </div>
                          </div>
                        )}
                      </RadioGroup.Option>
                      <RadioGroup.Option value="shopify">
                        {({ checked }) => (
                          <div
                            className={classNames(
                              checked ? "bg-slate-100 border-2 " : "",
                              "my-2 border border-1 border-slate-200 rounded-lg p-2 cursor-pointer hover:bg-slate-50"
                            )}
                          >
                            <div className="flex items-center justify-between font-semibold leading-6 text-gray-900">
                              Shopify
                            </div>
                            <div className="block text-sm leading-6 text-gray-700">
                              Custom Shopify integration
                            </div>
                          </div>
                        )}
                      </RadioGroup.Option>
                    </RadioGroup>

                    {publish === "manual" && (
                      <div className="flex flex-col mt-10">
                        <div className="font-semibold leading-6 text-gray-900">
                          Integrate manually
                        </div>
                        <div className="text-sm leading-6 text-gray-700">
                          Copy and paste this code at the top of your {"<body>"}{" "}
                          tag
                        </div>

                        <div className="mt-2">
                          <textarea
                            rows={4}
                            disabled
                            className="w-full resize-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                          >
                            {`<script defer src='${ENDPOINT}/widget/widget-bundle.js' data-widget='regionalhq-prompt' id='${promptId}'></script>\n<div id='widget-root'></div>`}
                          </textarea>
                        </div>
                      </div>
                    )}
                    {publish === "wordpress" && (
                      <div className="flex flex-col">
                        <div className="flex justify-between items-center">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Coming soon
                          </label>
                        </div>
                      </div>
                    )}
                    {publish === "shopify" && (
                      <div className="flex flex-col">
                        <div className="flex justify-between items-center">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Coming soon
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
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
