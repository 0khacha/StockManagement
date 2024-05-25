import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './statistics.css';
import axios from 'axios';
import arrow from '../images/arrow.png';

function Statistics() {
    const [salesData, setSalesData] = useState([]);
    const [ordersData, setOrdersData] = useState([]);
    const [articlesData, setArticlesData] = useState([]);

    const ordersChartRef = useRef(null);
    const salesChartRef = useRef(null);
    const articlesChartRef = useRef(null);
    const ordersChartInstance = useRef(null);
    const salesChartInstance = useRef(null);
    const articlesChartInstance = useRef(null);

    useEffect(() => {
        fetchSalesData();
        fetchOrdersData();
        fetchArticlesData();
    }, []);

    useEffect(() => {
        if (ordersChartInstance.current) ordersChartInstance.current.destroy();
        if (salesChartInstance.current) salesChartInstance.current.destroy();
        if (articlesChartInstance.current) articlesChartInstance.current.destroy();

        const ordersDataAggregated = aggregateDataByDay(ordersData);
        const salesDataAggregated = aggregateDataByDay(salesData);
        const articlesDataAggregated = aggregateDataByDay(articlesData);

        ordersChartInstance.current = createChart(ordersChartRef, ordersDataAggregated, ordersComparison.isPositive);
        salesChartInstance.current = createChart(salesChartRef, salesDataAggregated, salesComparison.isPositive);
        articlesChartInstance.current = createChart(articlesChartRef, articlesDataAggregated, articlesComparison.isPositive);
    }, [ordersData, salesData, articlesData]);

    const fetchSalesData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://127.0.0.1:8000/api/sales', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const salesData = Array.isArray(response.data.sales) ? response.data.sales : [];
            setSalesData(salesData);
        } catch (error) {
            console.error('Error fetching sales data', error);
        }
    };

    const fetchOrdersData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://127.0.0.1:8000/api/orders', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const ordersData = Array.isArray(response.data.orders) ? response.data.orders : [];
            setOrdersData(ordersData);
        } catch (error) {
            console.error('Error fetching orders data', error);
        }
    };

    const fetchArticlesData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://127.0.0.1:8000/api/article', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const articlesData = Array.isArray(response.data) ? response.data : [];
            setArticlesData(articlesData);
        } catch (error) {
            console.error('Error fetching articles data', error);
        }
    };

    const aggregateDataByDay = (data) => {
        const hoursInDay = 24;
        const interval = 3;
        const aggregatedData = Array(hoursInDay / interval).fill(0);

        data.forEach(item => {
            const date = new Date(item.created_at);
            const hour = date.getHours();
            const index = Math.floor(hour / interval);
            aggregatedData[index]++;
        });

        return aggregatedData;
    };

    const createChart = (chartRef, data, isPositive) => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            return new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['0-3h', '3-6h', '6-9h', '9-12h', '12-15h', '15-18h', '18-21h', '21-24h'],
                    datasets: [{
                        data: data,
                        borderWidth: 2,
                        borderColor: isPositive ? '#0ae146' : '#F40C0C',
                        tension: 0.1,
                        fill: false
                    }]
                },
                options: {
                    scales: {
                        x: {
                            display: false
                        },
                        y: {
                            display: false,
                            beginAtZero: true
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            enabled: true
                        }
                    },
                    interaction: {
                        mode: 'nearest',
                        intersect: false
                    },
                    elements: {
                        point: {
                            radius: 0
                        },
                        line: {
                            backgroundColor: 'rgba(0, 0, 0, 0)'
                        }
                    },
                    layout: {
                        padding: {
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0
                        }
                    }
                }
            });
        }
        return null;
    };

    const compareWithYesterday = (todayData, yesterdayData) => {
        const todayAvg = calculateAverage(todayData);
        const yesterdayAvg = calculateAverage(yesterdayData);
        const difference = todayAvg - yesterdayAvg;
        return {
            difference: difference.toFixed(1),
            isPositive: difference >= 0
        };
    };

    const calculateAverage = (data) => {
        const total = data.reduce((sum, value) => sum + value, 0);
        return (total / data.length).toFixed(1);
    };

    const getDataForYesterday = (data) => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return data.filter(item => {
            const itemDate = new Date(item.created_at);
            return itemDate.getDate() === yesterday.getDate() &&
                itemDate.getMonth() === yesterday.getMonth() &&
                itemDate.getFullYear() === yesterday.getFullYear();
        });
    };

    const ordersYesterday = getDataForYesterday(ordersData);
    const salesYesterday = getDataForYesterday(salesData);
    const articlesYesterday = getDataForYesterday(articlesData);

    const ordersComparison = compareWithYesterday(aggregateDataByDay(ordersData), aggregateDataByDay(ordersYesterday));
    const salesComparison = compareWithYesterday(aggregateDataByDay(salesData), aggregateDataByDay(salesYesterday));
    const articlesComparison = compareWithYesterday(aggregateDataByDay(articlesData), aggregateDataByDay(articlesYesterday));

    return (
        <div className="statistics">
            <div className="stat-boxes">
                {/* Orders Section */}
                <div className="orders">
                    <div className='content'>
                        <h3>Orders</h3>
                        <h2>{ordersData.length}</h2>
                        <div className='state-arrow'>
                            <img src={arrow} alt="" className='arrow' />
                            <p>Since yesterday</p>
                        </div>
                    </div>
                    <div className='graph-top'>
                        <canvas ref={ordersChartRef}></canvas>
                        <p className={`value-${ordersComparison.isPositive ? 'pos' : 'neg'}`}>
                            {ordersComparison.difference >= 0 ? '+' : ''}{ordersComparison.difference}%
                        </p>
                    </div>
                </div>
                {/* Sales Section */}
                <div className="sales">
                    <div className='content'>
                        <h3>Sales</h3>
                        <h2>{salesData.length}</h2>
                        <div className='state-arrow'>
                            <img src={arrow} alt="" className='arrow' />
                            <p>Since yesterday</p>
                        </div>
                    </div>
                    <div className='graph-top'>
                        <canvas ref={salesChartRef}></canvas>
                        <p className={`value-${salesComparison.isPositive ? 'pos' : 'neg'}`}>
                            {salesComparison.difference >= 0 ? '+' : ''}{salesComparison.difference}%
                        </p>

                    </div>
                </div>
                {/* Articles Section */}
                <div className="articles">
                <div className='content'>
                        <h3>Articles</h3>
                        <h2>{articlesData.length}</h2>
                        <div className='state-arrow'>
                            <img src={arrow} alt="" className='arrow' />
                            <p>Since yesterday</p>
                        </div>
                    </div>
                    <div className='graph-top'>
                        <canvas ref={articlesChartRef}></canvas>
                        <p className={`value-${articlesComparison.isPositive ? 'pos' : 'neg'}`}>
                            {articlesComparison.difference >= 0 ? '+' : ''}{articlesComparison.difference}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Statistics;
