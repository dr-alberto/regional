export default function FeaturesSection() {
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="container mx-auto">
                    <div className="mx-auto max-w-2xl sm:text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">All the features that you need</h2>
                    </div>
                    <div class="grid auto-rows-[484px] grid-cols-3 gap-4 mt-10">
                        <div class="col-span-3 sm:col-span-2 text-center pt-10 px-4 sm:p-10 pb-0 overflow-hidden rounded-2xl bg-gray-50 ring-1 ring-inset ring-gray-900/5">
                            <h1 className='font-bold text-xl text-gray-800'>Fully customizable</h1>
                            <p className='text-md mt-2'>Customize portals and prompts from an easy-to-use editor.</p>
                            <img
                                src="/edit.png"
                                alt="Product screenshot"
                                className="rounded-xl shadow-xl ring-8 ring-gray-200 w-screen mt-10"
                            />
                        </div>
                        <div class="col-span-3 sm:col-span-1 rounded-2xl text-center p-10 pb-0 bg-gray-50 ring-1 ring-inset ring-gray-900/5 flex flex-col">
                            <h1 className='font-bold text-xl text-gray-800'>Auto-translation</h1>
                            <p className='text-md mt-2'>Portals and prompts are automatically translated into 8 languages to enhance the user experience.</p>
                            
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-32 h-32 text-teal-600 mx-auto my-auto">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
                            </svg>

                        </div>
                        <div class="col-span-3 sm:col-span-2 rounded-2xl text-center overflow-hidden p-10 pb-0 bg-gray-50 ring-1 ring-inset ring-gray-900/5">
                            <h1 className='font-bold text-xl text-gray-800'>Optimized by default</h1>
                            <p className='text-md mt-2'>Portals and prompts are optimized for mobile devices.</p>
                            <div className='flex justify-center gap-x-10'>
                                <img
                                    src="/phone_submit.png"
                                    alt="Product screenshot"
                                    className="rounded-xl shadow-xl ring-8 ring-gray-200 mt-10 h-[450px] sm:h-[550px]"
                                />
                                <img
                                    src="/phone_en.png"
                                    alt="Product screenshot"
                                    className="rounded-xl shadow-xl ring-8 ring-gray-200 mt-10 h-[450px] sm:h-[550px]"
                                />
                            </div>
                        </div>
                        <div class="col-span-3 sm:col-span-1 rounded-2xl text-center overflow-hidden p-10 pb-0 bg-gray-50 ring-1 ring-inset ring-gray-900/5">
                            <h1 className='font-bold text-xl text-gray-800'>Seamless integration</h1>
                            <p className='text-md mt-2'>Add portals and prompts to your sites manually or with quick integrations.</p>
                            <img
                                src="/shopify.png"
                                alt="Product screenshot"
                                className="rounded-xl shadow-md ring-1 ring-gray-200 mt-10 mx-auto h-[150px] w-auto"
                            />
                            <img
                                src="/wordpress.png"
                                alt="Product screenshot"
                                className="rounded-xl shadow-md ring-1 ring-gray-200 mt-10 mx-auto"
                            />
                        </div>
                        <div class="col-span-3 sm:col-span-2 rounded-2xl text-center overflow-hidden pt-10 px-4 sm:p-10 pb-0 bg-gray-50 ring-1 ring-inset ring-gray-900/5">
                            <h1 className='font-bold text-xl text-gray-800'>Analytics</h1>
                            <p className='text-md mt-2'>Basic analytics to help you understand your users</p>
                            <img
                                src="/dashboard.png"
                                alt="Product screenshot"
                                className="rounded-xl shadow-xl ring-8 ring-gray-200 mt-10 w-screen"
                            />
                        </div>
                        <div class="col-span-3 sm:col-span-1 rounded-2xl text-center p-10 pb-0  bg-gray-50 ring-1 ring-inset ring-gray-900/5 flex flex-col">
                            <h1 className='font-bold text-xl text-gray-800'>Use your custom domain</h1>
                            <p className='text-md mt-2'>Improve user experience by using custom domains for your portals..</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-32 h-32 text-teal-600 mx-auto my-auto">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                            </svg>
                        </div>
                        <div class="col-span-3 sm:col-span-2 rounded-2xl text-center overflow-hidden pt-10 px-4 sm:p-10 pb-0 bg-gray-50 ring-1 ring-inset ring-gray-900/5">
                            <h1 className='font-bold text-xl text-gray-800'>Own your data</h1>
                            <p className='text-md mt-2'>Download your users' data at any time</p>
                            <img
                                src="/users.png"
                                alt="Product screenshot"
                                className="rounded-xl shadow-xl ring-8 ring-gray-200 mt-10 w-screen"
                            />
                        </div>
                        <div class="col-span-3 sm:col-span-1 rounded-2xl text-center p-10 pb-0  bg-gray-50 ring-1 ring-inset ring-gray-900/5 flex flex-col">
                            <h1 className='font-bold text-xl text-gray-800'>Secure and private</h1>
                            <p className='text-md mt-2'>Your data will never be shared with third parties and will be stored encrypted.</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-32 h-32 text-teal-600 mx-auto my-auto">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}