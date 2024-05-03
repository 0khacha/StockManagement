// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter, Routes, and Route
import Sidebar from './components/sidebar/Sidebar';
import Dashboard from './pages/Dashboard/Dashboard';
import Header from "./components/Header/Header";

function App() {
    return (
        <Router>
            <Sidebar />
            <Header />
            <Routes>
                <Route path="/" element={<Dashboard />} /> {/* Use path="/" instead of exact path="/" */}
                {/* Add more routes here if needed */}
            </Routes>
        </Router>
    );
}

export default App;
