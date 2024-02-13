import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import Navbar from '../components/Navbar';
import { TextLinkLeft } from '../components/TextLinkLeft';


export default function Users() {
    const { user } = useAuthContext();
    const [sites, setSites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchForms = async () => {
            try {
                const response = await fetch('/api/sites', {
                    headers: {
                        "x-access-token": user.token
                    },
                });

                if (response.ok) {
                    const result = await response.json();

                    setSites(result);
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
                    <p className="text-md text-gray-900">Select site</p>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <TextLinkLeft text={'Return to dashboard'} url={'/dashboard'}/>
                    <table className="min-w-full leading-normal rounded ring-1 ring-gray-200 mt-6">
						<thead>
							<tr>
								<th
									className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Domain
								</th>
								<th
									className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Portals
								</th>
								<th
									className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Prompts
								</th>
                                <th
									className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Action
								</th>
							</tr>
						</thead>
						<tbody>
                            {!loading && sites.map((site) => {
                                return (<tr>
                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p class="text-gray-900 font-semibold whitespace-no-wrap">
                                            {site.domain}
                                        </p>
                                    </td>
                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p class="text-gray-900 whitespace-no-wrap">{site.portals}</p>
                                    </td>
                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p class="text-gray-900 whitespace-no-wrap">{site.prompts}</p>
                                    </td>
                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <a
                                            href={`/users/${site._id}`}
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
