import {Link} from "react-router-dom";
import {
    faBox,
    faCog,
    faDollarSign,
    faHome,
    faNewspaper, faShoppingCart,
    faSignOutAlt,
    faTruck,
    faUsers
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Navbar()
{
    return(
        <nav>
            <img src={'/logo.png'} id='logo' alt='logo'/>
            <ul>
                <li><Link to="/"><FontAwesomeIcon icon={faHome} /> Dashboard</Link></li>
                <li><Link to="/client"><FontAwesomeIcon icon={faUsers} /> Client</Link></li>
                <li><Link to="/supplier"><FontAwesomeIcon icon={faTruck} /> Supplier</Link></li>
                <li><Link to="/orders"><FontAwesomeIcon icon={faShoppingCart} /> Orders</Link></li>
                <li><Link to="/articles"><FontAwesomeIcon icon={faNewspaper} /> Article</Link></li>
                <li><Link to="/sales"><FontAwesomeIcon icon={faDollarSign} /> Sales</Link></li>
                <li><Link to="/stock"><FontAwesomeIcon icon={faBox} /> Stock</Link></li>
                <li id={'settings'}><Link to="/settings"><FontAwesomeIcon icon={faCog} /> Settings</Link></li>
                <li id={'logout'}><Link to="/logout"><FontAwesomeIcon icon={faSignOutAlt} /> Log out</Link></li>
            </ul>
        </nav>
    )

}