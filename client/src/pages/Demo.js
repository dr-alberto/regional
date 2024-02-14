import { Fragment, useState } from 'react'
import { Dialog, Listbox, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Button } from '../components/Button'
import { TextLink } from '../components/TextLink'
import { DEMO_LINK } from '../utils/constants'

const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Contact', href: 'mailto:info@regionalhq.com' },
    { name: 'Live demo', href: '/demo' },
]

const people = [
    {
      id: 1,
      name: 'Brazil',
    },
    {
      id: 2,
      name: 'Argentina',
    },
]
  
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
  


export default function Demo() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [selected, setSelected] = useState(null)


    return (
         <div className="container mx-auto p-4">
            <header className="absolute inset-x-0 top-0 z-50">
                <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <a href="/" className="-m-1.5 p-1.5">
                    <span className="sr-only">Regional</span>
                    <img
                        className="h-9 w-auto"
                        src="/logo.svg"
                        alt=""
                    />
                    </a>
                </div>
                <div className="flex lg:hidden">
                    <button
                    type="button"
                    className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    onClick={() => setMobileMenuOpen(true)}
                    >
                    <span className="sr-only">Open main menu</span>
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                    <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
                        {item.name}
                    </a>
                    ))}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <Button text={'Log in'} url={'/login'}></Button>
                </div>
                </nav>
                <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-50" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                    <a href="#" className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        <img
                        className="h-8 w-auto"
                        src="/logo.svg"
                        alt=""
                        />
                    </a>
                    <button
                        type="button"
                        className="-m-2.5 rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    </div>
                    <div className="mt-6 flow-root">
                    <div className="-my-6 divide-y divide-gray-500/10">
                        <div className="space-y-2 py-6">
                        {navigation.map((item) => (
                            <a
                            key={item.name}
                            href={item.href}
                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >
                            {item.name}
                            </a>
                        ))}
                        </div>
                        <div className="py-6">
                        <a
                            href="/login"
                            className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        >
                            Log in
                        </a>
                        </div>
                    </div>
                    </div>
                </Dialog.Panel>
                </Dialog>
            </header>
            
            
            
            <div className="relative isolate text-center px-6 lg:px-8 mx-auto max-w-2xl py-32 sm:py-38 lg:b-46">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Live demo
                </h1>
                <p className='mt-4 text-xl text-gray-600'>Discover how Regional can help your business capture more users</p>
            </div>
            
                            
            <div className="flex flex-wrap -mx-2 rounded-xl ring-8 ring-slate-200 py-20">
                {/* Form Column */}

                
                <div className="w-full md:w-1/2 px-10 mb-4">
                    <div>
                        <h2 className="sr-only">Steps</h2>

                        <div>
                            <div className="overflow-hidden rounded-full bg-gray-200">
                                <div className="h-2 w-1/2 rounded-full bg-gray-300"></div>
                            </div>

                            <ol className="mt-4 grid grid-cols-3 text-sm font-medium text-gray-500">
                                <li className="flex items-center justify-start sm:gap-1.5">
                                    <span className="hidden sm:inline"> Details </span>

                                    <svg
                                    className="h-6 w-6 sm:h-5 sm:w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                                    />
                                    </svg>
                                </li>

                                <li className="flex items-center justify-center sm:gap-1.5">
                                    <span className="hidden sm:inline"> Address </span>

                                    <svg
                                    className="h-6 w-6 sm:h-5 sm:w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    </svg>
                                </li>

                                <li className="flex items-center justify-end sm:gap-1.5">
                                    <span className="hidden sm:inline"> Payment </span>

                                    <svg
                                    className="h-6 w-6 sm:h-5 sm:w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                    />
                                    </svg>
                                </li>
                            </ol>
                        </div>
                    </div>

                    <form className='mt-10' disabled>
                        <p className='text-xl mb-5 text-gray-500'>Shipping information</p>
                        <Listbox value={selected} onChange={setSelected}>
                            {({ open }) => (
                                <>
                                <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">Select your country</Listbox.Label>
                                <div className="relative mt-2">
                                    <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 sm:text-sm sm:leading-6">
                                    <span className="flex items-center">
                                        {/* <img src={selected.avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" /> */}
                                        <span className="ml-3 block truncate">{selected ? selected.name: 'Select'}</span>
                                    </span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </span>
                                    </Listbox.Button>

                                    <Transition
                                    show={open}
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                    >
                                    <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                        {people.map((person) => (
                                        <Listbox.Option
                                            key={person.id}
                                            className={({ active }) =>
                                            classNames(
                                                active ? 'bg-gray-400 text-white' : 'text-gray-900',
                                                'relative cursor-default select-none py-2 pl-3 pr-9'
                                            )
                                            }
                                            value={person}
                                        >
                                            {({ selected, active }) => (
                                            <>
                                                <div className="flex items-center">
                                                {/* <img src={person.avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" /> */}
                                                <span
                                                    className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                >
                                                    {person.name}
                                                </span>
                                                </div>

                                                {selected ? (
                                                <span
                                                    className={classNames(
                                                    active ? 'text-white' : 'text-gray-600',
                                                    'absolute inset-y-0 right-0 flex items-center pr-4'
                                                    )}
                                                >
                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                                ) : null}
                                            </>
                                            )}
                                        </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                    </Transition>
                                </div>
                                </>
                            )}
                        </Listbox>
                        
                        <div className='mt-4 text-md'>
                            <p className="block leading-6 font-semibold text-gray-900">Can't find your country?</p>
                            <TextLink text={'Get notified when we launch on your region'} url={DEMO_LINK}/>
                        </div>
                        <div className="float-right mt-5">
                            <button className="bg-gray-400 rounded-full text-white text-sm py-1 px-2 focus:outline-none focus:shadow-outline" type="button">
                                Continue
                            </button>
                        </div>
                    </form>
                </div>

                {/* Products Column */}
                <div className="w-full md:w-1/2 px-2 mb-4">
                {/* Iterate over products here */}
                <p className='text-xl mb-5 text-gray-500'>Order summary</p>

                <div className="flex items-center border border-gray-200 p-5">
                    <img className="h-16 w-16 object-cover mr-4 grayscale" src="/makeup_kit.jpg" alt="Product"/>
                    <div className='w-full'>
                        <p className="font-semibold  flex justify-between text-gray-700">
                            Makeup kit
                            <p>$150.00</p>
                        </p>
                        <p className='text-sm text-gray-600 mt-2'>The coolest makeup kit in the world.</p>
                    </div>
                </div>
                <div className="flex justify-between mb-4 border border-gray-200 p-5 text-gray-700 font-semibold">
                    Total
                    <p>$140.00</p>
                </div>
                
                {/* Repeat the above div for each product in the list */}
                </div>
            </div>
    </div>
    )

}
