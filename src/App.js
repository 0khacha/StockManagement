// In your main App.js or equivalent file

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {
    return (
        <Router>
            <Sidebar />
            <Routes>
                <Route exact path="/" component={Dashboard} />
                {/* Add more routes here if needed */}
            </Routes>
        </Router>
    );
}

export default App;
