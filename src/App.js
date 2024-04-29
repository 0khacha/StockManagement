import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';

function App() {
    return (
        <Router>
            <div>
                <Navbar />
                    <Route path="/" exact component={Home} />

            </div>
        </Router>
    );
}

export default App;
