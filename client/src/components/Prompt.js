import React, { useState, useEffect, Fragment, useRef } from "react"
import { Dialog, Listbox, Transition } from "@headlessui/react"
import { classNames } from "../utils/utils"
import { COUNTRIES, ENDPOINT, LOCAL_STORAGE_KEY, LOCAL_STORAGE_VALUE } from "../utils/promptConstants"

// import { FixedSizeList } from 'react-window';


// const Menu = React.forwardRef(({ children, ...props }, ref) => {
    
//     return (
//         <FixedSizeList
//             height={150} // adjust based on your need
//             itemCount={children.length}
//             itemSize={35} // adjust based on your need
//             width={300} // adjust based on your need
//             {...props}
//             ref={ref}
//         >
//             {({ index, style }) => (
//                 <div style={style}>
//                     {/* {COUNTRIES[index].name} */}
//                     {/* {children[index]} */}

//                     {index}
//                 </div>
//             )}
//         </FixedSizeList>
//     )
// });



export default function Prompt() {
    const [selected, setSelected] = useState(null)
    const [selectedIsAvailable, setSelectedIsAvailable] = useState(false)
    const [open, setOpen] = useState(true)
    const [promptData, setPromptData] = useState({});
    const [loading, setLoading] = useState(true);
    const [portalData, setPortalData] = useState({});
    const [siteData, setSiteData] = useState({});
    const [watermark, setWatermark] = useState(true);

    useEffect(() => {
        
        const fetchPrompt = async () => {
            const response = await fetch(`${ENDPOINT}/api/prompts/${promptId}?mode=live`);

            const result = await response.json();

            setPromptData({
                name: result.prompt.name,
                font: result.prompt.font,
                style: result.prompt.style,
                color: result.prompt.color,
                showOnlyToNonAvailableRegions: result.prompt.showOnlyToNonAvailableRegions
            })
            
            setPortalData({
                id: result.portal.id,
                productName: result.portal.productName,
                brandName: result.portal.brandName,
                published: result.portal.published,
                availableRegions: result.portal.availableRegions
            })

            setSiteData({
                subdomain: result.site.subdomain,
                validSubdomain: result.site.validSubdomain
            })
            
            setWatermark(result.useWatermark)

            return result.portal.availableRegions, result.prompt.showOnlyToNonAvailableRegions
        }

        const fetchUserCountry = (availableRegions, showOnlyToNonAvailableRegions) => {
            fetch('http://ip-api.com/json/')
            .then(response => response.json())
            .then(data => {
                const countryCode = data.countryCode
                const country = COUNTRIES.find((country) => country.alpha2 === countryCode)

                if (country) {
                    if (availableRegions.includes(country.id) && showOnlyToNonAvailableRegions) {
                        setOpen(false)
                    } else {
                        setSelected(country)
                        setSelectedIsAvailable(availableRegions.includes(country.id))
                    }
                }
            })
            .catch(error => {});
        }

        const fetchPrevKey = () => {
            const submitValue = localStorage.getItem(LOCAL_STORAGE_KEY)
            
            if (submitValue === LOCAL_STORAGE_VALUE) {
                setOpen(false)
            }
        }

        const fetchData = async () => {
            const { availableRegions, showOnlyToNonAvailableRegions } = await fetchPrompt()
            fetchPrevKey();
            fetchUserCountry(availableRegions, showOnlyToNonAvailableRegions);

            setLoading(false);
        }

        const scriptTag = document.querySelector('script[data-widget="regionalhq-prompt"]');
        const promptId = scriptTag ? scriptTag.getAttribute('id') : null;

        if (promptId) {
            fetchData();
        }
    }, []);

    const handleSelectCountry = (country) => {
        setSelected(country)
        setSelectedIsAvailable(portalData.availableRegions.includes(country.id))
    }

    const cancelModal = (e) => {
        setOpen(false)
        localStorage.setItem(LOCAL_STORAGE_KEY, LOCAL_STORAGE_VALUE)
    }

    const openPortal = (e) => {
        cancelModal(e);

        let portalUrl;
        
        if (portalData.published === 'standard') {
            portalUrl = ENDPOINT + `/live/${portalData.id}` + `?cc=${selected.id}`

        } else if (portalData.published === 'custom') {
            if (siteData.subdomain && siteData.validSubdomain) { // Unnecesary check but to make sure
                portalUrl = 'https://' + siteData.subdomain + `/live/${portalData.id}` + `?cc=${selected.id}`
            } else {
                return
            }

        } else {
            return
        }

        window.open(portalUrl, '_blank').focus();
    }

    const cancelButtonRef = useRef(null)
    
    return !loading && (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={cancelModal}>
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
                    <div className="flex min-h-full h-50 items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <Dialog.Panel 
                            style={{fontFamily: `${promptData.font}, system-ui, sans-serif`}}
                            className={
                                classNames(
                                    promptData.style === 'Pill' ? 'rounded-lg' : null,
                                    promptData.style === 'Rounded' ? 'rounded-md' : null,
                                    "relative flex flex-col justify-between transform overflow-hidden h-96 bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
                                )}
                            >
                            
                            <div className='px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                    <Dialog.Title as="h3" className="text-xl font-semibold leading-6 text-gray-900">Check if {portalData.brandName} is available in your region</Dialog.Title>
                                </div>
                                <div className="mt-5">
                                    <form id="form-name">
                                        <div className="flex flex-col">
                                            <div className="mt-2">
                                                <div className="">
                                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                                        Select your country
                                                    </label>
                                                    <div 
                                                        className={classNames(
                                                            promptData.style === 'Pill' ? 'rounded-lg' : null,
                                                            promptData.style === 'Rounded' ? 'rounded-md' : null,
                                                            "flex flex-col divide-y ring-1 ring-offset-0 ring-gray-300 mt-2"
                                                        )}
                                                    >
                                                        <div>
                                                            <Listbox value={selected} onChange={handleSelectCountry}>
                                                            {({ open }) => (
                                                                <div className='relative'>
                                                                <Listbox.Button 
                                                                    className={
                                                                        classNames(
                                                                        promptData.style === 'Pill' ? 'rounded-lg' : null,
                                                                        promptData.style === 'Rounded' ? 'rounded-md' : null,
                                                                        "relative w-full cursor-default bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm focus:outline-none sm:text-sm sm:leading-6"
                                                                    )}
                                                                    >
                                                                    <span className="flex items-center">
                                                                        <span className="block truncate">{selected ? selected.name : 'Select'}</span>
                                                                    </span>
                                                                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-gray-400" aria-hidden="true">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
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
                                                                            classNames(
                                                                                promptData.style === 'Pill' ? 'rounded-lg' : null,
                                                                                promptData.style === 'Rounded' ? 'rounded-md' : null,
                                                                                "absolute z-10 mt-1 max-h-48 w-full overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                                                                        )}
                                                                    
                                                                    >
                                                                    {COUNTRIES.map((option) => (
                                                                        <Listbox.Option
                                                                        key={option.id}
                                                                        className={({ active }) =>
                                                                            classNames(
                                                                            active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                                            'relative cursor-default select-none py-2 pl-3 pr-9'
                                                                            )
                                                                        }
                                                                        value={option}
                                                                        >
                                                                        {({ selected, active }) => (
                                                                            <>
                                                                            <div className="flex items-center">
                                                                                <span
                                                                                className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                                                >
                                                                                {option.name}
                                                                                </span>
                                                                            </div>
                                                    
                                                                            {selected ? (
                                                                                <span
                                                                                className={classNames(
                                                                                    active ? 'text-white' : 'text-indigo-600',
                                                                                    'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                                )}
                                                                                >
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5" aria-hidden="true">
                                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
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
                                                        {selected && !selectedIsAvailable && (
                                                            <div className="flex gap-x-1 items-center text-sm">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3.5} stroke="currentColor" className="w-4 h-4 text-red-600">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                                </svg>
                                                                {portalData.brandName} isn't yet available in your region
                                                            </div>
                                                        )}

                                                        {selected && selectedIsAvailable && (
                                                            <div className="flex gap-x-1 items-center text-sm">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3.5} stroke="currentColor" className="w-4 h-4 text-teal-600">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                                </svg>
                                                                {portalData.brandName} is available in your region
                                                            </div>
                                                        )}
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </form>


                                </div>
                            </div>
                                
                            <div className="bg-white p-4 flex sm:flex-row flex-col justify-between items-center">
                                {watermark && (
                                    <a href={ENDPOINT} style={{ fontFamily: 'system-ui, sans-serif' }} target='_blank' className="text-sm flex gap-x-2 items-center mb-4 sm:mb-0">
                                        Powered by 
                                        <img className="h-7 w-auto grayscale" src={`${ENDPOINT}/logo.svg`} alt=""/>
                                    </a>
                                )}
                                <div className="sm:flex sm:flex-row-reverse w-full sm:w-auto">
                                    {selected && !selectedIsAvailable && (
                                        <button
                                            type="button"
                                            onClick={openPortal}
                                            style={{ backgroundColor: promptData.color }}
                                            className={
                                                classNames(
                                                    promptData.style === 'Pill' ? 'rounded-lg' : null,
                                                    promptData.style === 'Rounded' ? 'rounded-md' : null,
                                                    `inline-flex w-full justify-center px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-75 sm:ml-3 sm:w-auto`
                                                )
                                            }
                                        >
                                        Get notified when it's available
                                        </button>
                                    )}
                                    {selected && selectedIsAvailable && (
                                        <button
                                            type="button"
                                            onClick={cancelModal}
                                            style={{ backgroundColor: promptData.color }}
                                            className={
                                                classNames(
                                                    promptData.style === 'Pill' ? 'rounded-lg' : null,
                                                    promptData.style === 'Rounded' ? 'rounded-md' : null,
                                                    "inline-flex w-full justify-center px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-75 sm:ml-3 sm:w-auto"
                                            )}
                                        >
                                        Continue to site
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        className={
                                            classNames(
                                                promptData.style === 'Pill' ? 'rounded-lg' : null,
                                                promptData.style === 'Rounded' ? 'rounded-md' : null,
                                                "mt-3 inline-flex w-full justify-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            )}
                                        onClick={cancelModal}
                                    >
                                    Close
                                    </button>
                                </div>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
