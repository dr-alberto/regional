import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { PlansContextProvider } from "./context/PlansContext";
import { BrowserRouter } from "react-router-dom";
import "./services/i18n";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <PlansContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PlansContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);