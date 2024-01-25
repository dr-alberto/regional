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
import Form from './pages/Form';
import UserPortal from './pages/UserPortal';
import UserPortalPreview from './pages/UserPortalPreview';
import Users from './pages/Users';
import PortalUsers from './pages/PortalUsers';
import Docs from './pages/Docs';
import NotFound from './pages/NotFound';
import PaymentSuccess from './pages/PaymentSuccess';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
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
                <Route element={!user ? <Login /> : <Navigate to="/dashboard"/>} exact path="/login"/>
                <Route element={!user ? <Signup /> : <Navigate to="/dashboard"/>} exact path="/register"/>
                
                
                {/* Auth pages */}
                {/* CHeck user is verified to redirect */}
                <Route element={user ? <VerifyEmail /> : <Navigate to="/login"/>} exact path="/verify"/>
                <Route element={user ? <ResetEmail /> : <Navigate to="/login"/>} exact path="/reset"/>
                
                <Route element={user ? <Dashboard /> : <Navigate to="/login"/>} exact path="/dashboard"/>
                <Route element={user ? <Settings /> : <Navigate to="/login"/>} exact path="/settings"/>
                <Route element={user ? <Billing /> : <Navigate to="/login"/>} exact path="/billing"/>
                <Route element={user ? <PaymentSuccess /> : <Navigate to="/login"/>} exact path="/success"/>
                <Route element={user ? <Form /> : <Navigate to="/login"/>} exact path="/forms/:id"/>
                <Route element={user ? <Users /> : <Navigate to="/login"/>} exact path="/users"/>
                <Route element={user ? <PortalUsers /> : <Navigate to="/login"/>} exact path="/users/:portalId"/>

                {/* https://stackoverflow.com/questions/36052604/how-to-let-react-router-respond-with-404-status-code */}

                {/* Limit request to live form to user specified domains */}
                <Route element={<UserPortalPreview />} exact path="/test/:id"/>
                <Route element={<UserPortal />} exact path="/live/:id"/>

                <Route path='*' element={<NotFound />}/>

            </Routes>
        {/* ) */}

        

        </>
    )
}

export default App;
