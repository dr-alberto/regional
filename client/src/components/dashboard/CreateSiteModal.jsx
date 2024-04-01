import { useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { classNames } from "../../utils/utils";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router";

export const CreateSiteModal = ({ open, setOpen, errors, setErrors }) => {
  const { user } = useAuthContext();
  const [domain, setDomain] = useState(undefined);
  const navigate = useNavigate();

  async function createSite(e) {
    e.preventDefault();
    setErrors({}); // Reset errors

    try {
      const response = await fetch("/api/sites", {
        method: "POST",
        headers: {
          "x-access-token": user.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ domain }),
      });

      const result = await response.json();

      if (response.ok) {
        // navigate to edit form page
        navigate(`/sites/${result._id}`);
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

  function closeCreateSiteModal(e) {
    setOpen(false);
    setDomain("");
  }

  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-20"
        initialFocus={cancelButtonRef}
        onClose={closeCreateSiteModal}
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
                      Add a new site
                    </Dialog.Title>
                  </div>
                  <div className="mt-5">
                    <form id="form-name" onSubmit={createSite}>
                      <div className="flex flex-col">
                        <div className="flex justify-between items-center">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Domain
                          </label>
                        </div>

                        <div className="mt-2">
                          <div
                            className={classNames(
                              errors.domain ? "ring-2 ring-red-300" : " ",
                              "flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-teal-600 sm:max-w-md"
                            )}
                          >
                            <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                              https://
                            </span>
                            <input
                              type="text"
                              autoComplete="off"
                              onChange={(e) => setDomain(e.target.value)}
                              value={domain}
                              required
                              placeholder="example.com"
                              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            />
                          </div>

                          {errors.domain && (
                            <p className="mt-1 text-red-600 text-sm">
                              {errors.domain}
                            </p>
                          )}
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
                    onClick={closeCreateSiteModal}
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
};
