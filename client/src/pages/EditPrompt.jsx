import Navbar from "../components/Navbar";
import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import toast, { Toaster } from "react-hot-toast";
import { Transition, Listbox, Switch } from "@headlessui/react";
import { SketchPicker } from "react-color";
import { COUNTRIES, FONTS, STYLES } from "../utils/constants";
import Select from "../components/Select";
import { classNames } from "../utils/utils";
import { Tooltip } from "react-tooltip";
import { TextLink } from "../components/TextLink";
import { PublishModal } from "../components/editPrompt/PublishModal";
import { Header } from "../components/editPrompt/Header";

export const EditPrompt = () => {
  const [promptData, setPromptData] = useState({});
  const [portalData, setPortalData] = useState({});
  const [selected, setSelected] = useState(null);
  const [selectedIsAvailable, setSelectedIsAvailable] = useState(false);
  const [siteId, setSiteId] = useState(null);
  const [errors, setErrors] = useState({});
  const [openPublishModal, setOpenPublishModal] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const [loading, setIsLoading] = useState(true);
  const [previewKey, setPreviewKey] = useState(0); // Used to force reload of iframe element

  const handleSelectCountry = (country) => {
    setSelected(country);
    setSelectedIsAvailable(portalData.availableRegions.includes(country.id));
  };

  // Show color picker
  function toggleColorPicker(e) {
    setShowPicker(!showPicker);
  }

  const openPortal = (e) => {
    const portalUrl = `/test/${portalData.id}?cc=${selected.id}`;
    window.open(portalUrl, "_blank").focus();

    // cancelModal(e)
  };

  // Form id
  const { id } = useParams();
  const { user } = useAuthContext();

  useEffect(() => {
    // document.title = "Form edit"
    const fetchForm = async () => {
      try {
        const response = await fetch(`/api/prompts/${id}`, {
          headers: {
            "x-access-token": user.token,
          },
        });

        const result = await response.json();

        setPromptData({
          name: result.prompt.name,
          font: result.prompt.font,
          style: result.prompt.style,
          color: result.prompt.color,
          showOnlyToNonAvailableRegions:
            result.prompt.showOnlyToNonAvailableRegions,
        });

        setPortalData({
          id: result.portal.id,
          brandName: result.portal.brandName,
          name: result.portal.name,
          availableRegions: result.portal.availableRegions,
        });

        setSiteId(result.site._id);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchForm();
  }, []);

  // On every field change
  useEffect(() => {
    // saveForm and show success/error message
    setIsModified(true);
  }, [promptData]);

  function updateColor(c) {
    setPromptData({
      ...promptData,
      color: c.hex,
    });
    setIsModified(true);
  }

  function updateDisplaySettings(e) {
    setPromptData({
      ...promptData,
      showOnlyToNonAvailableRegions: !promptData.showOnlyToNonAvailableRegions,
    });
  }

  function formUpdate() {
    return new Promise((resolve, reject) => {
      setErrors({}); // Reset errors

      fetch(`/api/prompts/${id}`, {
        method: "POST",
        headers: {
          "x-access-token": user.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(promptData),
      })
        .then((response) => {
          if (response.ok || response.status === 400) {
            setIsModified(false);
            // return response.json(), response.status;
            return Promise.all([response.json(), response.status]);
          } else {
            reject(new Error("Error saving, try again later"));
          }
        })
        .then(([data, status]) => {
          // Resolve the promise with the successful response data
          if (status === 400) {
            data.errors.map((error) => {
              // For each field add the error msg to render
              setErrors({
                ...errors,
                [error.path]: error.msg,
              });
            });

            reject(new Error("Error saving, correct the fields"));
          } else {
            resolve(data);
          }
        })
        .catch((error) => {
          // Reject the promise with the error encountered during the request
          reject(new Error("Error saving, try again later"));
        });
    });
  }

  const saveData = () => {
    toast.promise(formUpdate(), {
      loading: "Saving...",
      success: (data) => `Changes saved`,
      error: (err) => `${err.message}`,
    });
    setPreviewKey(previewKey + 1);
  };

  const handleSettingsChange = (e) => {
    setPromptData({
      ...promptData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    !loading && (
      <>
        <Navbar name={""} />
        <div>
          <Toaster />
        </div>
        <Tooltip id="my-tooltip" />
        <PublishModal
          open={openPublishModal}
          setOpen={setOpenPublishModal}
          promptId={id}
        />
        <Header
          siteId={siteId}
          name={promptData.name}
          onPublish={() => setOpenPublishModal(true)}
          onSave={saveData}
          isModified={isModified}
        ></Header>
        <div className="h-screen">
          <div className="w-full pt-5 justify-center h-full bg-accent">
            <div className="bg-white mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 h-full">
              <div className="grid grid-cols-12 gap-4 divide-x">
                <div className="col-span-4">
                  <div className="mt-2">
                    <h2 className="mb-4 text-lg font-semibold leading-7 text-gray-800">
                      Settings
                    </h2>
                  </div>

                  <div>
                    <div className="mt-5">
                      <div className="flex justify-between items-center">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Name
                        </label>
                        <div className="text-sm text-gray-500">
                          Won't be visible for users
                        </div>
                      </div>
                      <div className="mt-2">
                        <input
                          type="text"
                          onChange={handleSettingsChange}
                          name="name"
                          value={promptData.name}
                          className={classNames(
                            errors.name ? "ring-red-300" : " ",
                            "block w-full text-gray-900 ring-gray-300 focus:ring-indigo-600 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                          )}
                        />
                        {errors.name && (
                          <p className="mt-1 text-red-600 text-sm">
                            {errors.name}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-5">
                      <div className="flex justify-between items-center">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          <a
                            data-tooltip-id="my-tooltip"
                            data-tooltip-html="Users that click in the prompt <br/>will be redirected to this portal"
                            data-tooltip-place="right"
                            className="cursor-pointer underline decoration-dashed underline-offset-4"
                          >
                            Connected portal
                          </a>
                        </label>
                        <TextLink
                          text={"Edit portal"}
                          url={`/portals/${portalData.id}`}
                        />
                      </div>
                      <div className="mt-2">
                        <div className="ring-1 ring-gray-300 rounded-md relative w-full cursor-default bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm focus:outline-none sm:text-sm sm:leading-6">
                          <span className="flex items-center">
                            <span className="block truncate">
                              {portalData.name}
                            </span>
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5">
                      <div className="">
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                          <a
                            data-tooltip-id="my-tooltip"
                            data-tooltip-html="Only users from non available <br/>regions will see this prompt"
                            data-tooltip-place="right"
                            className="cursor-pointer underline decoration-dashed underline-offset-4"
                          >
                            Display only to visitors from non available regions
                          </a>
                        </label>
                      </div>
                      <Switch
                        checked={promptData.showOnlyToNonAvailableRegions}
                        onChange={updateDisplaySettings}
                        className={`${
                          promptData.showOnlyToNonAvailableRegions
                            ? "bg-teal-600"
                            : "bg-gray-200"
                        } relative inline-flex h-6 w-11 items-center rounded-full mt-2`}
                      >
                        <span className="sr-only">Enable notifications</span>
                        <span
                          className={`${
                            promptData.showOnlyToNonAvailableRegions
                              ? "translate-x-6"
                              : "translate-x-1"
                          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                        />
                      </Switch>
                    </div>

                    <div className="mt-5">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Font
                      </label>
                      <div className="mt-2">
                        <Select
                          options={FONTS}
                          selectedOption={promptData.font}
                          onChange={(e) =>
                            setPromptData((prevData) => ({
                              ...prevData,
                              font: e,
                            }))
                          }
                        ></Select>
                      </div>
                    </div>

                    <div className="mt-5">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Style
                      </label>
                      <div className="mt-2">
                        <Select
                          options={STYLES}
                          selectedOption={promptData.style}
                          onChange={(e) =>
                            setPromptData((prevData) => ({
                              ...prevData,
                              style: e,
                            }))
                          }
                        ></Select>
                      </div>
                    </div>

                    <div className="mt-5">
                      <label
                        htmlFor="colorPicker"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Brand color
                      </label>

                      <div className="mt-2 flex items-center gap-x-3">
                        <button
                          className="w-12 h-12 rounded-md border border-gray-300"
                          style={{ backgroundColor: promptData.color }}
                          onClick={toggleColorPicker}
                        ></button>
                        <button
                          onClick={toggleColorPicker}
                          className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                          Change
                        </button>
                      </div>
                      {showPicker && (
                        <>
                          <button
                            className="fixed inset-0 opacity-50"
                            onClick={toggleColorPicker}
                          ></button>
                          <div className="absolute z-10">
                            <SketchPicker
                              id="colorPicker"
                              color={promptData.color}
                              onChange={updateColor}
                              disableAlpha={true} // Disable alpha channel
                              className="mt-2"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-span-8">
                  <div class="flex justify-between mx-4 mt-4">
                    <h2 className="mb-5 text-lg font-semibold leading-7 text-gray-800">
                      Preview
                    </h2>
                    <div
                      style={{
                        fontFamily: `${promptData.font}, system-ui, sans-serif`,
                      }}
                      className={classNames(
                        promptData.style === "Pill" ? "rounded-lg" : null,
                        promptData.style === "Rounded" ? "rounded-md" : null,
                        "relative flex flex-col justify-between transform overflow-hidden h-96 bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
                      )}
                    >
                      <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="mt-3 text-center sm:mt-0 sm:text-left">
                          <div
                            as="h3"
                            className="text-xl font-semibold leading-6 text-gray-900"
                          >
                            Check if {portalData.brandName} is available in your
                            region
                          </div>
                        </div>
                        <div className="mt-5">
                          <form id="form-name">
                            <div className="flex flex-col">
                              <div className="mt-2">
                                <div className="">
                                  <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Select your country
                                  </label>
                                  <div
                                    className={classNames(
                                      promptData.style === "Pill"
                                        ? "rounded-lg"
                                        : null,
                                      promptData.style === "Rounded"
                                        ? "rounded-md"
                                        : null,
                                      "flex flex-col divide-y ring-1 ring-offset-0 ring-gray-300 mt-2"
                                    )}
                                  >
                                    <div>
                                      <Listbox
                                        value={selected}
                                        onChange={handleSelectCountry}
                                      >
                                        {({ open }) => (
                                          <div className="relative">
                                            <Listbox.Button
                                              className={classNames(
                                                promptData.style === "Pill"
                                                  ? "rounded-lg"
                                                  : null,
                                                promptData.style === "Rounded"
                                                  ? "rounded-md"
                                                  : null,
                                                "relative w-full cursor-default bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm focus:outline-none sm:text-sm sm:leading-6"
                                              )}
                                            >
                                              <span className="flex items-center">
                                                <span className="block truncate">
                                                  {selected
                                                    ? selected.name
                                                    : "Select"}
                                                </span>
                                              </span>
                                              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  fill="none"
                                                  viewBox="0 0 24 24"
                                                  strokeWidth={1.5}
                                                  stroke="currentColor"
                                                  className="h-5 w-5 text-gray-400"
                                                  aria-hidden="true"
                                                >
                                                  <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                                                  />
                                                </svg>
                                              </span>
                                            </Listbox.Button>

                                            <Transition
                                              show={open}
                                              as={Fragment}
                                              leave="transition ease-in duration-100"
                                              leaveFrom="opacity-100"
                                              leaveTo="opacity-0"
                                            >
                                              <Listbox.Options
                                                className={classNames(
                                                  promptData.style === "Pill"
                                                    ? "rounded-lg"
                                                    : null,
                                                  promptData.style === "Rounded"
                                                    ? "rounded-md"
                                                    : null,
                                                  "absolute z-10 mt-1 max-h-48 w-full overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                                                )}
                                              >
                                                {COUNTRIES.map((option) => (
                                                  <Listbox.Option
                                                    key={option.id}
                                                    className={({ active }) =>
                                                      classNames(
                                                        active
                                                          ? "bg-indigo-600 text-white"
                                                          : "text-gray-900",
                                                        "relative cursor-default select-none py-2 pl-3 pr-9"
                                                      )
                                                    }
                                                    value={option}
                                                  >
                                                    {({ selected, active }) => (
                                                      <>
                                                        <div className="flex items-center">
                                                          <span
                                                            className={classNames(
                                                              selected
                                                                ? "font-semibold"
                                                                : "font-normal",
                                                              "ml-3 block truncate"
                                                            )}
                                                          >
                                                            {option.name}
                                                          </span>
                                                        </div>

                                                        {selected ? (
                                                          <span
                                                            className={classNames(
                                                              active
                                                                ? "text-white"
                                                                : "text-indigo-600",
                                                              "absolute inset-y-0 right-0 flex items-center pr-4"
                                                            )}
                                                          >
                                                            <svg
                                                              xmlns="http://www.w3.org/2000/svg"
                                                              fill="none"
                                                              viewBox="0 0 24 24"
                                                              strokeWidth={1.5}
                                                              stroke="currentColor"
                                                              className="h-5 w-5"
                                                              aria-hidden="true"
                                                            >
                                                              <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="m4.5 12.75 6 6 9-13.5"
                                                              />
                                                            </svg>
                                                          </span>
                                                        ) : null}
                                                      </>
                                                    )}
                                                  </Listbox.Option>
                                                ))}
                                              </Listbox.Options>
                                            </Transition>
                                          </div>
                                        )}
                                      </Listbox>
                                    </div>
                                  </div>

                                  <div className="my-2">
                                    {selected && !selectedIsAvailable && (
                                      <div className="flex gap-x-1 items-center text-sm">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth={3.5}
                                          stroke="currentColor"
                                          className="w-4 h-4 text-red-600"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18 18 6M6 6l12 12"
                                          />
                                        </svg>
                                        {portalData.brandName} isn't yet
                                        available in your region
                                      </div>
                                    )}

                                    {selected && selectedIsAvailable && (
                                      <div className="flex gap-x-1 items-center text-sm">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth={3.5}
                                          stroke="currentColor"
                                          className="w-4 h-4 text-teal-600"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m4.5 12.75 6 6 9-13.5"
                                          />
                                        </svg>
                                        {portalData.brandName} is available in
                                        your region
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>

                      <div className="bg-white p-4 flex sm:flex-row flex-col justify-between items-center">
                        <a
                          style={{ fontFamily: "system-ui, sans-serif" }}
                          className="text-sm flex gap-x-2 items-center mb-4 sm:mb-0 cursor-pointer"
                        >
                          Powered by
                          <img
                            className="h-7 w-auto grayscale"
                            src="/logo.svg"
                            alt=""
                          />
                        </a>
                        <div className="sm:flex sm:flex-row-reverse w-full sm:w-auto">
                          {selected && !selectedIsAvailable && (
                            <button
                              type="button"
                              onClick={openPortal}
                              style={{ backgroundColor: promptData.color }}
                              className={classNames(
                                promptData.style === "Pill"
                                  ? "rounded-lg"
                                  : null,
                                promptData.style === "Rounded"
                                  ? "rounded-md"
                                  : null,
                                `inline-flex w-full justify-center px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-75 sm:ml-3 sm:w-auto`
                              )}
                            >
                              Get notified when it's available
                            </button>
                          )}
                          {selected && selectedIsAvailable && (
                            <button
                              type="button"
                              style={{ backgroundColor: promptData.color }}
                              className={classNames(
                                promptData.style === "Pill"
                                  ? "rounded-lg"
                                  : null,
                                promptData.style === "Rounded"
                                  ? "rounded-md"
                                  : null,
                                "inline-flex w-full justify-center px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-75 sm:ml-3 sm:w-auto"
                              )}
                            >
                              Continue to site
                            </button>
                          )}
                          <button
                            type="button"
                            className={classNames(
                              promptData.style === "Pill" ? "rounded-lg" : null,
                              promptData.style === "Rounded"
                                ? "rounded-md"
                                : null,
                              "mt-3 inline-flex w-full justify-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            )}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
};
