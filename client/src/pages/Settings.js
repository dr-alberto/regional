import React, { useEffect, useState} from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import Navbar from '../components/Navbar';
import { TextLink } from '../components/TextLink'



export default function Settings() {
    const { user } = useAuthContext();
    const [loading, setLoading] = useState(true)
    const [startupPriceId, setStartupPriceId] = useState()
    const [expansionPriceId, setExpansionPriceId] = useState()
    const [growthPriceId, setGrowthPriceId] = useState()
    const [userPlan, setUserPlan] = useState()

    useEffect(() => {
        const fetchPricesIds = async () => {
            fetch('/api/config', {
                headers: {
                    "x-access-token": user.token,
                },
            })
            .then(response => response.json())
            .then(data => {
                setStartupPriceId(data.priceStarter)
                setExpansionPriceId(data.priceExpansion)
                setGrowthPriceId(data.priceGrowth)
            })
            .catch(error => {})
        }
    
        const fetchUserPlan = async () => {
            fetch('/api/subInfo', {
                headers: {
                    "x-access-token": user.token,
                },
            })
            .then(response => response.json())
            .then(data => {
                setUserPlan(data.plan)
            })
            .catch(error => {})
        }

        const fetchData = async () => {
            await fetchUserPlan()
            await fetchPricesIds()
            setLoading(false);
        }

        fetchData();
        
    }, []);

    return (
        <>
        <Navbar name={'Settings'}/>
        <header className="bg-white border-b border-zinc-100">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <h1 className="text-xl font-bold tracking-tight text-gray-900">Settings</h1>
            </div>
        </header>
        <main>
            {!loading && (
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h2 className="mb-4 text-lg font-semibold leading-7 text-gray-800">Support</h2>
                    
                    <div className='mt-5'> 
                        Have a question? Email us at: <a href="mailto:info@regionalhq.com" className='text-blue-700'>info@regionalhq.com</a>
                    </div>

                    <h2 className="mt-10 mb-4 text-lg font-semibold leading-7 text-gray-800">Billing</h2>

                    <div className='mt-5'> 
                        <span className='font-bold'>Plan: </span>
                        {!userPlan && 'No plan selected'}
                        {userPlan === startupPriceId && 'Startup'}
                        {userPlan === expansionPriceId && 'Expansion'}
                        {userPlan === growthPriceId && 'Growth'}

                        {!userPlan && <TextLink text={'Select plan'} url={'/billing'}/>}
                        {userPlan && <TextLink text={'Manage plan'} url={'/billing'}/>}
                    </div>
                    

                
                </div>
            )}
          </main>
        
          
        </>

        
    )

}
