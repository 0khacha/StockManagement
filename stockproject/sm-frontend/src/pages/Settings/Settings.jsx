import React, { useState } from 'react';
import GeneralSettings from '../../components/Settings/GeneralSettings';
import UserHistory from "../../components/Settings/UserHistory";


function Settings() {
    const [activeTab, setActiveTab] = useState('General');

    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
    };

    return (
        <main className='setting-page'>
            <h1>Paramètres du compte</h1>
            <div className='settings-bar'>
                <button className={activeTab === 'General' ? 'active' : ''} onClick={() => handleTabChange('General')}>Paramètres généraux</button>
                <button className={activeTab === 'History' ? 'active' : ''} onClick={() => handleTabChange('History')}>Historique de d'utilisateur</button>
            </div>
            {activeTab === 'General' ? (
                <GeneralSettings />
            ) : (
                <UserHistory />
            )}
        </main>
    );
}

export default Settings;
