import React, { useState, useEffect } from 'react';
import { ChevronDown } from "react-feather";
import "./StockTable.css";
import axios from "axios";
function StockTable() {
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
                            <td><img src={item.image_url} alt={item.article}
                                     style={{width: '50px', height: '50px'}}/></td>
                            {console.log(item.image_url)}

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
