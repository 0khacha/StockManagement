import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import Dashboard from './pages/Dashboard/Dashboard';
import Client from './pages/Client/Client';
import Header from './components/Header/Header';
import Supplier from "./components/Suppliers/Supplier";
import Orders from "./components/Orders/Orders";
import Article from "./components/Article/Article";
import Sales from "./components/Sales/Sales";
import Stock from "./pages/Stock/Stock";
import Settings from './pages/Settings/Settings';
import Login from "./pages/Login/Login";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        <Router>
            {isLoggedIn && <Sidebar />}
            {isLoggedIn && <Header onLogout={handleLogout} />}
            <Routes>
                {isLoggedIn ? (
                    <>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/client" element={<Client />} />
                        <Route path="/supplier" element={<Supplier />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/articles" element={<Article />} />
                        <Route path="/sales" element={<Sales />} />
                        <Route path="/stock" element={<Stock />} />
                        <Route path="/settings" element={<Settings />} />
                    </>
                ) : (
                    <Route path="/" element={<Navigate to="/signup" />} />
                )}
                <Route path="/signup" element={<Login onLogin={handleLogin} />} />
            </Routes>
        </Router>
    );
}

export default App;
