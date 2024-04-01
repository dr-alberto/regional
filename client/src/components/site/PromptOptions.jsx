import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { classNames } from "../../utils/utils";
import { DeletePromptModal } from "./DeletePromptModal";

export const PromptOptions = ({ prompt }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  return (
    <>
      <DeletePromptModal
        prompt={prompt}
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
      ></DeletePromptModal>
      <Menu as="div" className="relative col-span-1 py-4">
        <div>
          <Menu.Button className="relative flex max-w-xs items-center rounded-full text-sm hover:opacity-75">
            <span className="absolute -inset-1.5" />
            <span className="sr-only">Open menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-gray-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <a
                  href={`/prompts/${prompt._id}/edit`}
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "block px-4 py-2 text-sm text-gray-700"
                  )}
                >
                  Edit prompt
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  onClick={(e) => setOpenDeleteModal(true)}
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "block px-4 py-2 text-sm text-gray-700 hover:cursor-pointer"
                  )}
                >
                  Delete
                </a>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};
