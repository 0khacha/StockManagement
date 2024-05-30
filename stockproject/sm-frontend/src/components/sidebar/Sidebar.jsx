import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importation de Link depuis react-router-dom
import './styles.css'; // Importation de votre fichier CSS
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
    ShoppingBag, // Nouvelle icône pour les commandes
    FileText, // Nouvelle icône pour les articles
    Archive, // Nouvelle icône pour le stock
    DollarSign // Nouvelle icône pour les ventes
} from 'react-feather';
import Header from "../Header/Header";
import { useAuth } from "../../AuthProvider.jsx";


function Sidebar() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [activeLink, setActiveLink] = useState("Dashboard"); // Définir le Dashboard comme actif par défaut
    const { logout } = useAuth(); // Accéder à la fonction de déconnexion depuis useAuth
    const navigate = useNavigate(); // Utiliser le hook navigate pour la redirection


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
    const handleLogout = async () => {
        try {
            await logout(); // Appeler la fonction de déconnexion
            navigate('/login'); // Rediriger vers la page de connexion après la déconnexion
        } catch (error) {
            console.error('Erreur de déconnexion :', error);
        }
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
                                <span className="nav__name">Tableau de bord</span>
                            </Link>
                            {/*<Link to="/messenger" className={`nav__link ${activeLink === "Messenger" ? "active" : ""}`} onClick={() => handleLinkClick("Messenger")}>*/}
                            {/*    <MessageSquare className="nav__icon" />*/}
                            {/*    <span className="nav__name">Messagerie</span>*/}
                            {/*</Link>*/}
                            <Link to="/client" className={`nav__link ${activeLink === "Clients" ? "active" : ""}`} onClick={() => handleLinkClick("Clients")}>
                                <Users className="nav__icon" />
                                <span className="nav__name">Clients</span>
                            </Link>
                            <Link to="/supplier" className={`nav__link ${activeLink === "Fournisseurs" ? "active" : ""}`} onClick={() => handleLinkClick("Fournisseurs")}>
                                <Truck className="nav__icon" />
                                <span className="nav__name">Fournisseurs</span>
                            </Link>
                            <Link to="/orders" className={`nav__link ${activeLink === "Commandes" ? "active" : ""}`} onClick={() => handleLinkClick("Commandes")}>
                                <ShoppingBag className="nav__icon" />
                                <span className="nav__name">Commandes</span>
                            </Link>
                            <Link to="/articles" className={`nav__link ${activeLink === "Articles" ? "active" : ""}`} onClick={() => handleLinkClick("Articles")}>
                                <FileText className="nav__icon" />
                                <span className="nav__name">Articles</span>
                            </Link>
                            <Link to="/sales" className={`nav__link ${activeLink === "Ventes" ? "active" : ""}`} onClick={() => handleLinkClick("Ventes")}>
                                <DollarSign className="nav__icon" />
                                <span className="nav__name">Ventes</span>
                            </Link>
                            <Link to="/stock" className={`nav__link ${activeLink === "Stock" ? "active" : ""}`} onClick={() => handleLinkClick("Stock")}>
                                <Archive className="nav__icon" />
                                <span className="nav__name">Stock</span>
                            </Link>
                            <div className="nav__link collapse">
                                <Users className="nav__icon" />
                                <span className="nav__name">Équipe</span>
                                <ChevronDown className="collapse__link" onClick={toggleCollapse} />
                                <ul className="collapse__menu">
                                    <li><a href="#" className="collapse__sublink">Données</a></li>
                                    <li><a href="#" className="collapse__sublink">Groupe</a></li>
                                    <li><a href="#" className="collapse__sublink">Membres</a></li>
                                </ul>
                            </div>
                            <Link to="/settings" className={`nav__link ${activeLink === "Paramètres" ? "active" : ""}`} onClick={() => handleLinkClick("Paramètres")}>
                                <Settings className="nav__icon" />
                                <span className="nav__name">Paramètres</span>
                            </Link>
                        </div>
                    </div>
                    <Link to="/logout" className="nav__link" onClick={handleLogout}>
                        <LogOut className="nav__icon" />
                        <span className="nav__name">Déconnexion</span>
                    </Link>
                </nav>
            </div>
        </div>
    );
}

export default Sidebar;
