// src/components/StockTable/StockTable.jsx
import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'react-feather';
import axios from 'axios';
import { useSearch } from '../Header/SearchContext';
import './StockTable.css';

function StockTable() {
    const { searchQuery } = useSearch();
    const [stockData, setStockData] = useState([]);

    useEffect(() => {
        fetchStockData();
    }, []);

    const fetchStockData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://127.0.0.1:8000/api/stock', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setStockData(Array.isArray(response.data.stock) ? response.data.stock : []);
        } catch (error) {
            console.error('Error fetching stock:', error);
        }
    };

    // Filter stock data based on the search query
    const filteredStockData = stockData.filter(item =>
        item.article.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="stock-screen">
            <div className='ttable table-stock'>
                <table style={{ position: "relative" }}>
                    <thead>
                    <tr>
                        <th>Article</th>
                        <th>
                            <div className="header-title">
                                <p>Supplier</p> <ChevronDown className="arrow-down" />
                            </div>
                        </th>
                        <th>
                            <div className="header-title">
                                <p>Category</p> <ChevronDown className="arrow-down" />
                            </div>
                        </th>
                        <th>Quantity</th>
                        <th>
                            <div className="header-title">
                                <p>Validity Period</p> <ChevronDown className="arrow-down" />
                            </div>
                        </th>
                        <th>Picture</th>
                        <th>Description</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredStockData.map(item => (
                        <tr key={item.id}>
                            <td>{item.article}</td>
                            <td>{item.supplier}</td>
                            <td>{item.category}</td>
                            <td>{item.quantity}</td>
                            <td>{item.validity_period}</td>
                            <td><img src={item.image_url} alt={item.article} style={{ width: '50px', height: '50px' }} /></td>
                            <td className="description">{item.description}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default StockTable;
