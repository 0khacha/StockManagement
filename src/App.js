// In your main App.js or equivalent file

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import Dashboard from './pages/Dashboard/Dashboard';
import Client from './pages/Client/Client';
import Header from './components/Header/Header';
import Supplier from "./components/Suppliers/Supplier";
import Orders from "./components/Orders/Orders";
import Article from "./components/Article/Article";
import Sales from "./components/Sales/Sales";
import Stock from "./pages/Stock/Stock";
import Settings from './pages/Settings/Settings'


function App() {
    return (
        <Router>
            <Sidebar/>
            <Header/>
            <Routes>
                <Route  path="/" element={<Dashboard />} />
                <Route  path="/client" element={<Client />} />
                <Route  path="/supplier" element={<Supplier />} />
                <Route  path="/orders" element={<Orders/>} />
                <Route  path="/articles" element={<Article/>} />
                <Route  path="/sales" element={<Sales/>} />
                <Route  path="/stock" element={<Stock/>} />
                <Route  path="/settings" element={<Settings/>} />
            </Routes>
        </Router>
    );
}

export default App;
