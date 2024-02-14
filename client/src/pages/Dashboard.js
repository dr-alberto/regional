import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import Navbar from '../components/Navbar';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useRef } from 'react'
import { useNavigate } from 'react-router';
import SiteItem from '../components/SiteItem';
import { classNames } from '../utils/utils';
import { TextLink } from '../components/TextLink';

const loadingSkeleton = Array.from({ length: 6 }, (_, index) => (
    <div key={index} className="col-span-1">
        <div className="bg-zinc-200 rounded-md p-6 h-40 animate-pulse"></div>
    </div>
));




const SitesGrid = () => {
    const { user } = useAuthContext();
    const [sites, setSites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [open, setOpen] = useState(false) // Create form modal state
    const [errors, setErrors] = useState({})
    const [domain, setDomain] = useState(undefined)
    const navigate = useNavigate();
    const [startupPriceId, setStartupPriceId] = useState()
    const [expansionPriceId, setExpansionPriceId] = useState()
    const [growthPriceId, setGrowthPriceId] = useState()
    const [userPlan, setUserPlan] = useState()

    useEffect(() => {
        const fetchSites = async () => {
            try {
                const response = await fetch('/api/sites', {
                    headers: {
                        "x-access-token": user.token
                    },
                });

                if (response.ok) {
                    const result = await response.json();
                    
                    setSites(result);
                }

            } catch (error) {}
        };

        const fetchPricesIds = async () => {
            fetch('/api/config', {
                headers: {
                    "x-access-token": user.token,
                },
            })
            .then(response => response.json())
            .then(data => {
                setStartupPriceId(data.priceStarter)
                setExpansionPriceId(data.priceExpansion)
                setGrowthPriceId(data.priceGrowth)
            })
            .catch(error => {})
        }
    
        const fetchUserPlan = async () => {
            fetch('/api/subInfo', {
                headers: {
                    "x-access-token": user.token,
                },
            })
            .then(response => response.json())
            .then(data => {
                setUserPlan(data.plan)
            })
            .catch(error => {})
            
        }

        const fetchData = async () => {
            try {
                await fetchSites();
                await fetchPricesIds();
                await fetchUserPlan();    
            } finally {
                setIsLoading(false)
            }
            
        }
        
        fetchData()
        

    }, [])

    const handleSiteCreation = async () => {
        setOpen(true)
    }

    async function createSite(e) {
        e.preventDefault()
        setErrors({}) // Reset errors

        try {
            const response = await fetch('/api/sites', {
                method: 'POST',
                headers: {
                    "x-access-token": user.token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({domain})
            });
    
            const result = await response.json();
            
            if (response.ok) {
                // navigate to edit form page
                navigate(`/sites/${result._id}`);
            } else if (response.status ===  400) {
                result.errors.map((error) => { // For each field add the error msg to render
                    setErrors({
                        ...errors,
                        [error.path]: error.msg
                    })
                })
            }
    
        } catch (error) {}
    }

    const cancelButtonRef = useRef(null)

    const CreateSiteModal = () => {
        function closeCreateSiteModal(e) {
            setOpen(false);
            setDomain("");
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
                                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">Add a new site</Dialog.Title>
                                    </div>
                                    <div className="mt-5">
                                        <form id="form-name" onSubmit={createSite}>
                                            <div className="flex flex-col">
                                                <div className="flex justify-between items-center">
                                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Domain</label>
                                                    {/* <div className="text-sm text-gray-500">Won't be visible for users</div> */}
                                                </div>

                                                <div className="mt-2">
                                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">https://</span>
                                                    <input
                                                        type="text"
                                                        autoComplete='off'
                                                        onChange={(e) => setDomain(e.target.value)}
                                                        value={domain}
                                                        required
                                                        placeholder='example.com'
                                                        className={classNames(
                                                            errors.domain ? 'ring-2 ring-red-300' : ' ',
                                                            'block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                                                        )}
                                                    />
                                                    </div>
                                                    
                                                    {errors.domain && <p className='mt-1 text-red-600 text-sm'>{errors.domain}</p>}
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
      )
    }
    
    if (isLoading || startupPriceId === undefined || expansionPriceId === undefined || growthPriceId === undefined || userPlan === undefined) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 py-8">
                {loadingSkeleton}
            </div>
        )
    }

    return (
        <div>
            <CreateSiteModal/>     
                
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 py-8">

                {/* User has no plan */}
                {[startupPriceId, expansionPriceId, growthPriceId].indexOf(userPlan) === -1 && (
                    <div className='col-span-1 flex flex-col gap-y-1 bg-slate-50 items-center justify-center border border-dashed border-zinc-300 rounded-md hover:shadow-md h-40'>
                        You need to select a plan to get started
                        <TextLink text={"Select a plan"} url={"/billing"}/>
                    </div>
                )}

                {/* Startup plan => 1 site */}
                {(userPlan === startupPriceId) && (sites.length !== 0) && (
                    <div className='col-span-1 flex flex-col bg-slate-50 items-center justify-center border border-dashed border-zinc-300 rounded-md hover:shadow-md h-40'>
                        You need to upgrade your plan to add more sites
                        <TextLink text={"Upgrade plan"} url={"/billing"}/>
                    </div>
                )}

                {/* User has startup plan and 0 sites */}
                {(userPlan === startupPriceId) && (sites.length === 0) && (
                    <div className="col-span-1 flex items-center justify-center border border-dashed border-zinc-300 rounded-md hover:shadow-md h-40">
                        <div className="flex items-center justify-center w-full h-full">
                            <button onClick={handleSiteCreation} className="flex flex-col items-center justify-center w-full h-full">
                                {/* <span className="text-4xl">+</span> */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mb-2">
                                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
                                </svg>

                                <span className="text-zinc-950 text-xl font-medium">Add new site</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* User has expansion plan and 10 sites */}
                {(userPlan === expansionPriceId) && (sites.length >= 10) && (
                    <div className='col-span-1 flex flex-col bg-slate-50 items-center justify-center border border-dashed border-zinc-300 rounded-md hover:shadow-md h-40'>
                        You need to upgrade your plan to add more sites
                        <TextLink text={"Upgrade plan"} url={"/billing"}/>
                    </div>
                )}

                {/* User has expansion plan and 10 sites */}
                {(userPlan === expansionPriceId) && (sites.length < 10) && (
                    <div className="col-span-1 flex items-center justify-center border border-dashed border-zinc-300 rounded-md hover:shadow-md h-40">
                        <div className="flex items-center justify-center w-full h-full">
                            <button onClick={handleSiteCreation} className="flex flex-col items-center justify-center w-full h-full">
                                {/* <span className="text-4xl">+</span> */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mb-2">
                                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
                                </svg>

                                <span className="text-zinc-950 text-xl font-medium">Add new site</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* User has growth plan */}
                {(userPlan === growthPriceId) && (
                    <div className="col-span-1 flex items-center justify-center border border-dashed border-zinc-300 rounded-md hover:shadow-md h-40">
                        <div className="flex items-center justify-center w-full h-full">
                            <button onClick={handleSiteCreation} className="flex flex-col items-center justify-center w-full h-full">
                                {/* <span className="text-4xl">+</span> */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mb-2">
                                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
                                </svg>

                                <span className="text-zinc-950 text-xl font-medium">Add new site</span>
                            </button>
                        </div>
                    </div>
                )}
                
                {sites.map((item, index) => (
                        <SiteItem 
                        site={item} 
                        userPlan={userPlan}
                        startupPriceId={startupPriceId}
                        expansionPriceId={expansionPriceId}
                        growthPriceId={growthPriceId}
                        ></SiteItem>
                    )
                )}
            </div>
        </div>
    )
}

  
export default function Dashboard() {
    return (    
        <>
            <Navbar name={'Dashboard'}/>
            <header className="bg-white border-b border-zinc-100">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-xl font-bold tracking-tight text-gray-900">Dashboard</h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <SitesGrid/>
                </div>
            </main>
        </>
    )
}
