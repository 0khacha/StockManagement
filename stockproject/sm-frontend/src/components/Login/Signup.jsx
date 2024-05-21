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
    const [successMessage, setSuccessMessage] = useState(''); // New state variable for success message

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            // Validate inputs
            const validationErrors = {};
            for (const key in formData) {
                if (!formData[key].trim()) {
                    validationErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')} is required`;
                }
            }
            if (!/\S+@\S+\.\S+/.test(formData.email)) {
                validationErrors.email = 'Invalid email format';
            }
            if (formData.password !== formData.confirmPassword) {
                validationErrors.confirmPassword = 'Passwords do not match';
            }

            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                return;
            }

            // Hash the password
            const hashedPassword = sha512(formData.password);

            // Submit form data with hashed password
            await axios.post('http://127.0.0.1:8000/api/register', { ...formData, password: hashedPassword }); // Update the URL to match your Laravel API endpoint

            // Set success message
            setSuccessMessage('Sign up successful');

            // Clear form data after successful submission
            setFormData({
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
        } catch (error) {
            console.error('Error:', error);
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            }
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSignUp}>
                {successMessage && <div className="success-message">{successMessage}</div>}
                <div className="input-wrapper">
                    <input
                        className="login-input name"
                        type="text"
                        name="first_name"
                        placeholder="First name"
                        value={formData.first_name}
                        onChange={handleChange}
                    />
                    {errors.first_name && <div className="error-message">{errors.first_name}</div>}
                    <input
                        className="login-input name"
                        type="text"
                        name="last_name"
                        placeholder="Last name"
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
                        placeholder="Password"
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
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
                </div>
                {errors.server && <div className="error-message">{errors.server}</div>}
                <button type="submit" className="submit">
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default SignUp;
