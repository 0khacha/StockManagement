// components/SignUp.js

import React, { useState } from 'react';

const SignUp = () => {
    const [firstname,setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignUp = (e) => {
        e.preventDefault();
        // Add your sign-up logic here
    };

    return (
        <form onSubmit={handleSignUp}>
            <h2>Sign Up</h2>
            <div className="input-wrapper">
                <input className={'login-input name'}
                    type="text"
                    placeholder="First name"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                />
                <input className={'login-input name'}
                    type="text"
                    placeholder="Last name"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}

                />
            </div>
            <div className="input-wrapper">
                <input className={'login-input email'}
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="input-wrapper">
                <input className={'login-input'}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}

                />
            </div>
            <div className="input-wrapper">
                <input className={'login-input'}
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className={'submit'}>
                Sign Up
            </button>
        </form>
    );
};

export default SignUp;
