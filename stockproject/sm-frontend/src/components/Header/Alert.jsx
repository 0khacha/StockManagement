import React from 'react';
import {AlertTriangle} from "react-feather";

function handlAlert() {

}

const Alert = () => {
    return (
        <div>
            <div>
                <div className='notifaction-container' onClick={handlAlert}>

                    <AlertTriangle className='Alert-icon feather-icon'/>
                </div>
            </div>
        </div>
    );
};

export default Alert;