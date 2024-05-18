import React, { useEffect, useState } from 'react';
import './GeneralSettings.css';
import userimg from '../images/user.png';
import { useAuth } from '../../AuthProvider.jsx';
import axios from 'axios';

const GeneralSettings = () => {
    const { user, updateUser, token } = useAuth();
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '', // Consider omitting password field here for security reasons
    });

    useEffect(() => {
        if (user) {
            setFormData({
                first_name: user.first_name || '',
                last_name: user.last_name || '',
                email: user.email || '',
                phone: user.phone || '',
                password: '', // Leave password empty for security reasons
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUser(formData);
            alert('User data updated successfully');
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    return (
        <div className='setting-page-profile'>
            <section className='profile-details-section'>
                <h2>Profile Details</h2>
                <div className='photo-section'>
                    <div className='image'>
                        <img src={userimg} alt="user" />
                    </div>
                    <button>Upload profile Photo</button>
                    <button>Remove</button>
                </div>
                <div className='user-email'>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="first_name">First Name</label>
                        <input
                            type="text"
                            id='first_name'
                            name='first_name'
                            value={formData.first_name}
                            onChange={handleChange}
                        />
                        <label htmlFor="last_name">Last Name</label>
                        <input
                            type="text"
                            id='last_name'
                            name='last_name'
                            value={formData.last_name}
                            onChange={handleChange}
                        />
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id='email'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <label htmlFor="phone">Phone</label>
                        <input
                            type="text"
                            id='phone'
                            name='phone'
                            value={formData.phone}
                            onChange={handleChange}
                        />
                        <button type="submit">Update</button>
                    </form>
                </div>
            </section>
            <section className='section-second-box'>
                <section className='password-section'>
                    <h2>Change Password</h2>
                    <p>To change your password, please enter your current password and your new password below.</p>
                    <button>Change Password</button>
                </section>
                <section className='delete-account-section'>
                    <h2>Delete Account</h2>
                    <p>If you would like to delete your account, please click the button below.</p>
                    <button>Delete Account</button>
                </section>
            </section>
        </div>
    );
};

export default GeneralSettings;
