import React, { useState, useEffect } from 'react';
import { ChevronDown } from "react-feather";
import "./StockTable.css";
import pafumeImg from './../images/perfume.jpeg';

function StockTable() {
    const [stockData, setStockData] = useState([]);

    useEffect(() => {
        fetchStockData();
    }, []);

    const fetchStockData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/stock');
            if (!response.ok) {
                throw new Error('Failed to fetch stock data');
            }
            const data = await response.json();
            setStockData(data);
        } catch (error) {
            console.error(error);
        }
    };

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
                                <p>validity period</p> <ChevronDown className="arrow-down" />
                            </div>
                        </th>
                        <th>Picture</th>
                        <th>Description</th>
                    </tr>
                    </thead>
                    <tbody>
                    {stockData.map(item => (
                        <tr key={item.id}>
                            <td>{item.article}</td>
                            <td>{item.supplier}</td>
                            <td>{item.category}</td>
                            <td>{item.quantity}</td>
                            <td>{item.validity_period}</td>
                            <td><img className="image-perfume" src={pafumeImg} alt="can't" /></td>
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
