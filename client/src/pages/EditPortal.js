import Navbar from '../components/Navbar';
import React, { useState, useEffect, Fragment, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import toast, { Toaster } from 'react-hot-toast';
import { ENDPOINT } from '../utils/constants';
import { Tab, Dialog, Transition, RadioGroup } from '@headlessui/react'
import { SketchPicker } from 'react-color';
import { COUNTRIES, FONTS, STYLES } from '../utils/constants';
import { AvailabilityOptions } from '../components/AvailabilityOptions';
import Select from '../components/Select';
import { classNames } from '../utils/utils';
import { Tooltip } from 'react-tooltip'
import { TextLinkLeft } from '../components/TextLinkLeft'
import '../assets/iframe.css'



export const EditPortal = () => {
    const [portalData, setPortalData] = useState({})
    const [productImageURL, setProductImageURL] = useState(null); // Load product image preview 
    const [brandImageURL, setBrandImageURL] = useState(null); // Load product image preview 
    const [errors, setErrors] = useState({});
    const [customDomain, setCustomDomain] = useState(null);
    const [domainVerified, setDomainVerified] = useState(null);
    const [siteId, setSiteId] = useState(null);
    const [showPicker, setShowPicker] = useState(false);
    const [isModified, setIsModified] = useState(false);
    const [loading, setIsLoading] = useState(true);
    const [previewKey, setPreviewKey] = useState(0); // Used to force reload of iframe element
    const [published, setPublished] = useState(null);
    const [publishedActive, setPublishedActive] = useState(null);

    // Show color picker
    function toggleColorPicker(e) {
        setShowPicker(!showPicker);
    }

    const { id } = useParams();
    const { user } = useAuthContext();

    useEffect(() => {
        // document.title = "Form edit"
        const fetchForm = async () => {
            try {
                const response = await fetch(`/api/portals/${id}`, {
                    headers: {
                        "x-access-token": user.token
                    }
                });

                const result = await response.json();
                
                setPortalData({
                    name: result.portal.name,
                    brandName: result.portal.brandName,
                    brandImg: result.portal.brandImg,
                    productName: result.portal.productName,
                    productDescription: result.portal.productDescription,
                    successUrl: result.portal.successUrl,
                    cancelUrl: result.portal.cancelUrl,
                    privacyPolicyUrl: result.portal.privacyPolicyUrl,
                    termsUrl: result.portal.termsUrl,
                    font: result.portal.font,
                    style: result.portal.style,
                    color: result.portal.color,
                    availableRegions: result.portal.availableRegions,
                    productImg: result.portal.productImg
                })

                // Set image previews
                if (result.portal.productImg) {
                    setProductImageURL(`/static/${result.portal.productImg}`)
                }

                if (result.portal.brandImg) {
                    setBrandImageURL(`/static/${result.portal.brandImg}`)
                }
                
                setSiteId(result.site._id)
                setCustomDomain(result.site.subdomain)
                setDomainVerified(result.site.validSubdomain)

                setPublished(result.portal.published)
                setPublishedActive(result.portal.published)
            } catch (error) {
                
            } finally {
                setIsLoading(false)
            }
        };

        fetchForm();
    }, [])


    async function updatePortalStatus(status) {
        setPublishedActive(null);

        const response = await fetch(`/api/portals/${id}/status`, {
            method: 'POST',
            headers: {
                "x-access-token": user.token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({status})
        })

        if (response.ok) {
            setPublishedActive(status)
        }
    }

    function changePublished(value) {
        setPublished(value)


        // Check user plan
        if (value === 'standard') {
            
        } else if (value === 'custom') {
            if (!customDomain || !domainVerified) {
                return
            }
        }

        if (value !== publishedActive) {
            updatePortalStatus(value)    
        }
        
    }

    // On every field change
    useEffect(() => {
        // saveForm and show success/error message
        setIsModified(true)

    }, [portalData])

    function updateColor(c) {
        setPortalData({
            ...portalData,
            color: c.hex
        })
        setIsModified(true);
    }


    function formUpdate() {
        return new Promise((resolve, reject) => {
            setErrors({}) // Reset errors

            const formData = new FormData();

            for (const key in portalData) {
                if (portalData.hasOwnProperty(key)) {
                    formData.append(key, portalData[key] ?? "");
                }
            }

            fetch(`/api/portals/${id}`, {
                method: 'POST',
                headers: {
                    "x-access-token": user.token,
                },
                body: formData
            })
            .then((response) => {
                if (response.ok || response.status === 400) {
                    setIsModified(false);
                    // return response.json(), response.status;
                    return Promise.all([response.json(), response.status]);
                } else {
                    reject(new Error('Error saving, try again later'));
                }
            })
            .then(([data, status]) => {
                // Resolve the promise with the successful response data
                if (status === 400) {

                    data.errors.map((error) => { // For each field add the error msg to render
                        setErrors({
                            ...errors,
                            [error.path]: error.msg
                        })
                    })
                    
                    reject(new Error('Error saving, correct the fields'))
                } else {
                    resolve(data)
                }
            })
            .catch(error => {
                // Reject the promise with the error encountered during the request
                reject(new Error('Error saving, try again later'));
            });
        });
    }

    const saveForm = () => {
        toast.promise(
            formUpdate(),
            {
                loading: 'Saving...',
                success: (data) => `Changes saved`,
                error: (err) => `${err.message}`
            }
        );
        setPreviewKey(previewKey + 1)
    }


    const handleSettingsChange = (e) => {
        setPortalData({
            ...portalData,
            [e.target.name]: e.target.value
        })
    }


    const isValidFileType = (file) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        return allowedTypes.includes(file.type);
    };

    const handleImageChange = (e, setImage) => {
        e.preventDefault();

        const file = e.target.files[0];

        if (file && isValidFileType(file)) {
            setImage(URL.createObjectURL(file))

            setPortalData({
                ...portalData,
                [e.target.name]: file
            })
        }

    }

    const deleteImage = (e, setImage) => {
        setImage(null);

        setPortalData({
            ...portalData,
            [e.target.name]: ''
        });
    }
    
    const [open, setOpen] = useState(false)

    const cancelButtonRef = useRef(null)

    const ShareModal = () => {

        function closeFormCreationModal(e) {
            setOpen(false);
        }

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
                                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">Add user portal to your website</Dialog.Title>
                                    </div>
                                    <div className='mt-5'>
                                        
                                        <button 
                                        onClick={(e) => changePublished('')}
                                        className='right h-fit me-3 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                                        >
                                        Set as draft
                                        </button>

                                        
                                        <RadioGroup value={published} onChange={changePublished} className={'mt-5'}>
                                            <RadioGroup.Label className='block text-sm font-medium leading-6 text-gray-900'>Publish options</RadioGroup.Label> 
                                            <RadioGroup.Option value="standard">
                                                {({ checked }) => (
                                                    <div className={
                                                        classNames(
                                                            checked ? 'bg-slate-100 border-2 ' : '',
                                                            'my-2 border border-1 border-slate-200 rounded-lg p-2 cursor-pointer hover:bg-slate-50'
                                                        )
                                                    }>
                                                        <div className='flex items-center justify-between font-semibold leading-6 text-gray-900'>
                                                            Standard
                                                            {publishedActive === 'standard' && <span className='text-sm font-semibold leading-6 text-teal-600'>Active</span>}    
                                                        </div>
                                                        
                                                        <div className='block text-sm leading-6 text-gray-700'>Use {ENDPOINT} as the portal domain</div>
                                                    </div>
                                                )}
                                            </RadioGroup.Option>
                                            <RadioGroup.Option value="custom">
                                                {({ checked }) => (
                                                    <div className={
                                                        classNames(
                                                            checked ? 'bg-slate-100 border-2 ' : '',
                                                            'my-2 border border-1 border-slate-200 rounded-lg p-2 cursor-pointer hover:bg-slate-50'
                                                        )
                                                    }>
                                                        <div className='flex items-center justify-between font-semibold leading-6 text-gray-900'>
                                                            Custom
                                                            {publishedActive === 'custom' && <span className='text-sm font-semibold leading-6 text-teal-600'>Active</span>}    
                                                        </div>
                                                        
                                                        <div className='block text-sm leading-6 text-gray-700'>Use a custom domain as the portal domain</div>
                                                    </div>
                                                )}
                                            </RadioGroup.Option>
                                        </RadioGroup>

                                    </div>
                                    {published === 'standard' && (<div className="mt-5">
                                        <div className="flex flex-col">
                                            <div className="flex justify-between items-center">
                                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Url</label>
                                            </div>

                                            <div className="mt-2">
                                                <input
                                                type="text"
                                                value={`${ENDPOINT}/live/${id}`}                                                
                                                disabled
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                    </div>)}
                                    {published === 'custom' && (<div className="mt-5">
                                        <div className="flex flex-col">
                                            <div className="">
                                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Use your custom domain</label>
                                                <p className='text-sm text-gray-600'>Setup custom domains in the site settings</p>
                                            </div>

                                            {!domainVerified && (
                                                <a href="/dashboard" className='mt-2 flex gap-x-2 text-sm font-bold text-teal-600 items-center hover:text-teal-500'>
                                                    Setup
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                                        <path fillRule="evenodd" d="M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10Z" clipRule="evenodd" />
                                                    </svg>
                                                </a>
                                            )}
                                            {domainVerified && (
                                                <div className="mt-2">
                                                    <input
                                                    type="text"
                                                    value={`${customDomain}/live/${id}`}                                                
                                                    disabled
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            )}
                                            
                                        </div>
                                    </div>)}
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
            <Navbar name={''} />
            <div><Toaster /></div>
            <Tooltip id="my-tooltip" />
            <ShareModal/>
            {/* {toastMessage && <Toast message={toastMessage} onClose={(e) => setToastMessage('')} />} */}
            <header className="bg-white border-b border-zinc-100">
                <div className="flex justify-between mx-auto max-w-7xl px-4 py-1 sm:px-6 lg:px-8">
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-gray-900 flex items-center gap-x-5">
                            Edit portal {publishedActive ? (
                                <span className='text-sm font-semibold leading-6 text-teal-600'>Active</span>
                            ) : (
                                <span className='text-sm font-semibold leading-6 text-gray-600'>Saved as draft</span>
                            )}
                        </h1>
                        <div>
                            <span className='font-semibold'>Portal: </span>
                            <span>{portalData.name}</span>
                        </div>
                    </div>

                    <div className='flex items-center'>
                        <button
                            onClick={(e) => setOpen(true)}
                            className="h-fit me-3 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                            Publish
                        </button>
                        <a
                            href={`/test/${id}`}
                            target='_blank'
                            className="h-fit me-3 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                            Preview
                        </a>
                        <a
                            href='#'
                            onClick={saveForm}
                            disabled={!isModified}
                            className="h-fit rounded-md bg-teal-600 text-white px-2.5 py-1.5 text-sm font-semibold shadow-sm ring-1 ring-inset ring-teal-700 hover:opacity-90"
                        >
                            {isModified && 'Save changes'}
                            {!isModified && 'Saved'}
                        </a>
                    </div>
                </div>
            </header>
            <div className='h-screen'>
                <div className='w-full pt-5 justify-center h-full bg-accent'>
                    <div className="bg-white mx-auto lg:ps-60 h-full">
                        <div className="grid grid-cols-12 gap-4 divide-x h-full">

                            <div className="col-span-3">
                                <TextLinkLeft text={'Return'} url={`/sites/${siteId}`}/>
                                <h2 className="mb-4 text-lg font-semibold leading-7 text-gray-800">Settings</h2>

                                <Tab.Group>
                                    <Tab.List className="focus:outline-none border-b border-zinc-200 mb-4">
                                        <Tab as={Fragment}>
                                            {({ selected }) => (
                                                <button
                                                    className={
                                                        selected ? 'me-4 text-base font-semibold leading-7 text-gray-900 border-b-2 border-zinc-950' : 'me-4 text-base leading-7 text-gray-900 hover:border-b hover:border-zinc-300'
                                                    }
                                                >
                                                    General
                                                </button>
                                            )}
                                        </Tab>
                                        <Tab as={Fragment}>
                                            {({ selected }) => (
                                                <button
                                                    className={
                                                        selected ? 'me-4 text-base font-semibold leading-7 text-gray-900 border-b-2 border-zinc-950' : 'me-4 text-base leading-7 text-gray-900 hover:border-b hover:border-zinc-300'
                                                    }
                                                >
                                                    Brand
                                                </button>
                                            )}
                                        </Tab>
                                        <Tab>
                                            {({ selected }) => (
                                                <button
                                                    className={
                                                        selected ? 'me-4 text-base font-semibold leading-7 text-gray-900 border-b-2 border-zinc-950' : 'me-4 text-base leading-7 text-gray-900 hover:border-b hover:border-zinc-300'
                                                    }
                                                >
                                                    Product
                                                </button>
                                            )}
                                        </Tab>
                                        <Tab>
                                            {({ selected }) => (
                                                <button
                                                    className={
                                                        selected ? 'text-base font-semibold leading-7 text-gray-900 border-b-2 border-zinc-950' : 'text-base leading-7 text-gray-900 hover:border-b hover:border-zinc-300'
                                                    }
                                                >
                                                    Style
                                                </button>
                                            )}
                                        </Tab>
                                    </Tab.List>
                                    <Tab.Panels>
                                        <Tab.Panel>
                                            <div>
                                                <div className='mt-5'>
                                                    <div className="flex justify-between items-center">
                                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Portal name
                                                        </label>
                                                        <div className="text-sm text-gray-500">
                                                            Won't be visible for users
                                                        </div>
                                                    </div>
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            onChange={handleSettingsChange}
                                                            name="name"
                                                            value={portalData.name}
                                                            className={classNames(
                                                                errors.name ? 'ring-red-300' : ' ',
                                                                'block w-full text-gray-900 ring-gray-300 focus:ring-indigo-600 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6'
                                                            )}
                                                        />
                                                        {errors.name && <p className='mt-1 text-red-600 text-sm'>{errors.name}</p>}
                                                    </div>
                                                </div>

                                                <div className='mt-5'>
                                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                                        <a
                                                        data-tooltip-id="my-tooltip"
                                                        data-tooltip-html="Url to redirect users after they <br/>have submitted their information"
                                                        data-tooltip-place="right"
                                                        className='cursor-pointer underline decoration-dashed underline-offset-4'
                                                        >
                                                        Success url
                                                        </a>
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="url"
                                                            onChange={handleSettingsChange}
                                                            name="successUrl"
                                                            value={portalData.successUrl}
                                                            className={classNames(
                                                                errors.successUrl ? 'ring-red-300' : ' ',
                                                                'block w-full text-gray-900 ring-gray-300 focus:ring-indigo-600 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6'
                                                            )}
                                                        />
                                                        {errors.successUrl && <p className='mt-1 text-red-600 text-sm'>{errors.successUrl}</p>}
                                                    </div>
                                                </div>

                                                <div className='mt-5'>
                                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                                        <a
                                                        data-tooltip-id="my-tooltip"
                                                        data-tooltip-html="Url to redirect users if they close <br/>the portal before submitting any information"
                                                        data-tooltip-place="right"
                                                        className='cursor-pointer underline decoration-dashed underline-offset-4'
                                                        >
                                                        Cancel url
                                                        </a>
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="url"
                                                            onChange={handleSettingsChange}
                                                            name="cancelUrl"
                                                            value={portalData.cancelUrl}
                                                            className={classNames(
                                                                errors.cancelUrl ? 'ring-red-300' : ' ',
                                                                'block w-full text-gray-900 ring-gray-300 focus:ring-indigo-600 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6'
                                                            )}
                                                        />
                                                        {errors.cancelUrl && <p className='mt-1 text-red-600 text-sm'>{errors.cancelUrl}</p>}
                                                    </div>
                                                </div>


                                                <div className='mt-5'>
                                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                                        Privacy policy
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="url"
                                                            onChange={handleSettingsChange}
                                                            name="privacyPolicyUrl"
                                                            value={portalData.privacyPolicyUrl}
                                                            className={classNames(
                                                                errors.privacyPolicyUrl ? 'ring-red-300' : ' ',
                                                                'block w-full text-gray-900 ring-gray-300 focus:ring-indigo-600 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6'
                                                            )}
                                                        />
                                                        {errors.privacyPolicyUrl && <p className='mt-1 text-red-600 text-sm'>{errors.privacyPolicyUrl}</p>}
                                                    </div>
                                                </div>

                                                <div className='mt-5'>
                                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                                        Terms & conditions
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="url"
                                                            onChange={handleSettingsChange}
                                                            name="termsUrl"
                                                            value={portalData.termsUrl}
                                                            className={classNames(
                                                                errors.termsUrl ? 'ring-red-300' : ' ',
                                                                'block w-full text-gray-900 ring-gray-300 focus:ring-indigo-600 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6'
                                                            )}
                                                        />
                                                        {errors.termsUrl && <p className='mt-1 text-red-600 text-sm'>{errors.termsUrl}</p>}
                                                    </div>
                                                </div>
                                            </div>
                                        </Tab.Panel>
                                        
                                        <Tab.Panel>
                                            <div className='mt-5'>
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Brand name
                                                </label>
                                                <div className="mt-2">
                                                    {errors.brandName}
                                                    <input
                                                        type="text"
                                                        onChange={handleSettingsChange}
                                                        name="brandName"
                                                        value={portalData.brandName}
                                                        className={classNames(
                                                            errors.brandName ? 'ring-red-300' : ' ',
                                                            'block w-full text-gray-900 ring-gray-300 focus:ring-indigo-600 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6'
                                                        )}
                                                    />
                                                    {errors.brandName && <p className='mt-1 text-red-600 text-sm'>{errors.brandName}</p>}
                                                </div>
                                            </div>

                                            <div className="mt-5">
                                                <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Brand logo
                                                </label>
                                                <p className="text-gray-500 text-sm">Recommended size: 250x150 | JPG, PNG, GIF. Max size: 2MB</p>
                                                <div className="mt-2 flex items-center gap-x-3">
                                                    <img src={brandImageURL} alt="Brand logo" className="h-20 w-20 rounded ring-gray-300 shadow-md" />
                                                    <input
                                                        type="file"
                                                        id="imageInput"
                                                        accept="image/*"
                                                        name="brandImg"
                                                        onChange={(e) => handleImageChange(e, setBrandImageURL)}
                                                        className="hidden"
                                                    />
                                                    {brandImageURL && <button
                                                        name="brandImg"
                                                        onClick={(e) => deleteImage(e, setBrandImageURL)}
                                                        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                    >
                                                        Delete image
                                                    </button>}
                                                    <label
                                                        htmlFor="imageInput"
                                                        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                    >
                                                        {brandImageURL ? 'Change' : 'Add image'}
                                                    </label>
                                                    
                                                </div>
                                            </div>

                                        </Tab.Panel>

                                        <Tab.Panel>
                                            <div className='mt-5'>
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Product name
                                                </label>
                                                <div className="mt-2">
                                                    {errors.productName}
                                                    <input
                                                        type="text"
                                                        onChange={handleSettingsChange}
                                                        name="productName"
                                                        value={portalData.productName}
                                                        className={classNames(
                                                            errors.productName ? 'ring-red-300' : ' ',
                                                            'block w-full text-gray-900 ring-gray-300 focus:ring-indigo-600 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6'
                                                        )}
                                                    />
                                                    {errors.productName && <p className='mt-1 text-red-600 text-sm'>{errors.productName}</p>}
                                                </div>
                                            </div>

                                            <div className='mt-5'>
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Product description
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        onChange={handleSettingsChange}
                                                        name="productDescription"
                                                        value={portalData.productDescription}
                                                        className={classNames(
                                                            errors.productDescription ? 'ring-red-300' : ' ',
                                                            'block w-full text-gray-900 ring-gray-300 focus:ring-indigo-600 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6'
                                                        )}
                                                    />
                                                    {errors.productDescription && <p className='mt-1 text-red-600 text-sm'>{errors.productDescription}</p>}
                                                </div>
                                            </div>

                                            <div className="mt-5">
                                                <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Product image
                                                </label>
                                                <p className="text-gray-500 text-sm">Recommended size: 240x240 | JPG, PNG, GIF. Max size: 2MB</p>
                                                <div className="mt-2 flex items-center gap-x-3">
                                                    <img src={productImageURL} alt="Product image" className="h-20 w-20 rounded ring-gray-300 shadow-md" />
                                                    <input
                                                        type="file"
                                                        id="imageInput"
                                                        accept="image/*"
                                                        name="productImg"
                                                        onChange={(e) => handleImageChange(e, setProductImageURL)}
                                                        className="hidden"
                                                    />
                                                    {productImageURL && <button
                                                        name="productImg"
                                                        onClick={(e) => deleteImage(e, setProductImageURL)}
                                                        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                    >
                                                        Delete image
                                                    </button>}
                                                    <label
                                                        htmlFor="imageInput"
                                                        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                    >
                                                        {productImageURL ? 'Change' : 'Add image'}
                                                    </label>
                                                </div>
                                            </div>

                                            <div className='mt-5'>
                                                <div className="flex flex-col">
                                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                        <a
                                                        data-tooltip-id="my-tooltip"
                                                        data-tooltip-html="Tell users in which regions is <br/>your product currently available"
                                                        data-tooltip-place="right"
                                                        className='cursor-pointer underline decoration-dashed underline-offset-4'
                                                        >
                                                        Current availability
                                                        </a>
                                                    </label>
                                                    <div className="text-sm text-gray-500">
                                                        Regions where your product is currently available
                                                    </div>
                                                </div>
                                                <div className="mt-2">
                                                    <AvailabilityOptions
                                                        data={COUNTRIES}
                                                        selected={portalData.availableRegions}
                                                    ></AvailabilityOptions>
                                                </div>
                                            </div>

                                        </Tab.Panel>

                                        <Tab.Panel>

                                            <div className='mt-5'>
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Font
                                                </label>
                                                <div className="mt-2">
                                                    {/* <input
                                                    type="text"
                                                    onChange={updateDescription}
                                                    value={formDescription}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    /> */}
                                                    <Select
                                                        options={FONTS}
                                                        selectedOption={portalData.font}
                                                        onChange={(e) => setPortalData(prevData => ({ ...prevData, font: e }))}
                                                    ></Select>
                                                </div>
                                            </div>

                                            <div className='mt-5'>
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Style
                                                </label>
                                                <div className="mt-2">
                                                    <Select
                                                        options={STYLES}
                                                        selectedOption={portalData.style}
                                                        onChange={(e) => setPortalData(prevData => ({ ...prevData, style: e }))}
                                                    ></Select>
                                                </div>
                                            </div>

                                            <div className="mt-5">
                                                <label htmlFor="colorPicker" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Brand color
                                                </label>

                                                <div className="mt-2 flex items-center gap-x-3">
                                                    <button
                                                        className="w-12 h-12 rounded-md border border-gray-300"
                                                        style={{ backgroundColor: portalData.color }}
                                                        onClick={toggleColorPicker}
                                                    ></button>
                                                    <button
                                                        onClick={toggleColorPicker}
                                                        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                    >
                                                        Change
                                                    </button>
                                                </div>
                                                {showPicker &&
                                                    <>
                                                        <button
                                                            className="fixed inset-0 opacity-50"
                                                            onClick={toggleColorPicker}
                                                        ></button>
                                                        <div className="absolute z-10">
                                                            <SketchPicker
                                                                id="colorPicker"
                                                                color={portalData.color}
                                                                onChange={updateColor}
                                                                disableAlpha={true} // Disable alpha channel
                                                                className="mt-2" />
                                                        </div>
                                                    </>
                                                }
                                            </div>

                                        </Tab.Panel>

                                    </Tab.Panels>
                                </Tab.Group>
                            </div>

                            <div className="col-span-9 bg-slate-100">
                                
                                <Tab.Group>
                                    <div class="flex justify-between mx-4 pt-4">
                                        <h2 className="mb-10 text-lg font-semibold leading-7 text-gray-800">Preview</h2>
                                        <Tab.List>
                                            <Tab className='me-4'>
                                                {({ selected }) => (
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                                        className={
                                                            classNames(
                                                            selected ? 'text-teal-600' : 'rounded-md hover:bg-slate-200',
                                                            'w-6 h-6'
                                                        )}
                                                    >
                                                        <path d="M10.5 18.75a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" />
                                                        <path fillRule="evenodd" d="M8.625.75A3.375 3.375 0 0 0 5.25 4.125v15.75a3.375 3.375 0 0 0 3.375 3.375h6.75a3.375 3.375 0 0 0 3.375-3.375V4.125A3.375 3.375 0 0 0 15.375.75h-6.75ZM7.5 4.125C7.5 3.504 8.004 3 8.625 3H9.75v.375c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125-.504 1.125-1.125V3h1.125c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-6.75A1.125 1.125 0 0 1 7.5 19.875V4.125Z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                                
                                            </Tab>
                                            <Tab>
                                                {({ selected }) => (
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" 
                                                        className={
                                                            classNames(
                                                            selected ? 'text-teal-600' : 'rounded-md hover:bg-slate-200',
                                                            'w-6 h-6'
                                                        )}
                                                    >
                                                        <path fillRule="evenodd" d="M2.25 5.25a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3V15a3 3 0 0 1-3 3h-3v.257c0 .597.237 1.17.659 1.591l.621.622a.75.75 0 0 1-.53 1.28h-9a.75.75 0 0 1-.53-1.28l.621-.622a2.25 2.25 0 0 0 .659-1.59V18h-3a3 3 0 0 1-3-3V5.25Zm1.5 0v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5Z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                            </Tab>
                                        </Tab.List>
                                    </div>
                                    
                                    <Tab.Panels className={'ms-4'}>
                                        <Tab.Panel>
                                            <div id="wrap-mobile" className='mx-auto rounded-md shadow-sm bg-white ring-8 ring-slate-200 ring-opacity-50 p-4'>
                                                <iframe id="frame-mobile" src={`/test/${id}`} key={previewKey}></iframe>
                                            </div>
                                        </Tab.Panel>
                                        <Tab.Panel>
                                            <div id="wrap" className='mx-auto rounded-md shadow-sm bg-white ring-8 ring-slate-200 ring-opacity-50 p-4'>
                                                <iframe id="frame" src={`/test/${id}`} key={previewKey}></iframe>
                                            </div>
                                        </Tab.Panel>
                                    </Tab.Panels>
                                </Tab.Group>

                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </>



    );
};
