import React from 'react';
import App from './app.routes';
import AuthRoute from './auth.routes';
import { BrowserRouter } from 'react-router-dom';

const Routes: React.FC = () => (
        <BrowserRouter>
                {/* <App /> */}
                <AuthRoute />
        </BrowserRouter>
)

export default Routes