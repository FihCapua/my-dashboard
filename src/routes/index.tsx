import React from "react";
import App from "./app.routes";
import AuthRoute from "./auth.routes";
import { BrowserRouter } from "react-router-dom";
import { useAuth } from "../hook/auth";

const Routes: React.FC = () => {
  const { logged } = useAuth();
  return (
    <BrowserRouter>
        {logged ? <App /> : <AuthRoute />}      
    </BrowserRouter>
  );
};

export default Routes;
