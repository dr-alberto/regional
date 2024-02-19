import { lazy, Suspense } from 'react';
const Navbar = lazy(() => import('../components/home/Navbar.jsx'));
const Header = lazy(() => import('../components/home/Header.jsx'));
const InfoSection = lazy(() => import('../components/home/InfoSection.jsx'));
const PortalSection = lazy(() => import('../components/home/PortalSection.jsx'));
const PromptSection = lazy(() => import('../components/home/PromptSection.jsx'));
const FeaturesSection = lazy(() => import('../components/home/FeaturesSection.jsx'));
const PricingSection = lazy(() => import('../components/home/PricingSection.jsx'));
const FooterSection = lazy(() => import('../components/home/FooterSection.jsx'));


function Loading() {
    return <p><i>Loading...</i></p>;
}

export default function Home() {    
    return (
        <div className="overflow-x-hidden">
            <Suspense fallback={<Loading />}>
                <Navbar/>
                <Header/>
                <InfoSection/>
                <PortalSection/>
                <PromptSection/>
                <FeaturesSection/>
                <PricingSection/>
                <FooterSection/>
            </Suspense>
            
        </div>
    )
}