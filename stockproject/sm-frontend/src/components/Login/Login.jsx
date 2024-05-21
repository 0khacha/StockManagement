import React, { useState } from 'react';
import {useAuth} from "../../AuthProvider.jsx";


const Login = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        try {
            const token = await login(email, password);
            console.log('Login successful, token:', token);

            // Optionally, you can perform navigation or other actions here after successful login
        } catch (err) {
            setError('Login failed');
            console.error('Login error:', err);
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
