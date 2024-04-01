import { useRef, useState, Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { classNames } from "../../utils/utils";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router";


export const CreatePortalModal = ({ siteId, open, setOpen, errors, setErrors }) => {
  const { user } = useAuthContext();
  // const [errors, setErrors] = useState({});
  // const [open, setOpen] = useState(false); // Create form modal state
  const [name, setName] = useState(undefined);
  const navigate = useNavigate();
  const cancelButtonRef = useRef(null);

  async function createPortal(e) {
    e.preventDefault();
    setErrors({}); // Reset errors

    try {
      const response = await fetch("/api/portals", {
        method: "POST",
        headers: {
          "x-access-token": user.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, siteId }),
      });

      const result = await response.json();

      if (response.ok) {
        // navigate to edit form page
        navigate(`/portals/${result._id}`);
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

  function closePortalCreationModal(e) {
    setOpen(false);
    setName("");
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-20"
        initialFocus={cancelButtonRef}
        onClose={closePortalCreationModal}
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
                      Create a new user portal
                    </Dialog.Title>
                  </div>
                  <div className="mt-5">
                    <form id="form-name" onSubmit={createPortal}>
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

                        <div className="mt-2">
                          <input
                            name="name"
                            type="text"
                            autoComplete="off"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required
                            placeholder="Product A"
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
                    onClick={closePortalCreationModal}
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