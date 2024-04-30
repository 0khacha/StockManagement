import React, { useState } from 'react';
import logo from "../images/logo.png";
import "../css/navbar.css";
import CustomMenu from './customMenu';
import { ChevronLeft, ChevronRight } from 'react-feather';


export default function Navbar() {
    const [close, setClose] = useState(false);
    const toggleSidebar = () => {
        setClose(!close); 
    };
    return (
        <div className='Nav' style={{
            transform: close ? 'translateX(-130px)' : 'translateX(0)',
            transition: 'transform 0.3s ease',
        }}>
            <nav style={{
            alignItems:close?"end":"center",
            paddingRight:close?"9px":"0px"
        }}>
                <img src={logo} className='logo' alt='logo' style={{
                    transform: close ? 'scale(0.7)' : 'scale(1)',
                    transition: 'transform 0.3s ease',
                    marginRight:close?"-15.6px":"0"
                }} />
                <ul>
                    <CustomMenu routeName="/dashboard" Name="Dashboard" close={close} />
                    <CustomMenu routeName="/clients" Name="Client" close={close}/>
                    <CustomMenu routeName="/suppliers" Name="Supplier" close={close}/>
                    <CustomMenu routeName="/orders" Name="Orders" close={close}/>
                    <CustomMenu routeName="/article" Name="Article" close={close}/>
                    <CustomMenu routeName="/sales" Name="Sales" close={close}/>
                    <CustomMenu routeName="/stock" Name="Stock" close={close}/>
                    <CustomMenu routeName="/analitics" Name="Analitics" close={close}/>
                </ul>
                <ul className='buttom-menu' style={{
                    marginRight:close ?'0px':'17px',
                }}>
                    <CustomMenu routeName="/settings" Name="Settings" close={close}/>
                    <CustomMenu routeName="/" Name="Log Out" close={close}/>
                </ul>
            </nav>
            <div className='centered-icon'>
                {!close ? <ChevronLeft className='feather-icon menu-remove' onClick={toggleSidebar} /> : <ChevronRight className='feather-icon menu-remove' onClick={toggleSidebar} />}
            </div>

        </div>
    );
}
