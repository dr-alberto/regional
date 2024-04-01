import "./assets/output.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";
import Billing from "./pages/Billing";
import { EditPortal } from "./pages/EditPortal";
import Portal from "./pages/Portal";
import ViewPortal from "./pages/ViewPortal";
import PortalPreview from "./pages/PortalPreview";
import Users from "./pages/Users";
import NotFound from "./pages/NotFound";
import PaymentSuccess from "./pages/PaymentSuccess";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Demo from "./pages/Demo";
import Site from "./pages/Site";
import { EditPrompt } from "./pages/EditPrompt";

function App() {
  const { user } = useAuthContext();

  return (
    <>
      <Routes>
        <Route element={<Home />} exact path="/" />
        <Route element={<Privacy />} exact path="/privacy" />
        <Route element={<Terms />} exact path="/terms" />
        <Route element={<Demo />} exact path="/demo" />

        <Route
          element={!user ? <Login /> : <Navigate to="/dashboard" />}
          exact
          path="/login"
        />
        <Route
          element={!user ? <Signup /> : <Navigate to="/dashboard" />}
          exact
          path="/register"
        />
        <Route
          element={user ? <Dashboard /> : <Navigate to="/login" />}
          exact
          path="/dashboard"
        />
        <Route
          element={user ? <Site /> : <Navigate to="/login" />}
          exact
          path="/sites/:siteId"
        />
        <Route
          element={user ? <Settings /> : <Navigate to="/login" />}
          exact
          path="/settings"
        />
        <Route
          element={user ? <Billing /> : <Navigate to="/login" />}
          exact
          path="/billing"
        />
        <Route
          element={user ? <PaymentSuccess /> : <Navigate to="/login" />}
          exact
          path="/success"
        />
        <Route
          element={user ? <ViewPortal /> : <Navigate to="/login" />}
          exact
          path="/portals/:id"
        />
        <Route
          element={user ? <EditPortal /> : <Navigate to="/login" />}
          exact
          path="/portals/:id/edit"
        />
        <Route
          element={user ? <EditPrompt /> : <Navigate to="/login" />}
          exact
          path="/prompts/:id/edit"
        />
        <Route
          element={user ? <Users /> : <Navigate to="/login" />}
          exact
          path="/users/:siteId?/:portalId?"
        />
        <Route element={<PortalPreview />} exact path="/test/:id" />
        <Route element={<Portal />} exact path="/live/:id" />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;