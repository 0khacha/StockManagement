import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import './GraphSection.css';
import ProductDetails from "./product-details";
import axios from 'axios';

function GraphSection() {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                data: [],
                backgroundColor: [],
                hoverBackgroundColor: []
            }
        ]
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://127.0.0.1:8000/api/stock', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const stockData = response.data.stock;

            processStockData(stockData);
        } catch (error) {
            console.error('Erreur lors de la récupération des données de stock', error);
        }
    };

    const processStockData = (stockData) => {
        const categoryMap = new Map();

        stockData.forEach(item => {
            if (categoryMap.has(item.category)) {
                categoryMap.set(item.category, categoryMap.get(item.category) + item.quantity);
            } else {
                categoryMap.set(item.category, item.quantity);
            }
        });

        const categories = [];
        const quantities = [];
        const backgroundColor = [];

        categoryMap.forEach((quantity, category) => {
            categories.push(category);
            quantities.push(quantity);
            backgroundColor.push(getRandomColor());
        });

        setChartData({
            labels: categories,
            datasets: [
                {
                    data: quantities,
                    backgroundColor: backgroundColor,
                    hoverBackgroundColor: backgroundColor
                }
            ]
        });
    };

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    return (
        <div className='cercle-graph-section'>
            <ProductDetails/>
            <div className='Cergraph-container'>
                <h3>Graphique de Stock</h3>
                <h5>Catégories :</h5>
                <div className="Tubercle">
                    <Pie data={chartData}/>
                </div>
            </div>
        </div>
    );
}

export default GraphSection;
