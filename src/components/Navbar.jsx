import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';

import Header from "./Header/Header";
import Navbar from "./NavBar/Navbar";
import Dashboard from "../pages/Dashboard/Dashboard";


function App() {
    return (
        <Router>
            <div>
                <Header/>
                    <Navbar></Navbar>
                <Routes>
                    <Route exact path="../pages/Dashboard/Dashboard" component={Dashboard} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
