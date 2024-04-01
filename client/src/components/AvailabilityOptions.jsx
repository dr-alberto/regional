import { Fragment, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";

export const AvailabilityOptions = ({ data, selected }) => {
  const [options, setOptions] = useState([]);
  const [newOptionValue, setNewOptionValue] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    // selected is just an array of ids
    selected.map((selectedId) => {
      const selectedOption = data.filter((item) => item.id === selectedId)[0];
      if (selectedOption) {
        setOptions((prevOptions) => [...prevOptions, selectedOption]);
      }
    });
  }, []);

  const filteredOptions =
    query === ""
      ? data
      : data.filter((option) => {
          // option should have a structure {id: '', name: ''}
          return option.name.toLowerCase().includes(query.toLowerCase()); // Options with name that includes query
        });

  const handleAddOption = (e) => {
    if (newOptionValue) {
      // Get id from newOptionValue (.name)
      const option = data.filter((option) => option.name === newOptionValue)[0];

      // Check option is not already selected
      if (option && !options.includes(option)) {
        setOptions((prevOptions) => [option, ...prevOptions]);

        // Add selected option to current settings
        selected.push(option.id);
      }

      // Remove option name from create option field
      setNewOptionValue("");
    }
  };

  const handleDeleteOption = (id) => {
    const updatedOptions = options.filter((option) => option.id !== id);
    setOptions(updatedOptions);

    // Delete option from current settings
    const selectedIndex = selected.indexOf(id);

    if (selectedIndex > -1) {
      // only splice array when item is found
      selected.splice(selectedIndex, 1); // 2nd parameter means remove one item only
    }
  };

  return (
    <div>
      <div className="mt-2 flex">
        <div className="mr-4 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full">
          <Combobox value={newOptionValue} onChange={setNewOptionValue}>
            {({ open }) => (
              <div className="relative">
                <Combobox.Input
                  onChange={(event) => setQuery(event.target.value)}
                  className={
                    "border-0 relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  }
                />

                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Combobox.Options
                    className={
                      "absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                    }
                  >
                    {filteredOptions.map((option, index) => (
                      <Combobox.Option key={index} value={option.name}>
                        {({ active, selected }) => (
                          <li
                            className={`${
                              active
                                ? "bg-indigo-600 text-white cursor-default select-none py-2 pl-3 pr-9"
                                : "text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9"
                            } flex items-center justify-between`}
                          >
                            {option.name}

                            {options.includes(option) && (
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
                            )}
                          </li>
                        )}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                </Transition>
              </div>
            )}
          </Combobox>
        </div>
        <button
          onClick={handleAddOption}
          className="flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="16"
            width="14"
            viewBox="0 0 448 512"
            className="h-3 w-3 me-2"
          >
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
          </svg>
          Add
        </button>
      </div>

      <ul className="mt-4 overflow-auto max-h-40">
        {options.map((option, index) => (
          <li key={index} className="flex items-center">
            <div className="my-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full">
              <input
                className="mr-2 block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 w-full"
                value={option.name}
              />
            </div>
            <button
              onClick={() => handleDeleteOption(option.id)}
              className="hover:text-red-600 mx-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
