import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router';
import { COUNTRIES } from '../utils/constants';


export default function PortalUsers() {
    
    const { user } = useAuthContext();
    const { portalId } = useParams()
    const [loading, setLoading] = useState(true);
    const [customers, setCustomers] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [count, setCount] = useState(0);
    const [pageSize, setPageSize] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [from, setFrom] = useState(0)
    const [to, setTo] = useState(0)


    useEffect(() => {
        const fetchFormUsers = async () => {
            try {
                const response = await fetch(`/customers/${portalId}?page=${pageNumber}`, {
                    headers: {
                        "x-access-token": user.token
                    },
                });

                const result = await response.json();
                
                setCustomers(result.customers)
                setCount(result.total)
                setPageSize(result.pageSize)
                setTotalPages(result.totalPages)

                setFrom(pageNumber * pageSize + 1)
                setTo(Math.min((pageNumber+1) * pageSize, count))

            } catch (error) {
                
            } finally {
                setLoading(false)
            }
        };
    
        fetchFormUsers();

    }, [pageNumber])

    function handlePrevious(e) {
        if (pageNumber > 0) {
            setPageNumber(pageNumber - 1)
        }
    }

    function handleNext(e) {
        if ((pageNumber + 1) < totalPages) {
            setPageNumber(pageNumber + 1)
        }
    }

    const Pagination = () => {
        return (
          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
              <button
                onClick={handlePrevious}
                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Previous
              </button>
              <a
                href="#"
                onClick={handleNext}
                className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Next
              </a>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{from}</span> to <span className="font-medium">{to}</span> of{' '}
                  <span className="font-medium">{count}</span> results
                </p>
              </div>
              <div>
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                    <div className="flex flex-1 justify-between">
                        <button
                            onClick={handlePrevious}
                            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Previous
                        </button>
                        <a
                            href="#"
                            onClick={handleNext}
                            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Next
                        </a>
                    </div>
                </nav>
              </div>
            </div>
          </div>
        )
    }

    const countryNameById = (id) => {
        const country = COUNTRIES.filter((c) => c.id === id)[0]

        return country.name
    }

    const countryImgById = (id) => {
        const country = COUNTRIES.filter((c) => c.id === id)[0]

        return country.img
    }

    async function handleDownload(e) {
        if (count > 0) {
            const response = await fetch(`/customers/${portalId}/download`, {
                headers: {
                    "x-access-token": user.token
                }});
            const blob = await response.blob();
            const link = document.createElement('a');
    
            link.href = window.URL.createObjectURL(new Blob([blob]));
            link.setAttribute('download', 'customers.csv');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        

    }

    return (
        <>
            <Navbar name={'Users'}/>
            <header className="bg-white border-b border-zinc-100">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-xl font-bold tracking-tight text-gray-900">Users</h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className='flex justify-between'>
                    <a
                        href="/users"
                        onClick={handleNext}
                        className="relative my-4 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Return
                    </a>
                    <a
                        href="#"
                        onClick={handleDownload}
                        className="relative my-4 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Download CSV
                    </a>
                    </div>

                    <table className="min-w-full leading-normal rounded ring-1 ring-gray-200">
						<thead>
							<tr>
								<th
									className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Name
								</th>
								<th
									className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Email
								</th>
								<th
									className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Country
								</th>
								<th
									className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Created at
								</th>
							</tr>
						</thead>
						<tbody>
                            {!loading && customers.map((customer) => {
                                return (<tr>
                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <div class="flex items-center">
                                            <div class="ml-3">
                                                <p class="text-gray-900 whitespace-no-wrap">
                                                    {customer.name}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p class="text-gray-900 whitespace-no-wrap">{customer.email}</p>
                                    </td>
                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm flex items-center gap-x-2">
                                        <img src={countryImgById(customer.country)} className='h-6 w-6 rounded-lg'/>
                                        <p class="text-gray-900 whitespace-no-wrap">
                                            {countryNameById(customer.country)}
                                        </p>
                                    </td>
                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p class="text-gray-900 whitespace-no-wrap">
                                            {customer.createdAt}
                                        </p>
                                    </td>
                                </tr>)
                            })}
						</tbody>
					</table>

                    <Pagination/>
                    
                </div>
            </main>
        </>
    )
}
