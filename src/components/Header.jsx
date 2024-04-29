import { Search, Bell } from 'react-feather';
import './css/header.css';

export default function Header() {
    const handlNotification = () => {
        // Handle notification logic here
    };
    return (
        <header className="header">
            <div className='navbar'>
                <div className='search-container'>
                    <form>
                        <Search className='search-icon feather-icon' />
                        <input className='search' placeholder='Search here ...' />
                    </form>
                </div>
                <div className='connexion-container'>
                    <div className='notifaction-container' onClick={handlNotification}>
                        <i className="fas fa-home"></i>
                        <Bell className='notification-icon feather-icon'/>
                    </div>
                    <div id={'bar'}>|</div>
                    <div className={'connexion'}>
                        <a id={'link'} href={"google.com"}>Connexion</a>
                    </div>
                </div>
            </div>
        </header>
    );
}
