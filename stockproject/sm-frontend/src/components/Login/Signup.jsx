import React, { useState } from 'react';
import axios from 'axios';
import { sha512 } from 'js-sha512';

const SignUp = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState(''); // Nouvelle variable d'état pour le message de réussite

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            // Valider les entrées
            const validationErrors = {};
            for (const key in formData) {
                if (!formData[key].trim()) {
                    validationErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')} est requis`;
                }
            }
            if (!/\S+@\S+\.\S+/.test(formData.email)) {
                validationErrors.email = 'Format d\'email invalide';
            }
            if (formData.password !== formData.confirmPassword) {
                validationErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
            }

            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                return;
            }

            // Hasher le mot de passe
            const hashedPassword = sha512(formData.password);

            // Soumettre les données du formulaire avec le mot de passe hashé
            await axios.post('http://127.0.0.1:8000/api/register', { ...formData, password: hashedPassword }); // Mettre à jour l'URL pour correspondre à votre point d'API Laravel

            // Définir le message de succès
            setSuccessMessage('Inscription réussie');

            // Effacer les données du formulaire après soumission réussie
            setFormData({
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
        } catch (error) {
            console.error('Erreur :', error);
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            }
        }
    };

    return (
        <div>
            <h2>S'inscrire</h2>
            <form onSubmit={handleSignUp}>
                {successMessage && <div className="success-message">{successMessage}</div>}
                <div className="input-wrapper">
                    <input
                        className="login-input name"
                        type="text"
                        name="first_name"
                        placeholder="Prénom"
                        value={formData.first_name}
                        onChange={handleChange}
                    />
                    {errors.first_name && <div className="error-message">{errors.first_name}</div>}
                    <input
                        className="login-input name"
                        type="text"
                        name="last_name"
                        placeholder="Nom de famille"
                        value={formData.last_name}
                        onChange={handleChange}
                    />
                    {errors.last_name && <div className="error-message">{errors.last_name}</div>}
                </div>
                <div className="input-wrapper">
                    <input
                        className="login-input email"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <div className="error-message">{errors.email}</div>}
                </div>
                <div className="input-wrapper">
                    <input
                        className="login-input"
                        type="password"
                        name="password"
                        placeholder="Mot de passe"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <div className="error-message">{errors.password}</div>}
                </div>
                <div className="input-wrapper">
                    <input
                        className="login-input"
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirmer le mot de passe"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
                </div>
                {errors.server && <div className="error-message">{errors.server}</div>}
                <button type="submit" className="submit">
                    S'inscrire
                </button>
            </form>
        </div>
    );
};

export default SignUp;