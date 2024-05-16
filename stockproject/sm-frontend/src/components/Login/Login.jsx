import React, { useState } from 'react';
import axios from 'axios';
import { sha512 } from 'js-sha512';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        // Hash the password using SHA-512
        const hashedPassword = sha512(password); // Correct usage

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                email,
                password: hashedPassword,
            });
            // Check if login was successful
            if (response.status === 200) {
                // // window.location.href = '/';
                console.log(response.data.user.id);
            } else {
                setError('Login failed');
            }
            // Handle successful login (e.g., redirect, store token, etc.)
            console.log('Login successful:', response.data);

        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data.error || 'Login failed');
            } else {
                setError('An error occurred');
            }
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h2>Login</h2>
            {error && <div className="error">{error}</div>}
            <input
                className="login-input"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                className="login-input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit" className="submit">Login</button>
        </form>
    );
};

export default Login;
