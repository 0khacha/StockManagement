import React, { useState } from 'react';
import { useAuth } from "../../AuthProvider.jsx";

const Login = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 6; // Minimum length of password
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setEmailError('');
        setPasswordError('');

        if (!email || !password) {
            setError('Tous les champs sont requis.');
            return;
        }

        if (!validateEmail(email)) {
            setEmailError('Veuillez saisir une adresse e-mail valide.');
            return;
        }



        try {
            const token = await login(email, password);
            console.log('Connexion réussie, jeton :', token);
            // Navigate or perform other actions upon successful login
        } catch (err) {
            setError('Identifiants incorrects.');
            console.error('Erreur de connexion :', err);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h2>Connexion</h2>
            {error && <div className="error-message">{error}</div>}
            <input
                className="login-input"
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}

            />
            {emailError && <div className="error-message">{emailError}</div>}
            <input
                className="login-input"
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}

            />

            <button type="submit" className="submit">Connexion</button>
        </form>
    );
};

export default Login;
