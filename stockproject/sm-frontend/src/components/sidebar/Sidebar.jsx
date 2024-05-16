import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './styles.css'; // Import your CSS file
import logo from '../images/logo.png';
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
    ShoppingBag, // New icon for Orders
    FileText, // New icon for Articles
    Archive, // New icon for Stock
    DollarSign // New icon for Sales
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
                            {/*<Link to="/messenger" className={`nav__link ${activeLink === "Messenger" ? "active" : ""}`} onClick={() => handleLinkClick("Messenger")}>*/}
                            {/*    <MessageSquare className="nav__icon" />*/}
                            {/*    <span className="nav__name">Messenger</span>*/}
                            {/*</Link>*/}
                            <Link to="/client" className={`nav__link ${activeLink === "Clients" ? "active" : ""}`} onClick={() => handleLinkClick("Clients")}>
                                <Users className="nav__icon" />
                                <span className="nav__name">Clients</span>
                            </Link>
                            <Link to="/supplier" className={`nav__link ${activeLink === "Supplier" ? "active" : ""}`} onClick={() => handleLinkClick("Supplier")}>
                                <Truck className="nav__icon" />
                                <span className="nav__name">Supplier</span>
                            </Link>
                            <Link to="/orders" className={`nav__link ${activeLink === "Orders" ? "active" : ""}`} onClick={() => handleLinkClick("Orders")}>
                                <ShoppingBag className="nav__icon" />
                                <span className="nav__name">Orders</span>
                            </Link>
                            <Link to="/articles" className={`nav__link ${activeLink === "Articles" ? "active" : ""}`} onClick={() => handleLinkClick("Articles")}>
                                <FileText className="nav__icon" />
                                <span className="nav__name">Articles</span>
                            </Link>
                            <Link to="/sales" className={`nav__link ${activeLink === "Sales" ? "active" : ""}`} onClick={() => handleLinkClick("Sales")}>
                                <DollarSign className="nav__icon" />
                                <span className="nav__name">Sales</span>
                            </Link>
                            <Link to="/stock" className={`nav__link ${activeLink === "Stock" ? "active" : ""}`} onClick={() => handleLinkClick("Stock")}>
                                <Archive className="nav__icon" />
                                <span className="nav__name">Stock</span>
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
