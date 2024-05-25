import React, { useEffect, useState, useRef } from 'react';
import { Bell } from "react-feather";
import axios from "axios";

const Notification = () => {
    const [stockData, setStockData] = useState([]);
    const [unreadNotification, setUnreadNotification] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const stockResponse = await axios.get('http://127.0.0.1:8000/api/stock', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setStockData(stockResponse.data.stock);

                const hasUnread = stockResponse.data.stock.some(article => {
                    const expirationDate = new Date(article.validity_period);
                    const currentDate = new Date();
                    const daysUntilExpiration = Math.ceil((expirationDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
                    return article.quantity < 10 || (daysUntilExpiration <= 31 && daysUntilExpiration >= 0);
                });
                setUnreadNotification(hasUnread);
            } catch (error) {
                console.error('Error fetching stock data:', error);
            }
        };

        fetchData();
        const intervalId = setInterval(fetchData, 5 * 60 * 1000);

        return () => clearInterval(intervalId);
    }, []);

    const handleNotificationClick = () => {
        setDropdownOpen(!dropdownOpen);
        setUnreadNotification(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    const filteredStockData = stockData.filter(article => {
        const expirationDate = new Date(article.validity_period);
        const currentDate = new Date();
        const daysUntilExpiration = Math.ceil((expirationDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
        return article.quantity < 10 || (daysUntilExpiration <= 31 && daysUntilExpiration >= 0);
    });

    const notificationCount = filteredStockData.length;

    return (
        <div className='notification-container' ref={dropdownRef}>
            <div style={{ position: 'relative', cursor: 'pointer' }} onClick={handleNotificationClick}>
                <Bell className='notification-icon' />
                {unreadNotification && (
                    <div className='notification-count'>{notificationCount}</div>
                )}
            </div>
            <div className={`dropdown-message ${dropdownOpen ? 'open' : ''}`}>
                {notificationCount > 0 ? (
                    filteredStockData.map(article => (
                        <div key={article.id} className="notification-item">
                            {article.quantity < 10 && <div>{article.article} is out of stock</div>}
                            {new Date(article.validity_period) <= new Date(new Date().getTime() + 31 * 24 * 60 * 60 * 1000) && (
                                <div>{`${article.article} is expiring soon (${article.validity_period})`}</div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="notification-item">No notifications</div>
                )}
            </div>
        </div>
    );
};

export default Notification;
