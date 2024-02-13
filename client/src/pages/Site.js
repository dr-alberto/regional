import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import Navbar from '../components/Navbar';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useRef } from 'react'
import { useNavigate } from 'react-router';
import WorldMap from '../components/WorldMap';
import { useParams } from 'react-router-dom';
import { classNames } from '../utils/utils';
import { PromptGrid } from '../components/PromptGrid';
import { TextLinkLeft } from '../components/TextLinkLeft'
import PortalCard from '../components/PortalCard';



const AnalyticsCard = ({ number, description }) => {
    return (
        <div className="rounded-lg shadow p-8 border border-slate-200 bg-white">
            <div className="text-3xl font-bold text-zinc-950 mb-2">{number}</div>
            <div className="text-gray-600 mb-2">{description}</div>
        </div>
    );
};
  
// Example usage in a parent React component
const AnalyticsGrid = ({ data }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-8">
            <AnalyticsCard number={data.views} description="Total views"/>
            <AnalyticsCard number={data.users} description="Total users"/>
            <AnalyticsCard number={`${data.conversionRate}%`} description="Conversion rate"/>
        </div>
    );
};

const loadingSkeleton = Array.from({ length: 3 }, (_, index) => (
    <div key={index} className="col-span-1">
        <div className="bg-gray-200 rounded-md p-6 h-40 animate-pulse"></div>
    </div>
));

const PortalsGrid = ({ portals, updatePortals }) => {
    const { siteId } = useParams();
    const { user } = useAuthContext();
    // const [portals, setPortals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState({})
    const [open, setOpen] = useState(false) // Create form modal state
    const [name, setName] = useState(undefined)
    const navigate = useNavigate();
    const [startupPriceId, setStartupPriceId] = useState()
    const [expansionPriceId, setExpansionPriceId] = useState()
    const [growthPriceId, setGrowthPriceId] = useState()
    const [userPlan, setUserPlan] = useState()

    useEffect(() => {
        const fetchPortals = async () => {
            try {
                const response = await fetch(`/api/portals?siteId=${siteId}`, {
                    headers: {
                        "x-access-token": user.token,
                    },
                });
                
                if (response.ok) {
                    const result = await response.json();
                    updatePortals(result);
                }

            } catch (error) {
                console.log(error)
            }
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
                await fetchPortals();
                await fetchPricesIds();
                await fetchUserPlan();    
            } finally {
                setIsLoading(false)
            }
        }
        
        fetchData();

    }, [])

    const handlePortalCreation = async () => {
        setOpen(true)
        setErrors({})
    }

    async function createPortal(e) {
        e.preventDefault()
        setErrors({}) // Reset errors
        
        try {
            const response = await fetch('/api/portals', {
                method: 'POST',
                headers: {
                    "x-access-token": user.token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name, siteId})
            });
    
            const result = await response.json();
      
            if (response.ok) {
                // navigate to edit form page
                navigate(`/portals/${result._id}`);
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

    const CreatePortalModal = () => {
        function closePortalCreationModal(e) {
            setOpen(false);
            setName("");
        }

        return (
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-20" initialFocus={cancelButtonRef} onClose={closePortalCreationModal}>
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
                                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">Create a new user portal</Dialog.Title>
                                    </div>
                                    <div className="mt-5">
                                        <form id="form-name" onSubmit={createPortal}>
                                            <div className="flex flex-col">
                                                <div className="flex justify-between items-center">
                                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                                                    <div className="text-sm text-gray-500">Won't be visible for users</div>
                                                </div>

                                                <div className="mt-2">
                                                    <input
                                                    name="name"
                                                    type="text"
                                                    autoComplete='off'
                                                    onChange={(e) => setName(e.target.value)}
                                                    value={name}
                                                    required
                                                    placeholder='Product A'
                                                    className={classNames(
                                                        errors.name ? 'ring-2 ring-red-300' : ' ',
                                                        'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6'

                                                    )}
                                                    />
                                                    {errors.name && <p className='mt-1 text-red-600 text-sm'>{errors.name}</p>}
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
      )
    }

    if (isLoading || startupPriceId === undefined || expansionPriceId === undefined || growthPriceId === undefined || userPlan === undefined) {
        return (
            <>
                <h1 className="text-4xl font-bold mt-8 mb-4">Portals</h1>
                <hr></hr>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 py-8">
                    {loadingSkeleton}
                </div>
            </>
        )
    }

    return (
        <div>
            <CreatePortalModal/>
            <h1 className="text-4xl font-bold mt-8 mb-4">Portals</h1>
            <hr></hr>
                
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 py-8">

                {/* User has no plan */}
                {[startupPriceId, expansionPriceId, growthPriceId].indexOf(userPlan) === -1 && (
                    <div className='mt-2'>
                        You need to select a plan to create and manage user portals. 
                        <a href="/billing" className='font-bold text-teal-600 flex gap-x-1 items-center w-fit hover:text-teal-500'>
                            Select a plan
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                        </a>
                    </div>
                )}

                {/* User has startup plan */}
                {(userPlan === startupPriceId) && (portals.length === 0) && (
                    <div className="col-span-1 flex items-center justify-center border border-dashed border-zinc-300 rounded-md hover:shadow-md h-40">
                        <div className="flex items-center justify-center w-full h-full">
                            <button onClick={handlePortalCreation} className="flex flex-col items-center justify-center w-full h-full">
                                {/* <span className="text-4xl">+</span> */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mb-2">
                                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
                                </svg>

                                <span className="text-zinc-950 text-xl font-medium">Create new</span>
                            </button>
                        </div>
                    </div>
                )}

                
                {(userPlan === startupPriceId) && (portals.length !== 0) && (
                    <div className='mt-2'>
                        You need to upgrate your plan to create more user portals. 
                        <a href="/billing" className='font-bold text-teal-600 flex gap-x-1 items-center w-fit hover:text-teal-500'>
                            Upgrade your plan
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                        </a>
                    </div>
                )}

                {/* User has growth plan */}
                {(userPlan === expansionPriceId) && (portals.length >= 10) && (
                    <div className='mt-2'>
                        You need to upgrate your plan to create more user portals. 
                        <a href="/billing" className='font-bold text-teal-600 flex gap-x-1 items-center w-fit hover:text-teal-500'>
                            Upgrade your plan
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                        </a>
                    </div>
                )}

                {/* User has expansion plan and less than 10 portals */}
                {(userPlan === expansionPriceId) && (portals.length < 10) && (
                    <div className="col-span-1 flex items-center justify-center border border-dashed border-zinc-300 rounded-md hover:shadow-md h-40">
                        <div className="flex items-center justify-center w-full h-full">
                            <button onClick={handlePortalCreation} className="flex flex-col items-center justify-center w-full h-full">
                                {/* <span className="text-4xl">+</span> */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mb-2">
                                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
                                </svg>

                                <span className="text-zinc-950 text-xl font-medium">Create new</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* User has growth plan */}
                {userPlan === growthPriceId && (
                    <div className="col-span-1 flex items-center justify-center border border-dashed border-zinc-300 rounded-md hover:shadow-md h-40">
                        <div className="flex items-center justify-center w-full h-full">
                            <button onClick={handlePortalCreation} className="flex flex-col items-center justify-center w-full h-full">
                                {/* <span className="text-4xl">+</span> */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mb-2">
                                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
                                </svg>

                                <span className="text-zinc-950 text-xl font-medium">Create new</span>
                            </button>
                        </div>
                    </div>
                )}

                {portals.map((portal, index) => (
                    <PortalCard key={index} portal={portal}></PortalCard>
                ))}
            </div>



        </div>
    )
}

  
export default function Site() {
    const { siteId } = useParams(); 
    const { user } = useAuthContext();
    const [portals, setPortals] = useState([])
    const [domain, setDomain] = useState(null)
    const [loading, setLoading] = useState(true)
    const [analytics, setAnalytics] = useState({
        views: 0,
        users: 0,
        conversionRate: 0
    })
    const [countriesData, setCountriesData] = useState({})

    useEffect(() => {
        fetch(`/api/portals/overview?siteId=${siteId}`, {
            headers: {
                "x-access-token": user.token,
            },
        })
        .then(response => response.json())
        .then(data => {
            setAnalytics({
                views: data.views,
                users: data.submits,
                conversionRate: data.conversionRate
            })
            setDomain(data.site.domain)
            setCountriesData(data.countriesCount)
        })
        .finally(() => {
            setLoading(false)
        })
    }, [])

    const updatePortals = (portals) => {
        setPortals(portals)
    }

    return !loading && (    
        <>
        <Navbar name={'Dashboard'}/>
        <header className="bg-white border-b border-zinc-100">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <h1 className="text-xl font-bold tracking-tight text-gray-900">Dashboard</h1>
                <div>
                    <span className='font-semibold'>Site: </span>
                    <span>{domain}</span>
                </div>
                <TextLinkLeft text={'Return to dashboard'} url={'/dashboard'}/>
            </div>
          </header>
          <main>
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <WorldMap data={countriesData}></WorldMap>
                <AnalyticsGrid data={analytics}/>
                <PortalsGrid portals={portals} updatePortals={updatePortals}/>
                <PromptGrid portals={portals} updatePortals={updatePortals}/>
            </div>
          </main>
        </>
    )
}
