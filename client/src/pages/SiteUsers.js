import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router';
import { TextLinkLeft } from '../components/TextLinkLeft'
import DateTimeDisplay from '../components/DateTimeDisplay';


export default function Users() {
    const { user } = useAuthContext();
    const { siteId } = useParams();
    const [portals, setPortals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchForms = async () => {
            try {
                const response = await fetch(`/api/portals?siteId=${siteId}`, {
                    headers: {
                        "x-access-token": user.token
                    },
                });

                if (response.ok) {
                    const result = await response.json();
                    setPortals(result);
                }

            } catch (error) {
                
            } finally {
                setLoading(false)
            }
        };
    
        fetchForms();

    }, [])

    return (
        <>
            <Navbar name={'Users'}/>
            <header className="bg-white border-b border-zinc-100">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-xl font-bold text-gray-900">Users</h1>
                    <p className="text-md text-gray-900">Select portal</p>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <TextLinkLeft text={'Return'} url={'/users'}/>

                    <table className="min-w-full leading-normal rounded ring-1 ring-gray-200 mt-6">
						<thead>
							<tr>
								<th
									className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Domain
								</th>
								<th
									className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Views
								</th>
								<th
									className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Submits
								</th>
                                <th
									className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Last updated
								</th>
                                <th
									className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Action
								</th>
							</tr>
						</thead>
						<tbody>
                            {!loading && portals.map((portal) => {
                                return (<tr>
                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p class="text-gray-900 font-semibold whitespace-no-wrap">
                                            {portal.name}
                                        </p>
                                    </td>
                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p class="text-gray-900 whitespace-no-wrap">{portal.views}</p>
                                    </td>
                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p class="text-gray-900 whitespace-no-wrap">{portal.customers}</p>
                                    </td>
                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p class="text-gray-900 whitespace-no-wrap">
                                            <DateTimeDisplay isoDatetime={portal.lastUpdated}/>
                                        </p>
                                    </td>
                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <a
                                            href={`/users/${siteId}/${portal._id}`}
                                            className="relative my-4 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                        >
                                            Select
                                        </a>
                                    </td>
                                </tr>)
                            })}
						</tbody>
					</table>
                </div>
            </main>
        </>
    )
}