export default function InfoSection() {
    return (
        <div id="solution" className="overflow-hidden bg-slate-50 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    
                <div className="">
                    
                    <div>
                        <h2 className="text-base font-semibold leading-7 text-teal-600">Everyone can visit your website</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">More than 50% of Internet traffic is organic</p>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                          If your products are limited to some countries, 
                          add Regional to your website to build a pre-qualified list of interested users in other regions.
                        </p>
                    </div>

                    <div className="mt-16 grid grid-cols-3 gap-x-8 max-w-none">
                    
                      <dl className="max-w-xl space-y-8 text-base leading-7 text-gray-600 col-span-3 lg:col-span-1 lg:grid-cols-1">
                          <div className="relative pl-9 ">
                              <dt className="inline font-semibold text-gray-900 text-lg">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="absolute left-1 top-1 h-5 w-5 text-teal-600">
                                  <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                              </svg>
                              Instant global outreach
                              </dt><br/>
                              <dd className="inline">
                                From the moment you add Regional to your website, you can instantly reach and engage with potential customers in untapped regions.
                              </dd>
                          </div>
                          <div className="relative pl-9 col-span-1">
                              <dt className="inline font-semibold text-gray-900 text-lg">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="absolute left-1 top-1 h-5 w-5 text-teal-600">
                                  <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                              </svg>
                              Direct revenue impact
                              </dt><br/>
                              <dd className="inline">
                                Increase the chances of turning curious users into paying customers, driving immediate revenue growth as you launch in new regions.
                              </dd>
                          </div>
                          <div className="relative pl-9">
                              <dt className="inline font-semibold text-gray-900 text-lg">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="absolute left-1 top-1 h-5 w-5 text-teal-600">
                                  <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                              </svg>
                              Smart marketing spend
                              </dt><br/>
                              <dd className="inline">
                              Optimize marketing budgets by focusing on regions with proven interest, ensuring every marketing dollar is spent efficiently on potential high-conversion areas.
                              </dd>
                          </div>
                          <div className="relative pl-9">
                              <dt className="inline font-semibold text-gray-900 text-lg">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="absolute left-1 top-1 h-5 w-5 text-teal-600">
                                  <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                              </svg>
                              Low risk market exploration
                              </dt><br/>
                              <dd className="inline">
                              From day one, you can explore new markets with minimal risk, using the 
                              <a href="#portal" className="text-teal-600 font-bold"> user portal </a>
                               to gauge interest before committing extensive resources, providing a low-cost, low-risk approach to international expansion.
                              </dd>
                          </div>
                      </dl>
                      <img
                            src="/dashboard.png"
                            alt="Product screenshot"
                            className="w-[32rem] mt-10 lg:mt-0 max-w-none rounded-xl shadow-xl ring-8 ring-gray-200 sm:w-[64rem] md:-ml-4 lg:-ml-0 col-span-3 lg:col-span-2"
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}