// App.js

import React, { useState } from 'react';
import '../../components/Login/styles.css';
import Login from '../../components/Login/Login';
import SignUp from '../../components/Login/Signup';
import logo from '../../components/images/logo.png';
import sideImage from '../../components/images/Beige Aesthetic Illustration Perfume Shop Logo.svg';

function App() {
    const [isLogin, setIsLogin] = useState(true);

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className="App">
            <div className="container">
                <div className="box">
                    <div className="image">
                        <img src={logo} alt="Stock Management" />
                    </div>
                    <div className="switch">
                        <button className={isLogin ? "active" : ""} onClick={toggleForm}>
                            {isLogin ? 'Sign Up' : 'Login'}
                        </button>
                        <button className={!isLogin ? "active" : ""} onClick={toggleForm}>
                            {isLogin ? 'Login' : 'Sign Up'}
                        </button>
                    </div>
                    {isLogin ? <Login /> : <SignUp />}
                    {/*<div className="side-image">*/}
                    {/*    <img src={sideImage} alt="Side Image" />*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>

    );
}

export default App;
