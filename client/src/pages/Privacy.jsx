import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'


const navigation = [
    { name: 'Home', href: '/' },
]


export default function Privacy() {
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
                        Privacy policy
                    </h1>
                    
                    <div className='mt-20'>
                        Regional takes your privacy seriously. To better protect your privacy we provide this privacy policy notice explaining the way your personal information is collected and used.


                        <p className='mt-10 font-bold'>Collection of Routine Information</p>
                        This app track basic information about their users. This information includes, but is not limited to, IP addresses, browser details, timestamps and referring pages. None of this information can personally identify specific user to this app. The information is tracked for routine administration and maintenance purposes.


                        <p className='mt-10 font-bold'>Cookies</p>
                        Where necessary, this app uses cookies to store information about a visitor’s preferences and history in order to better serve the user and/or present the user with customized content.


                        <p className='mt-10 font-bold'>Advertisement and Other Third Parties</p>
                        Advertising partners and other third parties may use cookies, scripts and/or web beacons to track user activities on this app in order to display advertisements and other useful information. Such tracking is done directly by the third parties through their own servers and is subject to their own privacy policies. This app has no access or control over these cookies, scripts and/or web beacons that may be used by third parties.


                        <p className='mt-10 font-bold'>Links to Third Party Websites</p>
                        We have included links on this app for your use and reference. We are not responsible for the privacy policies on these websites. You should be aware that the privacy policies of these websites may differ from our own.


                        <p className='mt-10 font-bold'>Security</p>
                        The security of your personal information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.


                        <p className='mt-10 font-bold'>Changes To This Privacy Policy</p>
                        This Privacy Policy is effective as of 25-01-2024 and will remain in effect except with respect to any changes in its provisions in the future, which will be in effect immediately after being posted on this page.
                        We reserve the right to update or change our Privacy Policy at any time and you should check this Privacy Policy periodically. If we make any material changes to this Privacy Policy, we will notify you either through the email address you have provided us, or by placing a prominent notice on our app.


                        <p className='mt-10 font-bold'>Contact Information</p>
                        For any questions or concerns regarding the privacy policy, please send us an email to info@regionalhq.com.
                    </div>
                    
                </div>
            </div>
            
        </div>

    </div>
  )
}