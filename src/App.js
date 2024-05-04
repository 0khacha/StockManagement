// In your main App.js or equivalent file

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import Dashboard from './pages/Dashboard/Dashboard';
import Client from './pages/Client';
import Header from './components/Header/Header';



function App() {
    return (
        <Router>
            <Sidebar/>
            <Header/>
            <Routes>
                <Route  path="/" element={<Dashboard />} />
                <Route  path="/client" element={<Client />} />
            </Routes>
        </Router>
    );
}

export default App;
