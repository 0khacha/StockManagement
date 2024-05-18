import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { sha512 } from 'js-sha512';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => !!window.localStorage.getItem('token'));
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const userData = await getUserData(token);
                    setUser(userData);
                }
            } catch (error) {
                console.error('Failed to fetch user details', error);
            }
        };

        fetchUserDetails();
    }, []);

    const getUserData = async (token) => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/user', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Failed to fetch user data', error);
            throw error;
        }
    };

    const login = async (email, password) => {
        try {
            const hashedPassword = sha512(password);
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                email,
                password: hashedPassword,
            });
            if (response.status === 200) {
                const token = response.data.token;
                setIsLoggedIn(true);
                window.localStorage.setItem('token', token);
                const userData = await getUserData(token);
                setUser(userData);
                return token;
            } else {
                throw new Error('Login failed');
            }
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            const token = window.localStorage.getItem('token');
            if (token) {
                await axios.post('http://127.0.0.1:8000/api/logout', null, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log('Logged out successfully');
            }
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setIsLoggedIn(false);
            setUser(null);
            window.localStorage.removeItem('token');
        }
    };

    const updateUser = async (userData) => {
        try {
            const token = window.localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }
            const response = await axios.put('http://127.0.0.1:8000/api/user', userData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                setUser(response.data.user);
                console.log('User data updated successfully');
            } else {
                throw new Error('Failed to update user data');
            }
        } catch (error) {
            console.error('Failed to update user data', error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout, getUserData, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export let useAuth;
useAuth = () => useContext(AuthContext);
