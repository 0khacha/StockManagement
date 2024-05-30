import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, User, LogOut } from "react-feather";
import { Link } from 'react-router-dom';
import Notification from "./Notification";
import userimg from '../images/userimg.jpg'

import { useAuth } from './../../AuthProvider.jsx';

const NavbarConnexion = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { user, logout } = useAuth();

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    const handleLogout = async () => {
        try {
            await logout();
            window.location.href = '/login';
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <div className="navbarconnexion">
            <div className='connexion-container'>
                <Notification />
                <div className={'connexion'}>
                    <div className="connexion-content">
                        <div className="user-info">
                            {/* Display user image */}
                            <img src={user ? user.image : userimg} id={'user-image'} alt='user' />
                            <h5 className={'user'}>{user ? `${user.first_name} ${user.last_name}` : ''}</h5>
                        </div>
                        <div className="dropdown-container" ref={dropdownRef} onClick={toggleDropdown}>
                            {dropdownOpen ? (
                                <ChevronUp className='chevronUp-icon feather-icon' />
                            ) : (
                                <ChevronDown className='chevronDown-icon feather-icon' />
                            )}
                            <div className="dropdown-content" style={{ display: dropdownOpen ? 'block' : 'none' }}>
                                <ul>
                                    <li>
                                        <Link to="settings" className="dropdown-item">
                                            <User className='user-icon feather-icon' />
                                            <span className="item-name">Compte</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/logout" onClick={handleLogout} className="dropdown-item">
                                            <LogOut className='logOut-icon feather-icon' />
                                            <span className="item-name">Déconnexion</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavbarConnexion;
