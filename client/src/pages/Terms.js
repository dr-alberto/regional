import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'


const navigation = [
    { name: 'Home', href: '/' },
]


export default function Terms() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-white">
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
            <a href="/login" className="flex rounded-full bg-teal-600 px-3 py-1.5 text-sm font-bold text-white shadow-sm hover:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600">
              Log in
            </a>
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

        <div className="relative isolate px-6 lg:px-8">
            
            <div className="mx-auto max-w-2xl py-32 sm:py-38 lg:b-56">
            
                <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
                <div className="flex flex-col backdrop-blur-sm py-14">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                        Terms of Use
                    </h1>
                    
                    <div className='mt-20'>
                        
                        By using this web site ("Service"), you are agreeing to be bound by the following terms and conditions ("Terms of Use").

                        IF YOU DO NOT AGREE WITH THESE TERMS AND CONDITIONS, YOU MUST NOT ACCEPT THIS AGREEMENT AND MAY NOT USE THE SERVICE.

                        Violations of any of the terms below will result in the termination of your Account. You agree to use the Service at your own risk.

                        <p className='mt-10 font-bold'>Account Terms</p>
                        <ul className='list-none'>
                            <li>1.1 Your user account may only be used by one person. A single account shared by multiple users is not permitted. Registration of a user account is free so please create as many user accounts as necessary for your productive use of the Service.</li>
                            <li>1.2 You are responsible for maintaining the security of your username and password. Regional cannot and will not be liable for any loss or damage from your failure to comply with this security obligation.</li>
                            <li>1.3 You must not use the Service to carry on any illegal or unauthorized activities (including but not limited to copyright or trademark infringements).</li>
                        </ul>
                        <hr className='my-5'/>

                        <p className='mt-10 font-bold'>Payment and Refunds</p>
                        <ul className='list-none'>
                            <li>2.1 Beyond the initial trial credit, you must enter a valid credit card to pay the monthly balance due on an Organization's account.</li>
                            <li>2.2 There will be no refunds for payments of the monthly or yearly plans.</li>
                        </ul>
                        <hr className='my-5'/>

                        <p className='mt-10 font-bold'>Cancellation and Termination</p>
                        <ul className='list-none'>
                            <li>3.1 You are solely responsible for properly canceling accounts. You can cancel an account at any time by emailing us. It is a simple no questions asked cancellation procedure.</li>
                            <li>3.2 If you decide to delete an Account, all of the Content associated with that Account will be immediately deleted from the Service. This information can not be recovered once it has been deleted.</li>
                            <li>3.3 Regional, in its sole discretion, has the right to suspend or terminate an Account at any time.</li>
                            <li>3.4 Regional reserves the right to refuse service to anyone for any reason at any time.</li>
                        </ul>
                        <hr className='my-5'/>

                        <p className='mt-10 font-bold'>Copyright and Content Ownership</p>
                        <ul className='list-none'>
                            <li>4.1 We claim no intellectual property rights over the material you provide to the Service. Your materials uploaded remain yours.</li>
                            <li>4.2 You shall defend Regional against any claim, demand, suit or proceeding made or brought against Regional that Your Content, or Your use of the Service infringes or misappropriates the intellectual property rights of a third party or violates applicable laws.</li>
                            <li>4.3 You shall indemnify Regional for any damages finally awarded against, and for reasonable attorney’s fees incurred by, Regional in connection with any such claim, demand, suit or proceeding; provided, that Regional</li>
                        </ul>
                        <hr className='my-5'/>

                        <p className='mt-10 font-bold'>General Conditions</p>
                        <ul className='list-none'>
                            <li>6.1 You use the Service at your own risk. The service is provided on an "as is" and "as available" basis.</li>
                            <li>6.2 You agree not to reproduce, duplicate, modify, sell or resell the Service without the express written permission by Regional.</li>
                            <li>6.3 Be nice, just do not hack into the Service or falsely imply that you are associated with the Service, Regional, or any other Regional service.</li>
                            <li>6.4 Questions about the Terms of Use should be sent to info@regionalhq.com.</li>
                        </ul>

                    </div>
                    
                </div>
            </div>
            
        </div>

    </div>
  )
}