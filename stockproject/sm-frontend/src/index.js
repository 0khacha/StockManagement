import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import reportWebVitals from './reportWebVitals.js';
import Settings from "./components/Settings/GeneralSettings"
import App from "./app.js";
import Login from "./pages/Login/Login";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);


reportWebVitals();
