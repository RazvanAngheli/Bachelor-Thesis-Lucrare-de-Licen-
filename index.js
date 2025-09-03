import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AutentificareProvider } from './context/AutentificareContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AutentificareProvider>
      <App />
    </AutentificareProvider>
  </React.StrictMode>
);