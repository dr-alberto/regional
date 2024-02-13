import { useAuthContext } from "../hooks/useAuthContext";
import { useRef, Fragment, useState } from "react";
import { Transition, Dialog, Menu } from "@headlessui/react";
import { classNames } from "../utils/utils";


const DeletePortalModal = ({ portal, open, setOpen }) => {
    const cancelButtonRef = useRef(null);
    const { user } = useAuthContext();

    async function deleteSite(e) {
        try {
            const response = await fetch(`/api/portals/${portal._id}`, {
                method: 'DELETE',
                headers: {
                    "x-access-token": user.token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({sideId: portal.sideId})
            });

            if (response.ok) {
                window.location.reload();
            }

        } catch (error) {}
    }

    function closeCreateSiteModal(e) {
        setOpen(false);
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-20" initialFocus={cancelButtonRef} onClose={closeCreateSiteModal}>
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
                            
                            <div className='px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">Delete portal</Dialog.Title>
                                </div>
                                <div className="mt-5">
                                    <p className='text-sm'>
                                        If you delete this portal, all users and linked data and prompts will be lost.
                                    </p>
                                </div>
                            </div>
                                
                        <div className="bg-white px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                                type="submit"
                                onClick={deleteSite}
                                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                            >
                            Delete
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
  )
}

export default function PortalCard({ portal })  {
    const [open, setOpen] = useState(false);

    return (
        <>
        <DeletePortalModal portal={portal} open={open} setOpen={setOpen}/>
        <div className="col-span-1 flex items-center justify-center border border-zinc-300 rounded-md hover:shadow-md h-40">
            <div className='grid grid-cols-12 w-full h-full'>
                <a href={`/portals/${portal._id}`} className="w-full h-full px-4 py-4 col-span-11">
                    <div className="text-zinc-950 text-4xl font-bold">{portal.name}</div>
                    <div className='mt-5'>
                        <div className="text-zinc-500 text-md">
                            <span className='font-bold text-zinc-800'>{portal.views} </span>views
                        </div>
                        <div className="text-zinc-500 text-md">
                            <span className='font-bold text-zinc-800'>{portal.customers} </span>submits
                        </div>
                    </div>
                </a>
                <Menu as="div" className="relative col-span-1 py-4">
                    <div>
                        <Menu.Button className="relative flex max-w-xs items-center rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 bg-white">
                            <path fillRule="evenodd" d="M11.828 2.25c-.916 0-1.699.663-1.85 1.567l-.091.549a.798.798 0 0 1-.517.608 7.45 7.45 0 0 0-.478.198.798.798 0 0 1-.796-.064l-.453-.324a1.875 1.875 0 0 0-2.416.2l-.243.243a1.875 1.875 0 0 0-.2 2.416l.324.453a.798.798 0 0 1 .064.796 7.448 7.448 0 0 0-.198.478.798.798 0 0 1-.608.517l-.55.092a1.875 1.875 0 0 0-1.566 1.849v.344c0 .916.663 1.699 1.567 1.85l.549.091c.281.047.508.25.608.517.06.162.127.321.198.478a.798.798 0 0 1-.064.796l-.324.453a1.875 1.875 0 0 0 .2 2.416l.243.243c.648.648 1.67.733 2.416.2l.453-.324a.798.798 0 0 1 .796-.064c.157.071.316.137.478.198.267.1.47.327.517.608l.092.55c.15.903.932 1.566 1.849 1.566h.344c.916 0 1.699-.663 1.85-1.567l.091-.549a.798.798 0 0 1 .517-.608 7.52 7.52 0 0 0 .478-.198.798.798 0 0 1 .796.064l.453.324a1.875 1.875 0 0 0 2.416-.2l.243-.243c.648-.648.733-1.67.2-2.416l-.324-.453a.798.798 0 0 1-.064-.796c.071-.157.137-.316.198-.478.1-.267.327-.47.608-.517l.55-.091a1.875 1.875 0 0 0 1.566-1.85v-.344c0-.916-.663-1.699-1.567-1.85l-.549-.091a.798.798 0 0 1-.608-.517 7.507 7.507 0 0 0-.198-.478.798.798 0 0 1 .064-.796l.324-.453a1.875 1.875 0 0 0-.2-2.416l-.243-.243a1.875 1.875 0 0 0-2.416-.2l-.453.324a.798.798 0 0 1-.796.064 7.462 7.462 0 0 0-.478-.198.798.798 0 0 1-.517-.608l-.091-.55a1.875 1.875 0 0 0-1.85-1.566h-.344ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" clipRule="evenodd" />
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
                                    href={`/portals/${portal._id}`}
                                    className={classNames(
                                        active ? 'bg-gray-100' : '',
                                        'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                    >
                                    Edit portal
                                    </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        onClick={(e) => setOpen(true)}
                                        className={classNames(
                                            active ? 'bg-gray-100' : '',
                                            'block px-4 py-2 text-sm text-gray-700'
                                        )}
                                    >
                                    Delete
                                    </a>
                                )}
                            </Menu.Item>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </div>
        </>
    )
}