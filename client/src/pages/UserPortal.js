import React, { Fragment, useState, useEffect, startTransition } from 'react';
import { useParams } from 'react-router-dom';
import { Listbox, Transition, Disclosure } from '@headlessui/react'
import { classNames } from '../utils/utils'
import AutocompleteSearch from '../components/AutocompleteSearch';
import { COUNTRIES } from '../utils/constants';
import { useTranslation } from "react-i18next";


const UserPortal = () => {
    const { t, i18n } = useTranslation();
    const { id } = useParams();
    const [form, setForm] = useState(null);
    const [organization, setOrganization] = useState(null);
    const [loading, setIsLoading] = useState(true);
    const [selected, setSelected] = useState(null);
    const [regions, setRegions] = useState([]);

    const [data, setData] = useState({});
    const [error, setError] = useState(false);

    const ApiKey = "AIzaSyAYQjHut29uoD0cb8ejPKD0zsp_B_2Wq9I"
    
    const [selectedPlace, setSelectedPlace] = useState(null);

    const handleSelectPlace = (place) => {
        startTransition(() => {
            setSelectedPlace(place);
        })
    };

    const handleSelectCountry = (country) => {
        startTransition(() => {
            setSelected(country)
            setError(false)
        })
    }

    const parseAvailableRegions = (regionsStr) => {
        const regions = regionsStr[0].split(',')

        startTransition(() => {
            setRegions([])
        })
        
        
        regions.map((regionId) => {
            const country = COUNTRIES.filter((c) => c.id === regionId)[0]

            startTransition(() => {
                setRegions(prevRegions => {
                    return [...prevRegions, country.name]
                })
            })
            
        })
    }    

    useEffect(() => {
        const fetchForm = async () => {
            try {
                const response = await fetch(`/forms/${id}?mode=live`)

                const result = await response.json();
                
                startTransition(() => {
                    setForm(result.form);
                    setOrganization(result.organization);
                })
                
                
                parseAvailableRegions(result.form.availableRegions)

            } catch (error) {
                
            } finally {
                startTransition(() => {
                    setIsLoading(false)
                })
            }
        };

        fetchForm();

    }, [])

    useEffect(() => {
        const currentLanguage = i18n.language;
        const languageQueryParam = `lng=${currentLanguage}`;
        const currentUrl = window.location.href;

        // Check if the language query parameter is not already present
        if (!currentUrl.includes(languageQueryParam)) {
        const separator = currentUrl.includes('?') ? '&' : '?';
        const newUrl = `${currentUrl}${separator}${languageQueryParam}`;
        window.history.replaceState({}, document.title, newUrl);
        }
      }, [i18n.language]);
    


    function handleSubmit(e) {
        e.preventDefault();
        
        if (!selected) {
            
            startTransition(() => {setError(true)})
            
            return
        }

        const payload = {
            name: data.name,
            email: data.email,
            country: selected.id,
            address: selectedPlace
        }

        fetch(`/customers/${id}`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        .then(response => {
            window.location.href = form.successUrl
        })
        
    }

    function handleChange(e) {
        startTransition(() => {
            setData({
            ...data,
            [e.target.name]: e.target.value
        })
        })
        
    }
      
    return !loading && (
        <div style={{fontFamily: `${form.formFont}, system-ui, sans-serif`}}  className='grid grid-cols-12 gap-4 min-h-screen'>
            <div className='hidden lg:flex col-span-6 bg-slate-50 flex items-center'>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className='flex justify-between items-center mb-6'>
                        <a href={form.cancelUrl} className='font-bold flex text-sm items-center hover:text-zinc-600'>
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512" className='me-2'><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128z"/></svg>
                            <span>{t("Back")}</span>
                        </a>
                        <img src={`/static/${organization.logo}`} alt="Current Image" className="w-14 h-auto rounded ring-gray-300" />
                    </div>

                    <p className="text-xl font-bold tracking-tight text-zinc-900">{t('get_notified')}</p>
                    <div className='flex gap-x-3 mt-10'>
                        <img src={`/static/${form.productImg}`} alt="Current Image" className="h-14 w-14 rounded ring-gray-300 shadow-md" />
                        <div className=''>
                            <p className='text-base font-semibold'>{form.productName}</p>
                            <p className='text-sm text-gray-600'>{form.productDescription}</p>
                        </div>
                    </div>

                    {regions && (
                        <div className='mt-10 text-sm text-green-600'>
                            <div className='font-semibold flex items-center gap-x-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 animate-pulse">
                                    <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                                </svg>
                                {t('currently_available')}
                            </div>
                            <p className='ms-5 font-normal'>{regions.join(', ')}</p>
                        </div>
                    )}

                    <div className='mt-40 flex justify-between'>
                        <a href="/" target='_blank'>
                            <img className="h-7 w-auto grayscale" src="/logo.svg" alt=""/>
                        </a>
                        <div className='flex gap-x-2 text-gray-600'>
                            {form.termsUrl && <a href={form.termsUrl} className='text-sm underline underline-offset-4' target='_blank'>{t('Terms')}</a>}
                            {form.privacyPolicyUrl && <a href={form.privacyPolicyUrl} className='text-sm underline underline-offset-4' target='_blank'>{t('Privacy')}</a>}
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className='col-span-12 lg:col-span-6 flex items-center'>
                
                <div className="h-full sm:h-auto sm:px-0 mx-auto w-full sm:max-w-sm">
                    
                    <Disclosure as="nav" className="sm:hidden">
                        {({ open, close }) => (
                            <>
                            {/* Shadow Overlay */}
                            {open && (
                                <div
                                className="fixed inset-0 bg-black bg-opacity-50 z-10"
                                onClick={close}
                                ></div>
                            )}

                            <div className="relative z-20 mx-auto max-w-7xl sm:px-6 lg:px-8">
                                <div className="flex h-16 items-center justify-between">
                                {/* Disclosure Button */}
                                <Disclosure.Button className="z-20 h-full relative w-full inline-flex items-center justify-end px-2 bg-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <div className='underline flex gap-x-1 text-sm items-center'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                                            </svg>
                                            Hide details
                                        </div>
                                    ) : (
                                        <div className='underline flex gap-x-1 text-sm items-center'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                            </svg>
                                            Show Details
                                        </div>
                                    )}
                                </Disclosure.Button>
                                </div>
                            </div>

                            

                            {/* Disclosure Panel */}
                            <Disclosure.Panel className="sm:hidden absolute top-16 z-20 w-full">
                                <div className="bg-white p-4">
                                    <div className='flex gap-x-3 mt-10'>
                                        <img src={`/static/${form.productImg}`} alt="Current Image" className="h-14 w-14 rounded ring-gray-300 shadow-md" />
                                        <div className=''>
                                            <p className='text-base font-semibold'>{form.productName}</p>
                                            <p className='text-sm text-gray-600'>{form.productDescription}</p>
                                        </div>
                                    </div>

                                    {regions && (
                                        <div className='mt-10 text-sm text-green-600'>
                                            
                                            <div className='font-semibold flex items-center gap-x-1'>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 animate-pulse">
                                                    <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                                                </svg>
                                                {t('currently_available')}
                                            </div>
                                            <p className='ms-5 font-normal'>{regions.join(', ')}</p>
                                        </div>
                                    )}

                                    <div className='mt-40 flex justify-between'>
                                        <a href="/" target='_blank'>
                                            <img className="h-7 w-auto grayscale" src="/logo.svg" alt=""/>
                                        </a>
                                        <div className='flex gap-x-2 text-gray-600'>
                                            {form.termsUrl && <a href={form.termsUrl} className='text-sm underline underline-offset-4' target='_blank'>{t('Terms')}</a>}
                                            {form.privacyPolicyUrl && <a href={form.privacyPolicyUrl} className='text-sm underline underline-offset-4' target='_blank'>{t('Privacy')}</a>}
                                        </div>
                                    </div>
                                </div>
                            </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>
                        
                    <div className='mx-auto max-w-sm px-2 sm:px-0'>
                        <div className='sm:hidden flex justify-between items-center mb-6'>
                            <a href={form.cancelUrl} className='font-bold flex text-sm items-center hover:text-zinc-600'>
                                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512" className='me-2'><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128z"/></svg>
                                <span>{t("Back")}</span>
                            </a>
                            <img src={`/static/${organization.logo}`} alt="Current Image" className="w-14 h-auto rounded ring-gray-300" />
                        </div>
                                        
                        <p className="lg:hidden text-xl font-bold tracking-tight text-zinc-900">{t('get_notified')}</p>
                        
                        <form 
                            className={
                                classNames(
                                    loading ? 'animate-pulse': null,
                                    "space-y-6 mt-6" 
                                )
                            }
                            onSubmit={handleSubmit}>

                                <div>
                                    {!loading && <label className="block text-sm font-medium leading-6 text-gray-900">
                                        {t("Name")}
                                    </label>}
                                    {loading && <div className="h-2 bg-slate-200 rounded"></div>}
                                    {!loading && (
                                        <div className="mt-2">
                                            <input
                                                name="name"
                                                type="text"
                                                value={data.name}
                                                onChange={handleChange}
                                                required
                                                className={
                                                    classNames(
                                                        form.formStyle === 'Pill' ? 'rounded-full' : null,
                                                        form.formStyle === 'Sharp' ? null : null,
                                                        form.formStyle === 'Rounded' ? 'rounded-md' : null,
                                                        'relative cursor-default select-none py-2 pl-3 pr-9',
                                                        "block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-zinc-600 sm:text-sm sm:leading-6"
                                                        )
                                                }
                                            />
                                        </div>
                                    )}
                                    {loading && <div className="h-10 bg-slate-200 rounded"></div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                        {t('Email')}
                                    </label>
                                    <div className="mt-2">
                                        <input
                                        name="email"
                                        type="text"
                                        value={data.email}
                                        onChange={handleChange}
                                        required
                                        className={
                                            classNames(
                                            form.formStyle === 'Pill' ? 'rounded-full' : null,
                                            // form.formStyle === 'Sharp' ? null : null,
                                            form.formStyle === 'Rounded' ? 'rounded-md' : null,
                                            'relative cursor-default select-none py-2 pl-3 pr-9',
                                            "block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-zinc-600 sm:text-sm sm:leading-6"
                                        )}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                        {t('Country or region')}
                                    </label>
                                    <div className="flex flex-col divide-y ring-1 ring-offset-0 ring-gray-300 rounded mt-2">
                                        <div>
                                            <Listbox value={selected} onChange={handleSelectCountry}>
                                            {({ open }) => (
                                                <div className='relative'>
                                                <Listbox.Button 
                                                    className={
                                                        classNames(
                                                        form.formStyle === 'Pill' ? 'rounded-lg' : null,
                                                        form.formStyle === 'Rounded' ? 'rounded-md' : null,
                                                        error ? 'ring-1 ring-red-300' : null,
                                                        "relative w-full cursor-default bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm focus:outline-none sm:text-sm sm:leading-6"
                                                    )}
                                                    >
                                                    <span className="flex items-center">
                                                    <span className="block truncate">{selected ? selected.name : t('Country')}</span>
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
                                                                form.formStyle === 'Pill' ? 'rounded-lg' : null,
                                                                // form.formStyle === 'Sharp' ? null : null,
                                                                form.formStyle === 'Rounded' ? 'rounded-md' : null,
                                                                "absolute z-10 mt-1 max-h-56 w-full overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                                                            
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
                                        <div>
                                            <AutocompleteSearch selectedPlace={selectedPlace} onSelectPlace={handleSelectPlace} roundedSettings={form.formStyle} placeholder={t('Address')}/>
                                        </div>
                                    </div>

                                </div>

                                <button
                                    id="btn-submit"
                                    type="submit"
                                    style={{ backgroundColor: form.formColor }}
                                    className={`mt-2 flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500`}
                                >
                                    {t('Continue')}
                                </button>
                            <p className='text-xs mt-2 text-gray-600'>
                                {t('submit_helper', {organization: organization.name})}
                            </p>
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
  );
};

export default UserPortal;
