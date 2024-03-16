import Navbar from '../components/home/Navbar.jsx';
import Header from '../components/home/Header.jsx';
import InfoSection from '../components/home/InfoSection.jsx';
import PortalSection from '../components/home/PortalSection.jsx';
import PromptSection from '../components/home/PromptSection.jsx';
import FeaturesSection from '../components/home/FeaturesSection.jsx';
import PricingSection from '../components/home/PricingSection.jsx';
import FooterSection from '../components/home/FooterSection.jsx';
import IntegrationSection from '../components/home/IntegrationSection.jsx';


export default function Home() {
    return (
        <div className="overflow-x-hidden">
            <Navbar />
            <Header />
            <InfoSection />
            <PortalSection />
            <IntegrationSection />
            <PromptSection />
            <FeaturesSection />
            <PricingSection />
            <FooterSection />
        </div>
    );
}
