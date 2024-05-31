import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import Dashboard from './pages/Dashboard/Dashboard';
import Client from './pages/Client/Client';
import Header from './components/Header/Header';
import Supplier from './components/Suppliers/Supplier';
import Orders from './components/Orders/Orders';
import Article from './components/Article/Article';
import Sales from './components/Sales/Sales';
import Stock from './pages/Stock/Stock';
import Settings from './pages/Settings/Settings';
import Login from './pages/Login/Login';
import { AuthProvider, useAuth } from "./AuthProvider.jsx";
import {SearchProvider} from "./components/Header/SearchContext.jsx";


function App() {
    return (
        <AuthProvider>
            <Router>
                <SearchProvider>
                    <AppRoutes />
                </SearchProvider>
            </Router>
        </AuthProvider>
    );
}

const AppRoutes = () => {
    const { isLoggedIn } = useAuth();

    return (
        <>
            {isLoggedIn && <Sidebar />}
            {isLoggedIn && <Header />}
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
                        <Route path="/login" element={<Navigate to="/" />} />
                    </>
                ) : (
                    <>
                        <Route path="/login" element={<Login />} />
                        <Route path="*" element={<Navigate to="/login" />} />
                    </>
                )}
            </Routes>
        </>
    );
};

export default App;
