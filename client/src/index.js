import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { OrganizationContextProvider } from "./context/OrganizationContext";
import { BrowserRouter } from "react-router-dom";
import "./services/i18n";


ReactDOM.render(
    <React.StrictMode>
        <AuthContextProvider>
            <OrganizationContextProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </OrganizationContextProvider>
        </AuthContextProvider>
    </React.StrictMode>,
    document.getElementById("root")
);