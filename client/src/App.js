import './assets/output.css';
import React, { useEffect, useState, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from './hooks/useAuthContext';
import Home from './pages/Home';
import Signup from "./pages/Signup";
import VerifyEmail from './pages/VerifyEmail';
import ResetEmail from './pages/ResetEmail';
import Login from "./pages/Login";
import Settings from "./pages/Settings"
import Dashboard from './pages/Dashboard';
import Billing from './pages/Billing';
import { EditPortal } from './pages/EditPortal';
import Portal from './pages/Portal';
import PortalPreview from './pages/PortalPreview';
import Users from './pages/Users';
import PortalUsers from './pages/PortalUsers';
import SiteUsers from './pages/SiteUsers';
import Docs from './pages/Docs';
import NotFound from './pages/NotFound';
import PaymentSuccess from './pages/PaymentSuccess';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Demo from './pages/Demo';
import Site from './pages/Site';
import Prompt from './components/Prompt';
import { EditPrompt } from './pages/EditPrompt';
// TODO
// Add docs: https://docusaurus.io/


function App() {
    const { user } = useAuthContext()
    const [ subDomain, setSubDomain] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const host = window.location.host

        const arr = host
                .split('.')
                .slice(0, host.includes('localhost') ? -1: -2)
        if (arr.length > 0) setSubDomain(arr[0])
        setLoading(false)
    }, []) 

    // window.Prompt = Prompt
    ///////////////
    // https://stackoverflow.com/questions/61884567/subdomain-routing-in-react-and-react-router
    ///////////////

    return !loading && (
        
        <>
        {/* { subDomain === 'docs'} ? (
            <Routes>
                <Route element={<Docs />} exact path="/"/>
            </Routes>
        ) : ( */}
            <Routes>
                <Route element={<Home />} exact path="/"/>
                <Route element={<Privacy />} exact path="/privacy"/>
                <Route element={<Terms />} exact path="/terms"/>
                <Route element={<Demo />} exact path="/demo"/>

                <Route element={!user ? <Login /> : <Navigate to="/dashboard"/>} exact path="/login"/>
                <Route element={!user ? <Signup /> : <Navigate to="/dashboard"/>} exact path="/register"/>

                {/* <Route element={user ? <VerifyEmail /> : <Navigate to="/login"/>} exact path="/verify"/>
                <Route element={user ? <ResetEmail /> : <Navigate to="/login"/>} exact path="/reset"/> */}

                <Route element={user ? <Dashboard /> : <Navigate to="/login"/>} exact path="/dashboard"/>
                <Route element={user ? <Site /> : <Navigate to="/login"/>} exact path="/sites/:siteId"/>
                <Route element={user ? <Settings /> : <Navigate to="/login"/>} exact path="/settings"/>
                <Route element={user ? <Billing /> : <Navigate to="/login"/>} exact path="/billing"/>
                <Route element={user ? <PaymentSuccess /> : <Navigate to="/login"/>} exact path="/success"/>
                <Route element={user ? <EditPortal /> : <Navigate to="/login"/>} exact path="/portals/:id"/>
                <Route element={user ? <EditPrompt /> : <Navigate to="/login"/>} exact path="/prompts/:id"/>

                <Route element={user ? <Users /> : <Navigate to="/login"/>} exact path="/users"/>
                <Route element={user ? <SiteUsers /> : <Navigate to="/login"/>} exact path="/users/:siteId"/>
                <Route element={user ? <PortalUsers /> : <Navigate to="/login"/>} exact path="/users/:siteId/:portalId"/>

                <Route element={<PortalPreview />} exact path="/test/:id"/>
                <Route element={<Portal />} exact path="/live/:id"/>
                <Route path='*' element={<NotFound />}/>
            </Routes>
        {/* ) */}

        

        </>
    )
}

export default App;
