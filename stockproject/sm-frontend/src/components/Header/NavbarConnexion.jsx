import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, User, LogOut } from "react-feather";
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import profile from "../images/profile.png";
import Notification from "./Notification";

const NavbarConnexion = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
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


    return (
        <div className="navbarconnexion">
            <div className='connexion-container'>
                <Notification/>
                <div className={'connexion'}>
                    <div className="connexion-content">
                        <div className="user-info">
                            <img src={profile} id={'user-image'} alt='user-image'/>
                            <h5 className={'user'}>Mohamed Hicham</h5>
                        </div>
                        <div className="dropdown-container" ref={dropdownRef} onClick={toggleDropdown}>
                            {dropdownOpen ? (
                                <ChevronUp className='chevronUp-icon feather-icon'/>
                            ) : (
                                <ChevronDown className='chevronDown-icon feather-icon'/>
                            )}
                            <div className="dropdown-content" style={{display: dropdownOpen ? 'block' : 'none'}}>
                                <ul>
                                    <li>
                                        <Link to="settings" className="dropdown-item"> {/* Use Link instead of link */}
                                            <User className='user-icon feather-icon'/>
                                            <span className="item-name">Account</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/signup" className="dropdown-item"> {/* Use Link instead of link */}
                                            <LogOut className='logOut-icon feather-icon'/>
                                            <span className="item-name">Log out</span>
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
