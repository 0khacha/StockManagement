import React from 'react';
import {Bell} from "react-feather";

const Notification = () => {
    const handlNotification = () => {
        // Handle notification logic here
    };
    return (
        <div>
            <div className='notifaction-container' onClick={handlNotification}>
                <i className="fas fa-home"></i>
                <Bell className='notification-icon feather-icon'/>
            </div>
        </div>
    );
};

export default Notification;