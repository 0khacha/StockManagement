import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './AuthProvider.jsx';
import 'index.css';
import {SearchProvider} from "./components/Header/SearchContext.jsx";

ReactDOM.render(
    <AuthProvider>
        <SearchProvider>
        <App />
        </SearchProvider>
    </AuthProvider>,
    document.getElementById('root')
);
