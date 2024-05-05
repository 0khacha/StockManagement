// In your main App.js or equivalent file

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import Dashboard from './pages/Dashboard/Dashboard';
import Client from './pages/Client';
import Header from './components/Header/Header';
import SuppliersList from "./components/Suppliers/SuppliersList";
import Supplier from "./components/Suppliers/Supplier";
import Orders from "./components/Orders/Orders";
import Article from "./components/Article/Article";
import Sales from "./components/Sales/Sales";



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
            </Routes>
        </Router>
    );
}

export default App;
