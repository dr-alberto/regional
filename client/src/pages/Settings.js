import React, { useEffect, useState, useRef, Fragment } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import Navbar from '../components/Navbar';
import { Transition, Dialog } from '@headlessui/react';
import { classNames } from '../utils/utils';
import toast, { Toaster } from 'react-hot-toast';


export default function Settings() {
    
    const { user } = useAuthContext();
    
    const [ image, setImage ] = useState(null);
    const [ imageURL, setImageURL ] = useState(null);
    const [ name, setName ] = useState(null);
    const [organizationId, setOrganizationId] = useState(null)
    const [subdomain, setSubDomain] = useState(null)
    const [subdomainInput, setSubdomainInput] = useState(null)
    const [validSubdomain, setValidSubdomain] = useState(false)
    const [errors, setErrors] = useState({});
    const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null)
    const [loading, setLoading] = useState(true)
    const [startupPriceId, setStartupPriceId] = useState()
    const [expansionPriceId, setExpansionPriceId] = useState()
    const [growthPriceId, setGrowthPriceId] = useState()
    const [userPlan, setUserPlan] = useState()


    useEffect(() => {
        const fetchPricesIds = async () => {
            fetch('/config', {
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
            fetch('/subInfo', {
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

        const fetchOrganization = () => {
            fetch(`/organizations/`, {
                headers: {
                    "x-access-token": user.token
                },
            })
            .then(response => response.json())
            .then(data => {
                setSubDomain(data.subdomain)
                setSubdomainInput(data.subdomain)
                setValidSubdomain(data.validSubdomain)
                setName(data.name)
                setImageURL(data.logo ? `/static/${data.logo}` : 'empty.jpg')
                setImage(data.logo)
                setOrganizationId(data._id)
            })
            .catch(error => {})
            .finally(() => {
                setLoading(false)
            })
        }

        fetchOrganization()
        fetchUserPlan()
        fetchPricesIds()
    }, [])


    const isValidFileType = (file) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        return allowedTypes.includes(file.type);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };
      

    const handleImageChange = (e) => {
        e.preventDefault();

        const file = e.target.files[0];

        // console.log("SIZE: ", file.size)

        if (file && isValidFileType(file)) {
            setImageURL(URL.createObjectURL(file))
            setImage(file)
        }
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('name', name);
        formData.append('logo', image);
        
        // Create/Update organization url
        let url;
        if (organizationId) {
            url = `/organizations/${organizationId}`
        } else {
            url = '/organizations'
        }

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "x-access-token": user.token
            },
            body: formData
        })

        const data = await response.json()
        setOrganizationId(data._id)

        if (response.ok) {
            toast.success('Changes saved')
        } else {
            toast.error("Error saving changes, try again later.")
        }
    }

    const handleCustomDomainSubmit = async (e) => {
        e.preventDefault();
        
        setErrors({})
        setSubDomain(null)
        setValidSubdomain(false)

        const response = await fetch(`/organizations/${organizationId}/custom-domain`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-access-token": user.token
            },
            body: JSON.stringify({subdomain: subdomainInput})
        })

        const data = await response.json()

        if (response.status === 400) {
            data.errors.map((error) => { // For each field add the error msg to render
                setErrors({
                    ...errors,
                    [error.path]: error.msg
                })
            })
        } else {
            // Valid subdomain
            setSubDomain(data.subdomain)
        }
    }

    

    const ShareModal = () => {
        const [secondsLeft, setSecondsLeft] = useState(30);

        useEffect(() => {
            // Function to be executed every 15 seconds
            
            const yourFunction = () => {
                if (!validSubdomain) {
                    fetch(`/organizations/${organizationId}/custom-domain/verify`, {
                        method: 'POST',
                        headers: {
                            "x-access-token": user.token
                        },
                    })
                    .then(response => response.json())
                    .then(data => {
                        setValidSubdomain(data.validSubdomain)
                    })
                    .catch(error => {})
                }
            };
        
            // Call the function immediately and then set up the interval
            if (open) {
                yourFunction();
                const intervalId = setInterval(yourFunction, 30000);    
                // Clean up the interval when the component unmounts
                return () => clearInterval(intervalId);
            }
            
        }, []);
        
        useEffect(() => {
            if (open) {
                // Update the countdown every second
                const countdownId = setInterval(() => {
                    setSecondsLeft((prevSeconds) => (prevSeconds === 0 ? 30 : prevSeconds - 1));
                }, 1000);
            
                // Clear the countdown interval when the component unmounts
                return () => clearInterval(countdownId);
            }
        }, []);



        return (
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-20" initialFocus={cancelButtonRef} onClose={setOpen}>
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
                                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">Follow these instructions to add your domain</Dialog.Title>
                                    </div>
                                    <div className="mt-5">
                                        <div className="flex flex-col">
                                            <p className="block text-sm font-medium leading-6 text-gray-900">1. Sign in to your domain provider</p>
                                            <p className="block text-sm font-medium leading-6 text-gray-900">2. Go to your DNS settings</p>
                                            <p className="block text-sm font-medium leading-6 text-gray-900">3. Add the following records to your DNS settings:</p>

                                            <div className='grid grid-cols-2 mt-5'>
                                                <div className='text-base leading-6 text-gray-600'>Name</div>
                                                <div className='text-base font-medium leading-6 text-gray-900'>{subdomain.split('.')[0]}</div>
                                            </div>
                                            <div className='grid grid-cols-2 mt-5'>
                                                <div className='text-base leading-6 text-gray-600'>Type</div>
                                                <div className='text-base font-medium leading-6 text-gray-900'>CNAME</div>
                                            </div>
                                            <div className='grid grid-cols-2 mt-5'>
                                                <div className='text-base leading-6 text-gray-600'>Value</div>
                                                <div className='text-base font-medium leading-6 text-gray-900'>regionalhq.com</div>
                                            </div>
                                            <div className='grid grid-cols-2 mt-5'>
                                                <div className='text-base leading-6 text-gray-600'>TTL</div>
                                                <div className='text-base font-medium leading-6 text-gray-900'>300</div>
                                            </div>
                                        </div>
                                    </div>
                                    {!validSubdomain && (
                                        <p className='flex mt-5'>
                                            We'll check your records again: 
                                            {secondsLeft === 0 ? (
                                                <span className='ms-2 flex gap-x-1 items-center'>
                                                    <svg className='animate-spin h-4 w-4' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><style></style><path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"/><path d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z" className="spinner_5nOS"/></svg>
                                                    Verifying domain...   
                                                </span>
                                            ) : (
                                                <span>&nbsp; in {secondsLeft} second{secondsLeft !== 1 ? 's': null}</span>
                                            )}
                                        </p>
                                    )}
                                    {validSubdomain && (
                                        <div className='mt-2 flex gap-x-1 items items-center text-teal-600 font-semibold'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-teal-600">
                                                <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                                            </svg>

                                            Verified
                                        </div>
                                    )}
                                    {!validSubdomain && (
                                        <div className='mt-2 flex gap-x-2 items items-center text-red-600 font-semibold'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                                <path fillRule="evenodd" d="m5.965 4.904 9.131 9.131a6.5 6.5 0 0 0-9.131-9.131Zm8.07 10.192L4.904 5.965a6.5 6.5 0 0 0 9.131 9.131ZM4.343 4.343a8 8 0 1 1 11.314 11.314A8 8 0 0 1 4.343 4.343Z" clipRule="evenodd" />
                                            </svg>
                                            Not verified
                                        </div>
                                    )}
                                </div>
                                    
                            <div className="bg-white px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 mt-8">
                                <button
                                    type="button"
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                    onClick={(e) => setOpen(false)}
                                >
                                Close
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

    return !loading && (
        <>
        <Navbar name={'Settings'}/>
        <div><Toaster /></div>
        <header className="bg-white border-b border-zinc-100">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <h1 className="text-xl font-bold tracking-tight text-gray-900">Settings</h1>
            </div>
        </header>
        <main>
            {subdomain && <ShareModal></ShareModal>}
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

            {/* <form onSubmit={handleSubmit}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Organization</h2>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                            Name
                        </label>
                        <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input
                                type="text"
                                value={name}
                                onChange={handleNameChange}
                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            />
                            </div>
                        </div>
                        </div>

                        <div className="col-span-full">
                        <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                            Logo
                        </label>
                        <p className="text-gray-500 text-sm">Recommended size: 240x240 | JPG, PNG, GIF. Max size: 2MB</p>
                        <div className="mt-2 flex items-center gap-x-3">
                            
                            <img src={imageURL} alt="Current Image" className="h-20 w-20 rounded ring-gray-300 shadow-md" />
                            <input
                            type="file"
                            id="imageInput"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                            />
                            <label
                            htmlFor="imageInput"
                            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                            Change
                            </label>
                        </div>
                        </div>

                    </div>
                    </div>

                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                    Save
                    </button>
                </div>
            </form> */}


            <form onSubmit={handleCustomDomainSubmit}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Custom domain</h2>

                        {userPlan === growthPriceId && (
                        <>
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-12 sm:max-w-md">
                                    <div className="flex justify-between items-center">
                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                            Domain
                                        </label>
                                        {subdomain && (
                                            <div className="text-sm text-gray-500">
                                                {validSubdomain && (
                                                    <div className='flex gap-x-1 items items-end text-teal-600 font-semibold'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-teal-600">
                                                            <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                                                        </svg>

                                                        Verified
                                                    </div>
                                                )}
                                                {!validSubdomain && (
                                                    <div className='flex gap-x-2 items items-end text-red-600 font-semibold'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                                            <path fillRule="evenodd" d="m5.965 4.904 9.131 9.131a6.5 6.5 0 0 0-9.131-9.131Zm8.07 10.192L4.904 5.965a6.5 6.5 0 0 0 9.131 9.131ZM4.343 4.343a8 8 0 1 1 11.314 11.314A8 8 0 0 1 4.343 4.343Z" clipRule="evenodd" />
                                                        </svg>
                                                        Not verified
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mt-2">
                                        <div className="flex justify-between gap-x-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                            <input
                                                type="text"
                                                value={subdomainInput}
                                                onChange={(e) => setSubdomainInput(e.target.value)}
                                                placeholder='portal.example.com'
                                                // className="border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                className={classNames(
                                                    errors.name ? 'ring-red-300' : ' ',
                                                    'block w-full text-gray-900 ring-gray-300 focus:ring-indigo-600 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6'
                                                )}
                                            />
                                        </div>
                                        {errors.subdomain && <p className='mt-1 text-red-600 text-sm'>{errors.subdomain}</p>}

                                        {subdomain && (
                                            <>
                                            {!validSubdomain && (
                                                <button
                                                    onClick={(e) => setOpen(true)}
                                                    className="mt-3 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                    >
                                                    Verify domain
                                                </button>
                                            )}
                                            </>
                                        )}
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button
                                type="submit"
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                Update
                                </button>
                            </div>
                        </>
                        )}

                        {userPlan !== growthPriceId && (
                            <p className='mt-2'>
                                This is a feature of the growth plan. 
                                <a href="/billing" className='font-bold text-teal-600 flex gap-x-1 items-center w-fit hover:text-teal-500'>
                                    Update your plan
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                    </svg>
                                </a>
                            </p>
                        )}
                    </div>

                </div>
            </form>

            
            </div>
          </main>
        
          
        </>

        
    )

}
