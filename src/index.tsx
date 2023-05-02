import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/GlobalStyles.ts';
import App from './App';
import { ThemeContextProvider } from './hook/theme';
import { AuthProvider } from './hook/auth';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);
