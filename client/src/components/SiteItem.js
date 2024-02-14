import { Menu, Transition, Dialog } from '@headlessui/react';
import { classNames } from '../utils/utils';
import { useEffect, useRef, Fragment, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import SetCustomDomain from './SetCustomDomain';


const DeleteSiteModal = ({ site, open, setOpen }) => {
    const cancelButtonRef = useRef(null);
    const { user } = useAuthContext();

    async function deleteSite(e) {
        try {
            const response = await fetch(`/api/sites/${site._id}`, {
                method: 'DELETE',
                headers: {
                    "x-access-token": user.token
                },
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
                                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">Delete site</Dialog.Title>
                                </div>
                                <div className="mt-5">
                                    <p className='text-sm'>
                                        If you delete this site, you will delete {site.portals} portal{site.portals !== 1 ? 's' : null} and {site.prompts} prompt{site.prompts !== 1 ? 's' : null}.
                                        All data will be lost.
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


const EditSiteModal = ({ site, open, setOpen, userPlan, startupPriceId, expansionPriceId, growthPriceId }) => {
    const cancelButtonRef = useRef(null);
    const { user } = useAuthContext();
    const [domain, setDomain] = useState(null);
    const [errors, setErrors] = useState({})


    useEffect(() => {
        setDomain(site.domain)
    }, [])


    async function editSite(e) {
        e.preventDefault();
        setErrors({})

        try {
            const response = await fetch(`/api/sites/${site._id}`, {
                method: 'POST',
                headers: {
                    "x-access-token": user.token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({domain})
            });

            if (response.ok) {
                window.location.reload();

            } else if (response.status ===  400) {
                const result = await response.json();

                result.errors.map((error) => { // For each field add the error msg to render
                    setErrors({
                        ...errors,
                        [error.path]: error.msg
                    })
                })
            }

        } catch (error) {}
    }

    function closeEditeSiteModal(e) {
        setOpen(false);
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-20" initialFocus={cancelButtonRef} onClose={closeEditeSiteModal}>
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
                                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">Site settings</Dialog.Title>
                                </div>
                                <div className="mt-5">
                                    <form id="form-name" onSubmit={editSite}>
                                        
                                        <div className="flex flex-col">
                                            <div className="flex justify-between items-center">
                                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Site</label>
                                            </div>

                                            <div className="mt-2">
                                                <input
                                                type="text"
                                                autoComplete='off'
                                                onChange={(e) => setDomain(e.target.value)}
                                                value={domain}
                                                required
                                                placeholder='example.com'
                                                className={classNames(
                                                    errors.domain ? 'ring-2 ring-red-300' : ' ',
                                                    'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6'

                                                )}
                                                />
                                                {errors.domain && <p className='mt-1 text-red-600 text-sm'>{errors.domain}</p>}
                                            </div>
                                        </div>
                                    </form>
                                    <div className="mt-4 sm:flex sm:flex-row-reverse">
                                        <button
                                            type="submit"
                                            form='form-name'
                                            className="inline-flex w-full justify-center rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 sm:ml-3 sm:w-auto"
                                        >
                                        Update
                                        </button>
                                    </div>
                                    <hr className='my-4'/>
                                    

                                    <SetCustomDomain 
                                        site={site} 
                                        userPlan={userPlan}
                                        startupPriceId={startupPriceId}
                                        expansionPriceId={expansionPriceId}
                                        growthPriceId={growthPriceId}
                                    ></SetCustomDomain>

                                </div>
                            </div>
                                
                            <div className="bg-white px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                    type="button"
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                    onClick={closeEditeSiteModal}
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


export default function SiteItem({ site, userPlan, startupPriceId, expansionPriceId, growthPriceId }) {
    const [openDelete, setOpenDelete] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    return (
        <>
            <DeleteSiteModal site={site} open={openDelete} setOpen={setOpenDelete}/>
            <EditSiteModal 
                site={site} 
                open={openEdit} 
                setOpen={setOpenEdit} 
                userPlan={userPlan}
                startupPriceId={startupPriceId}
                expansionPriceId={expansionPriceId}
                growthPriceId={growthPriceId}
            />
            <div className="col-span-1 flex items-center justify-center rounded-lg shadow border border-slate-200 bg-white hover:shadow-md h-40">
                <div className='grid grid-cols-12 w-full h-full'>
                    <a href={`/sites/${site._id}`} className="w-full h-full px-4 py-4 col-span-11">
                        <div className="text-zinc-950 text-2xl font-bold">{site.domain}</div>
                        
                        <div className='mt-5'>
                            <div className="text-zinc-500 text-md">
                                <span className='font-bold text-zinc-800'>{site.portals} </span>portal{site.portals !== 1 ? 's' : null}
                            </div>
                            <div className="text-zinc-500 text-md">
                                <span className='font-bold text-zinc-800'>{site.prompts} </span>prompt{site.prompts !== 1 ? 's' : null}
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
                                <Menu.Item key={site.name}>
                                    {({ active }) => (
                                        <a
                                        onClick={(e) => setOpenEdit(true)}
                                        className={classNames(
                                            active ? 'bg-gray-100' : '',
                                            'block px-4 py-2 text-sm text-gray-700'
                                        )}
                                        >
                                        Settings
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item key={site.name}>
                                    {({ active }) => (
                                        <a
                                            onClick={(e) => setOpenDelete(true)}
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