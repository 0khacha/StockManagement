import React, { useState, useEffect } from 'react';
import axios from 'axios'; // If you're using Axios

function ProductDetails() {
    const [salesData, setSalesData] = useState(null);
    const [stockData, setStockData] = useState(null);
    const [visibleCategory, setVisibleCategory] = useState(null);

    useEffect(() => {
        // Fetch data from Sales API
        const fetchSalesData = async () => {
            try {
                const token = localStorage.getItem('token');
                const salesResponse = await axios.get('http://127.0.0.1:8000/api/sales', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setSalesData(salesResponse.data.sales);
            } catch (error) {
                console.error('Error fetching sales data:', error);
            }
        };

        // Fetch data from Stock API
        const fetchStockData = async () => {
            try {
                const token = localStorage.getItem('token');
                const stockResponse = await axios.get('http://127.0.0.1:8000/api/stock', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setStockData(stockResponse.data.stock);
            } catch (error) {
                console.error('Error fetching stock data:', error);
            }
        };

        fetchSalesData(); // Call the function to fetch sales data
        fetchStockData(); // Call the function to fetch stock data
    }, []); // Empty dependency array means this effect runs once after the component mounts

    // Function to calculate the frequency of sales for each article
    const calculateArticleSalesFrequency = () => {
        if (!salesData) return new Map();
        const salesFrequencyMap = new Map();
        salesData.forEach(sale => {
            const articleId = sale.article;
            if (salesFrequencyMap.has(articleId)) {
                salesFrequencyMap.set(articleId, salesFrequencyMap.get(articleId) + 1);
            } else {
                salesFrequencyMap.set(articleId, 1);
            }
        });
        return salesFrequencyMap;
    };

    // Function to calculate the total quantity sold for each article
    const calculateTotalQuantitySold = () => {
        if (!salesData) return new Map();
        const quantitySoldMap = new Map();
        salesData.forEach(sale => {
            const articleId = sale.article;
            if (quantitySoldMap.has(articleId)) {
                quantitySoldMap.set(articleId, quantitySoldMap.get(articleId) + sale.quantity);
            } else {
                quantitySoldMap.set(articleId, sale.quantity);
            }
        });
        return quantitySoldMap;
    };

    // Function to find fast-moving, slow-moving, and top-selling items
    const findFastMovingAndTopSellingItems = () => {
        if (!salesData) return { fastMovingItems: [], slowMovingItems: [], topSellingItems: [], itemNames: {} };

        const salesFrequencyMap = calculateArticleSalesFrequency();
        const totalQuantitySoldMap = calculateTotalQuantitySold();
        let fastMovingItems = [];
        let slowMovingItems = [];
        let topSellingItems = [];
        const itemNames = {};

        salesData.forEach(sale => {
            itemNames[sale.article] = sale.article; // Assuming article_name is available in sale data
        });

        salesFrequencyMap.forEach((frequency, articleId) => {
            // Determine fast-moving and slow-moving items
            if (frequency > 1) {
                fastMovingItems.push(articleId);
            } else {
                slowMovingItems.push(articleId);
            }
        });

        let maxQuantitySold = 0;
        totalQuantitySoldMap.forEach((quantitySold, articleId) => {
            // Determine top-selling items
            if (quantitySold > maxQuantitySold) {
                maxQuantitySold = quantitySold;
                topSellingItems = [articleId];
            } else if (quantitySold === maxQuantitySold) {
                topSellingItems.push(articleId);
            }
        });

        return { fastMovingItems, slowMovingItems, topSellingItems, itemNames };
    };

    // Function to filter items with upcoming expiration dates
    const filterItemsWithUpcomingExpiration = () => {
        if (!stockData) return [];
        return stockData.filter(item => {
            // Assuming validity_period is a date field and you want to check if it's within a week from now
            const validityPeriod = new Date(item.validity_period);
            const oneWeekFromNow = new Date();
            oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7); // Assuming a week from now
            return validityPeriod < oneWeekFromNow;
        });
    };

    // Calculate fast-moving items, slow-moving items, top-selling items, all items, and items with upcoming expiration dates
    const { fastMovingItems, slowMovingItems, topSellingItems, itemNames } = findFastMovingAndTopSellingItems();
    const allItemsCount = stockData ? stockData.length : 0;
    const itemsWithUpcomingExpiration = filterItemsWithUpcomingExpiration();

    // Function to toggle visibility of article names
    const toggleVisibility = (category) => {
        setVisibleCategory(visibleCategory === category ? null : category);
    };

    return (
        <div className='product-details'>
            <h3>Stock details</h3>
            {stockData && salesData ? (
                <div>
                    <div className='product-details__item'>
                        <ul>
                            <li className={'item green-items'}>
                                <span className={'item-name-stock'}
                                      onClick={() => toggleVisibility('allItems')}>All items</span>
                                {visibleCategory === 'allItems' ? (
                                    <ul className={'article-names'}>
                                        {stockData.map(item => (
                                            <li key={item.article_id}>{item.article_name}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <span className={'item-value-stock'}>{allItemsCount}</span>
                                )}
                            </li>
                            <li className={'item green-items'}>
                                <span className={'item-name-stock'} onClick={() => toggleVisibility('topSelling')}>Top-selling items</span>
                                {visibleCategory === 'topSelling' ? (
                                    <ul className={'article-names'}>
                                        {topSellingItems.map(articleId => (
                                            <li key={articleId}>{itemNames[articleId]}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <span className={'item-value-stock'}>{topSellingItems.length}</span>
                                )}
                            </li>
                            <li className={'item green-items'}>
                                <span className={'item-name-stock'} onClick={() => toggleVisibility('fastMoving')}>Fast-moving items</span>
                                {visibleCategory === 'fastMoving' ? (
                                    <ul className={'article-names'}>
                                        {fastMovingItems.map(articleId => (
                                            <li key={articleId}>{itemNames[articleId]}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <span className={'item-value-stock'}>{fastMovingItems.length}</span>
                                )}
                            </li>
                            <li className={'item red-items'}>
                                <span className={'item-name-stock'} onClick={() => toggleVisibility('upcomingExpiration')}>Items with upcoming expiration dates</span>
                                {visibleCategory === 'upcomingExpiration' ? (
                                    <ul className={'article-names'}>
                                        {itemsWithUpcomingExpiration.map(item => (
                                            <li key={item.article_id}>{item.article_name}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <span className={'item-value-stock'}>{itemsWithUpcomingExpiration.length}</span>
                                )}
                            </li>

                            <li className={'item red-items'}>
                                <span className={'item-name-stock'} onClick={() => toggleVisibility('slowMoving')}>Slow-moving items</span>
                                {visibleCategory === 'slowMoving' ? (
                                    <ul className={'article-names'}>
                                        {slowMovingItems.map(articleId => (
                                            <li key={articleId}>{itemNames[articleId]}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <span className={'item-value-stock'}>{slowMovingItems.length}</span>
                                )}
                            </li>

                        </ul>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default ProductDetails;
