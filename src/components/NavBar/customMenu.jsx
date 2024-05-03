import React from 'react'
import "../css/navbar.css";
import { Grid, Users, Truck, ShoppingCart, FileText, DollarSign, Box, BarChart2, Settings, LogOut } from 'react-feather';


function checkSettings(Name, close) {
    return Name === "Settings" && close === false;
}

function nameTag(Name) {
    if (Name === "Dashboard") {
        return <Grid className='feather-icon' />;
    } else if (Name === "Client") {
        return <Users className='feather-icon' />;
    } else if (Name === "Supplier") {
        return <Truck className='feather-icon' />;
    } else if (Name === "Orders") {
        return <ShoppingCart className='feather-icon' />;
    } else if (Name === "Article") {
        return <FileText className='feather-icon' />;
    } else if (Name === "Sales") {
        return <DollarSign className='feather-icon' />;
    } else if (Name === "Stock") {
        return <Box className='feather-icon' />;
    } else if (Name === "Analitics") {
        return <BarChart2 className='feather-icon' />;
    } else if (Name === "Settings") {
        return <Settings className='feather-icon' />;
    } else if (Name === "Log Out") {
        return <LogOut className='feather-icon' />;
    }
}
function customMenu({ routeName, Name, close }) {



    return (
        <li><a href={routeName} className={checkSettings(Name, close) ? "settings" : null}>{nameTag(Name)} {close ? null : Name}</a></li>
    )
}

export default customMenu;