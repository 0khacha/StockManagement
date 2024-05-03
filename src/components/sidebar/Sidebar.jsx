import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './assets/css/styles.css'; // Import your CSS file
import logo from '../logo.png';
import {
    Menu,
    Home,
    MessageSquare,
    Folder,
    ChevronDown,
    PieChart,
    Users,
    Settings,
    LogOut,
    Truck,
} from 'react-feather';
import Header from "../Header/Header";


function Sidebar() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [activeLink, setActiveLink] = useState("Dashboard"); // Set Dashboard as active by default


    const toggleMenu = () => {
        setIsNavOpen(!isNavOpen);
        document.body.classList.toggle("sidebar-open");
    };

    const handleLinkClick = (name) => {
        setActiveLink(name);
    };

    const toggleCollapse = (e) => {
        e.currentTarget.nextSibling.classList.toggle('showCollapse');
        e.currentTarget.classList.toggle('rotate');
    };

    return (
        <div id="body-pd" className={isNavOpen ? "body-pd" : ""}>
            <div className={`l-navbar ${isNavOpen ? "expander" : ""}`} id="navbar">
                <nav className="nav">
                    <div>
                        <div className="nav__brand">
                            <Menu className="nav__toggle" id="nav-toggle" onClick={toggleMenu} />
                            <Link to="/" className="nav__logo"><img className={'logo-img'} src={logo} alt="Logo" /></Link>
                        </div>
                        <div className="nav__list">
                            <Link to="/" className={`nav__link ${activeLink === "Dashboard" ? "active" : ""}`} onClick={() => handleLinkClick("Dashboard")}>
                                <Home className="nav__icon" />
                                <span className="nav__name">Dashboard</span>
                            </Link>
                            <Link to="/messenger" className={`nav__link ${activeLink === "Messenger" ? "active" : ""}`} onClick={() => handleLinkClick("Messenger")}>
                                <MessageSquare className="nav__icon" />
                                <span className="nav__name">Messenger</span>
                            </Link>
                            <Link to="/clients" className={`nav__link ${activeLink === "Clients" ? "active" : ""}`} onClick={() => handleLinkClick("Clients")}>
                                <Users className="nav__icon" />
                                <span className="nav__name">Clients</span>
                            </Link>
                            <Link to="/supplier" className={`nav__link ${activeLink === "Supplier" ? "active" : ""}`} onClick={() => handleLinkClick("Supplier")}>
                                <Truck className="nav__icon" />
                                <span className="nav__name">Supplier</span>
                            </Link>
                            <div className="nav__link collapse">
                                <Folder className="nav__icon" />
                                <span className="nav__name">Projects</span>
                                <ChevronDown className="collapse__link" onClick={toggleCollapse} />
                                <ul className="collapse__menu">
                                    <li><a href="#" className="collapse__sublink">Data</a></li>
                                    <li><a href="#" className="collapse__sublink">Group</a></li>
                                    <li><a href="#" className="collapse__sublink">Members</a></li>
                                </ul>
                            </div>
                            <Link to="/analytics" className={`nav__link ${activeLink === "Analytics" ? "active" : ""}`} onClick={() => handleLinkClick("Analytics")}>
                                <PieChart className="nav__icon" />
                                <span className="nav__name">Analytics</span>
                            </Link>
                            <div className="nav__link collapse">
                                <Users className="nav__icon" />
                                <span className="nav__name">Team</span>
                                <ChevronDown className="collapse__link" onClick={toggleCollapse} />
                                <ul className="collapse__menu">
                                    <li><a href="#" className="collapse__sublink">Data</a></li>
                                    <li><a href="#" className="collapse__sublink">Group</a></li>
                                    <li><a href="#" className="collapse__sublink">Members</a></li>
                                </ul>
                            </div>
                            <Link to="/settings" className={`nav__link ${activeLink === "Settings" ? "active" : ""}`} onClick={() => handleLinkClick("Settings")}>
                                <Settings className="nav__icon" />
                                <span className="nav__name">Settings</span>
                            </Link>
                        </div>
                    </div>
                    <Link to="/logout" className="nav__link">
                        <LogOut className="nav__icon" />
                        <span className="nav__name">Log Out</span>
                    </Link>
                </nav>
            </div>
        </div>
    );
}

export default Sidebar;
