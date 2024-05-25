import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './Turnover.css';
import Statistics from './statistics.jsx';
import axios from 'axios';

function Turnover() {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const [selectedTimePeriod, setSelectedTimePeriod] = useState('1 Day');
    const [salesData, setSalesData] = useState([]);
    const [bestSellingItems, setBestSellingItems] = useState([]);
    const [topSellingArticles, setTopSellingArticles] = useState([]);
    const [totalSalesValue, setTotalSalesValue] = useState(0);

    useEffect(() => {
        fetchSalesData();
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [selectedTimePeriod]);

    const fetchSalesData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://127.0.0.1:8000/api/sales', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const sales = response.data.sales || [];
            const salesData = sales.map(sale => ({
                ...sale,
                total: sale.unit_price * sale.quantity
            }));
            const totalSales = salesData.reduce((total, sale) => total + sale.total, 0);
            setSalesData(salesData);
            setBestSellingItems(getBestSellingItems(salesData));
            setTopSellingArticles(getTopSellingArticles(salesData));
            setTotalSalesValue(totalSales);
            renderChart(selectedTimePeriod, salesData);
        } catch (error) {
            console.error('Error fetching sales:', error);
        }
    };

    const renderChart = (timePeriod, salesData) => {
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const ctx = chartRef.current.getContext('2d');
        chartInstance.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: getLabelsForTimePeriod(timePeriod),
                datasets: [{
                    label: 'Number of Sales',
                    data: getDataForTimePeriod(timePeriod, salesData),
                    borderColor: 'rgb(10,225,70)',
                    tension: 0.1,
                    fill: false
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                elements: {
                    line: {
                        borderWidth: 2
                    }
                }
            }
        });
    };

    const getLabelsForTimePeriod = (timePeriod) => {
        switch (timePeriod) {
            case '1 Day':
                return ['0-3h', '3-6h', '6-9h', '9-12h', '12-15h', '15-18h', '18-21h', '21-24h'];
            case '3 Month':
                return ['Jan', 'Feb', 'Mar'];
            case '6 Month':
                return ['Jan', 'Apr', 'Jul'];
            case '1 Year':
                return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            default:
                return [];
        }
    };

    const getDataForTimePeriod = (timePeriod, salesData) => {
        switch (timePeriod) {
            case '1 Day':
                return aggregateSalesByHour(salesData, 3);
            case '3 Month':
                return aggregateSalesByMonth(salesData, 3);
            case '6 Month':
                return aggregateSalesByMonth(salesData, 6);
            case '1 Year':
                return aggregateSalesByMonth(salesData, 12);
            default:
                return [];
        }
    };

    const aggregateSalesByHour = (salesData, hourInterval) => {
        const aggregatedData = Array(24 / hourInterval).fill(0);

        salesData.forEach(sale => {
            const saleDate = new Date(sale.created_at);
            const saleHour = saleDate.getHours(); // 0-23
            const intervalIndex = Math.floor(saleHour / hourInterval);
            aggregatedData[intervalIndex]++;
        });

        return aggregatedData;
    };

    const aggregateSalesByMonth = (salesData, months) => {
        const aggregatedData = Array(months).fill(0);
        const currentYear = new Date().getFullYear();

        salesData.forEach(sale => {
            const saleDate = new Date(sale.created_at);
            const saleMonth = saleDate.getMonth(); // 0-11
            if (saleDate.getFullYear() === currentYear) {
                aggregatedData[saleMonth]++;
            }
        });

        return aggregatedData;
    };

    const getBestSellingItems = (salesData) => {
        const sortedSales = salesData.slice().sort((a, b) => b.total - a.total);
        return sortedSales.slice(0, 8);
    };

    const getTopSellingArticles = (salesData) => {
        const articleSales = {};

        salesData.forEach(sale => {
            if (articleSales[sale.article]) {
                articleSales[sale.article] += sale.quantity;
            } else {
                articleSales[sale.article] = sale.quantity;
            }
        });

        const sortedArticles = Object.entries(articleSales).sort((a, b) => b[1] - a[1]);
        return sortedArticles.slice(0, 8).map(([article, quantity]) => ({ article, quantity }));
    };

    const handleTimePeriodClick = (timePeriod) => {
        setSelectedTimePeriod(timePeriod);
    };

    return (
        <div className="main-container">
            <Statistics />
            <div className="second-container">
                <div className="graph-container">
                    <div className='title-items'>
                        <h3>Sales</h3>
                        <div className='value'>{totalSalesValue.toFixed(2)}$</div>
                    </div>
                    <div className='months'>
                        <ul>
                            <li className={selectedTimePeriod === '1 Day' ? 'selected' : ''} onClick={() => handleTimePeriodClick('1 Day')}>1 Day</li>
                            <li className={selectedTimePeriod === '3 Month' ? 'selected' : ''} onClick={() => handleTimePeriodClick('3 Month')}>3 Month</li>
                            <li className={selectedTimePeriod === '6 Month' ? 'selected' : ''} onClick={() => handleTimePeriodClick('6 Month')}>6 Month</li>
                            <li className={selectedTimePeriod === '1 Year' ? 'selected' : ''} onClick={() => handleTimePeriodClick('1 Year')}>1 Year</li>
                        </ul>
                    </div>
                    <div className='graph'>
                        <canvas ref={chartRef} height={220} width={600} />
                    </div>
                </div>
                <div className="selling-container">
                    <h3>Best Selling</h3>
                    <ul>
                        {bestSellingItems.map((item,
                                               index) => (
                            <li key={index}>
                                {item.article} <span className="price">${item.total.toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="selling-container">
                    <h3>Top-selling items</h3>
                    <ul>
                        {topSellingArticles.map((item, index) => (
                            <li key={index}>
                                {item.article} <span className="price">{item.quantity}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Turnover;
