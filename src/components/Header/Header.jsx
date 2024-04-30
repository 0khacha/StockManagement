import { Search, Bell } from 'react-feather';
import '../css/header.css';
import NavbarSearch from "./navbarSearch";
import NavbarConnexion from "./NavbarConnexion";

export default function Header() {

    return (
        <header className="header">
            <NavbarSearch />
            <NavbarConnexion/>
        </header>
    );
}
