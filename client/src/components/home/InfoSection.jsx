export default function InfoSection() {
    return (
        <div id="solution" className="overflow-hidden bg-slate-50 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    
                <div className="mx-auto grid max-w-2xl grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    
                    <div className='col-span-2'>
                        <h2 className="text-base font-semibold leading-7 text-teal-600">Become a global brand</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Build a better experience for your customers</p>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Allow users from regions where your products are not available to submit their contact information through a user portal.<br/>
                            Be prepared from day 1 to launch in new regions.
                        </p>
                    </div>

                    <div className="mx-auto overflow-hidden max-h-[550px] col-span-2 sm:col-span-1">
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                            Acquire users from untapped regions
                        </p>
                        <p className="mt-4 text-lg leading-8 text-gray-600">
                            Integrate a <a href="#portal" className='font-bold text-teal-600 hover:text-teal-500'>user portal</a> on your website to acquire users from regions where your business is not yet available. 
                        </p>
                        <img
                            src="/phone_submit.png"
                            alt="Product screenshot"
                            className="mt-10 h-[500px] mx-auto rounded-xl shadow-xl ring-8 ring-gray-200"
                        />
                    </div>
                        
                    <div className="mx-auto overflow-hidden max-h-[550px] col-span-2 sm:col-span-1">
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                            Seamlessly integrate user portals
                        </p>
                        <p className="mt-4 text-lg leading-8 text-gray-600">
                            Add a <a href="#prompt" className='font-semibold text-teal-600'>prompt</a> to your website and redirect users from unavailable regions to your user portal.
                        </p>
                        <img
                            src="/prompt.png"
                            alt="Product screenshot"
                            className="mt-10 h-[250px] sm:w-auto mx-5 md:h-[325px] md:mx-auto rounded-xl shadow-xl ring-8 ring-gray-200"
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}