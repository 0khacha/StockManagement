import React, { useState } from 'react';
import './assets/css/styles.css'; // Import your CSS file
import logo from '../logo.png'
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
import Dashboard from "../../pages/Dashboard/Dashboard";


function Sidebar() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [activeLink, setActiveLink] = useState(null);

    const toggleMenu = () => {
        setIsNavOpen(!isNavOpen);
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
            <Header/>
            <div className={`l-navbar ${isNavOpen ? "expander" : ""}`} id="navbar">
                <nav className="nav">
                    <div>
                        <div className="nav__brand">
                            <Menu className="nav__toggle" id="nav-toggle" onClick={toggleMenu} />
                            <a href="#" className="nav__logo"><img className={'logo-img'} src={logo} /></a>
                        </div>
                        <div className="nav__list">
                            <a href="../../pages/Dashboard/Dashboard.jsx"
                               className={`nav__link ${activeLink === "Dashboard" ? "active" : ""}`}
                               onClick={() => handleLinkClick("Dashboard")}>
                                <Home className="nav__icon"/>
                                <span className="nav__name">Dashboard</span>
                            </a>
                            <a href="#" className={`nav__link ${activeLink === "Messenger" ? "active" : ""}`}
                               onClick={() => handleLinkClick("Messenger")}>
                                <MessageSquare className="nav__icon"/>
                                <span className="nav__name">Messenger</span>
                            </a>
                            <a href="#" className={`nav__link ${activeLink === "Clients" ? "active" : ""}`}
                               onClick={() => handleLinkClick("Clients")}>
                                <Users className="nav__icon"/>
                                <span className="nav__name">Clients</span>
                            </a>
                            <a href="#" className={`nav__link ${activeLink === "Supplier" ? "active" : ""}`}
                               onClick={() => handleLinkClick("Supplier")}>
                                <Truck className="nav__icon"/>
                                <span className="nav__name">Supplier</span>
                            </a>
                            <div className="nav__link collapse">
                                <Folder className="nav__icon"/>
                                <span className="nav__name">Projects</span>

                                <ChevronDown className="collapse__link" onClick={toggleCollapse}/>

                                <ul className="collapse__menu">
                                    <li><a href="#" className="collapse__sublink">Data</a></li>
                                    <li><a href="#" className="collapse__sublink">Group</a></li>
                                    <li><a href="#" className="collapse__sublink">Members</a></li>
                                </ul>
                            </div>

                            <a href="#" className={`nav__link ${activeLink === "Analytics" ? "active" : ""}`}
                               onClick={() => handleLinkClick("Analytics")}>
                                <PieChart className="nav__icon"/>
                                <span className="nav__name">Analytics</span>
                            </a>
                            <div className="nav__link collapse">
                                <Users className="nav__icon"/>
                                <span className="nav__name">Team</span>

                                <ChevronDown className="collapse__link" onClick={toggleCollapse}/>

                                <ul className="collapse__menu">
                                    <li><a href="#" className="collapse__sublink">Data</a></li>
                                    <li><a href="#" className="collapse__sublink">Group</a></li>
                                    <li><a href="#" className="collapse__sublink">Members</a></li>
                                </ul>
                            </div>
                            <a href="#" className={`nav__link ${activeLink === "Settings" ? "active" : ""}`}
                               onClick={() => handleLinkClick("Settings")}>
                                <Settings className="nav__icon"/>
                                <span className="nav__name">Settings</span>
                            </a>
                        </div>
                    </div>

                    <a href="#" className="nav__link">
                        <LogOut className="nav__icon"/>
                        <span className="nav__name">Log Out</span>
                    </a>
                </nav>
            </div>
            <Dashboard/>
        </div>
    );
}

export default Sidebar;
