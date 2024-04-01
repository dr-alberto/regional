import { useRef, useState, Fragment } from "react";
import { Transition, Dialog, Listbox } from "@headlessui/react";
import { classNames } from "../../utils/utils";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router";


export const CreatePromptModal = ({ portals, open, setOpen, errors, setErrors }) => {
  const { user } = useAuthContext();

  const [name, setName] = useState(undefined);
  const [selectedPortal, setSelectedPortal] = useState(undefined);
  const navigate = useNavigate();

  async function createPrompt(e) {
    e.preventDefault();
    setErrors({}); // Reset errors

    if (selectedPortal) {
      try {
        const response = await fetch("/api/prompts", {
          method: "POST",
          headers: {
            "x-access-token": user.token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, portalId: selectedPortal._id }),
        });

        const result = await response.json();

        if (response.ok) {
          // navigate to edit form page
          navigate(`/prompts/${result._id}/edit`);
        } else if (response.status === 400) {
          result.errors.map((error) => {
            // For each field add the error msg to render
            setErrors({
              ...errors,
              [error.path]: error.msg,
            });
          });
        }
      } catch (error) {}
    }
  }

  const cancelButtonRef = useRef(null);

  function closePromptCreationModal(e) {
    setOpen(false);
    setName("");
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-20"
        initialFocus={cancelButtonRef}
        onClose={closePromptCreationModal}
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
                      Create a new prompt
                    </Dialog.Title>
                  </div>
                  <div className="mt-10">
                    <form id="form-name" onSubmit={createPrompt}>
                      <div className="flex flex-col">
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

                        <div className="mt-4">
                          <input
                            name="name"
                            type="text"
                            autoComplete="off"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required
                            placeholder="Prompt A"
                            className={classNames(
                              errors.name ? "ring-2 ring-red-300" : " ",
                              "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                            )}
                          />
                          {errors.name && (
                            <p className="mt-1 text-red-600 text-sm">
                              {errors.name}
                            </p>
                          )}
                        </div>
                        <div className="mt-4 h-72">
                          <label className="block text-sm font-medium leading-6 text-gray-900">
                            Select the portal
                          </label>
                          <div className="flex flex-col divide-y ring-1 ring-offset-0 ring-gray-300 rounded mt-2">
                            <div>
                              <Listbox
                                value={selectedPortal}
                                onChange={setSelectedPortal}
                              >
                                {({ open }) => (
                                  <div className="relative">
                                    <Listbox.Button
                                      className={
                                        // classNames(
                                        // form.formStyle === 'Pill' ? 'rounded-lg' : null,
                                        // form.formStyle === 'Rounded' ? 'rounded-md' : null,
                                        // error ? 'ring-1 ring-red-300' : null,
                                        "relative w-full cursor-default bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm focus:outline-none sm:text-sm sm:leading-6"
                                      }
                                    >
                                      <span className="flex items-center">
                                        <span className="block truncate">
                                          {selectedPortal
                                            ? selectedPortal.name
                                            : "Select a portal"}
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
                                        className={
                                          "absolute z-50 mt-1 max-h-48 w-full overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                                        }
                                      >
                                        {portals.map((option) => (
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
                            {portals.length === 0 && (
                              <div className="flex gap-x-1 items-center text-sm font-semibold text-teal-600">
                                Create a portal first
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="bg-white px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="submit"
                    form="form-name"
                    className="inline-flex w-full justify-center rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 sm:ml-3 sm:w-auto"
                  >
                    Create
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={closePromptCreationModal}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}