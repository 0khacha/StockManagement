import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Si vous utilisez Axios

function ProductDetails() {
    const [salesData, setSalesData] = useState(null);
    const [stockData, setStockData] = useState(null);
    const [visibleCategory, setVisibleCategory] = useState(null);

    useEffect(() => {
        // Récupérer les données de l'API des ventes
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
                console.error('Erreur lors de la récupération des données de ventes :', error);
            }
        };

        // Récupérer les données de l'API des stocks
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
                console.error('Erreur lors de la récupération des données de stock :', error);
            }
        };

        fetchSalesData(); // Appeler la fonction pour récupérer les données de ventes
        fetchStockData(); // Appeler la fonction pour récupérer les données de stock
    }, []); // Tableau de dépendances vide signifie que cet effet se déclenche une fois après le montage du composant

    // Fonction pour calculer la fréquence des ventes pour chaque article
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

    // Fonction pour calculer la quantité totale vendue pour chaque article
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

    // Fonction pour trouver les articles à mouvement rapide, à mouvement lent et les articles les plus vendus
    const findFastMovingAndTopSellingItems = () => {
        if (!salesData) return { fastMovingItems: [], slowMovingItems: [], topSellingItems: [], itemNames: {} };

        const salesFrequencyMap = calculateArticleSalesFrequency();
        const totalQuantitySoldMap = calculateTotalQuantitySold();
        let fastMovingItems = [];
        let slowMovingItems = [];
        let topSellingItems = [];
        const itemNames = {};

        salesData.forEach(sale => {
            itemNames[sale.article] = sale.article; // Supposons que article_name est disponible dans les données de vente
        });

        salesFrequencyMap.forEach((frequency, articleId) => {
            // Déterminer les articles à mouvement rapide et lent
            if (frequency > 1) {
                fastMovingItems.push(articleId);
            } else {
                slowMovingItems.push(articleId);
            }
        });

        let maxQuantitySold = 0;
        totalQuantitySoldMap.forEach((quantitySold, articleId) => {
            // Déterminer les articles les plus vendus
            if (quantitySold > maxQuantitySold) {
                maxQuantitySold = quantitySold;
                topSellingItems = [articleId];
            } else if (quantitySold === maxQuantitySold) {
                topSellingItems.push(articleId);
            }
        });

        return { fastMovingItems, slowMovingItems, topSellingItems, itemNames };
    };

    // Fonction pour filtrer les articles avec des dates d'expiration à venir
    const filterItemsWithUpcomingExpiration = () => {
        if (!stockData) return [];
        return stockData.filter(item => {
            // Supposons que validity_period est un champ de date et que vous souhaitez vérifier si c'est dans une semaine à partir de maintenant
            const validityPeriod = new Date(item.validity_period);
            const oneWeekFromNow = new Date();
            oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7); // Supposons une semaine à partir de maintenant
            return validityPeriod < oneWeekFromNow;
        });
    };

    // Calculer les articles à mouvement rapide, les articles à mouvement lent, les articles les plus vendus, tous les articles et les articles avec des dates d'expiration à venir
    const { fastMovingItems, slowMovingItems, topSellingItems, itemNames } = findFastMovingAndTopSellingItems();
    const allItemsCount = stockData ? stockData.length : 0;
    const itemsWithUpcomingExpiration = filterItemsWithUpcomingExpiration();

    // Fonction pour basculer la visibilité des noms d'articles
    const toggleVisibility = (category) => {
        setVisibleCategory(visibleCategory === category ? null : category);
    };

    return (
        <div className='product-details'>
            <h3>Détails du stock</h3>
            {stockData && salesData ? (
                <div>
                    <div className='product-details__item'>
                        <ul>
                            <li className={'item green-items'}>
                                <span className={'item-name-stock'}
                                      onClick={() => toggleVisibility('allItems')}>Tous les articles</span>
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
                                <span className={'item-name-stock'} onClick={() => toggleVisibility('topSelling')}>Articles les plus vendus</span>
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
                                <span className={'item-name-stock'} onClick={() => toggleVisibility('fastMoving')}>Articles à mouvement rapide</span>
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
                                <span className={'item-name-stock'} onClick={() => toggleVisibility('upcomingExpiration')}>Articles avec des dates d'expiration à venir</span>
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
                                <span className={'item-name-stock'} onClick={() => toggleVisibility('slowMoving')}>Articles à mouvement lent</span>
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
                <p>Chargement...</p>
            )}
        </div>
    );
}

export default ProductDetails;
