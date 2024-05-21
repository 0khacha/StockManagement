import React, { useState, useEffect } from 'react';
import { Edit, Trash2 } from "react-feather";
import axios from 'axios';

function SalesPage() {
    const [formData, setFormData] = useState({
        id: '',
        article: '',
        description: '',
        client: '',
        quantity: '',
        unit_price: '',
        category: ''
    });

    const [sales, setSales] = useState([]);
    const [stock, setStock] = useState([]);
    const [clients, setClients] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        fetchSales();
        fetchStock();
        fetchClients();
    }, []);

    const fetchSales = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/sales');
            setSales(Array.isArray(response.data.sales) ? response.data.sales : []);
        } catch (error) {
            console.error('Error fetching sales:', error);
            setError('Error fetching sales data');
        }
    };

    const fetchStock = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/stock');
            setStock(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching stock:', error);
            setError('Error fetching stock data');
        }
    };

    const fetchClients = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/clients');
            setClients(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            setError('Error fetching clients data');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'article') {
            const selectedArticle = stock.find(item => item.article === value);
            setFormData(prevState => ({
                ...prevState,
                article: value,
                description: selectedArticle ? selectedArticle.description : '',
                unit_price: selectedArticle ? selectedArticle.unit_price : '',
                quantity: selectedArticle ? selectedArticle.quantity : '',
                category: selectedArticle ? selectedArticle.category : ''
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const selectedArticle = stock.find(item => item.article === formData.article);
            if (!selectedArticle) {
                setError('Selected article not found in stock.');
                return;
            }
            if (parseInt(formData.quantity) > selectedArticle.quantity) {
                setError('Quantity cannot exceed available stock quantity.');
                return;
            }
            if (formData.id) {
                await axios.put(`http://127.0.0.1:8000/api/sales/${formData.id}`, formData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                setSuccess('Sale updated successfully');
            } else {
                await axios.post('http://127.0.0.1:8000/api/sales', formData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                setSuccess('Sale added successfully');
            }
            fetchSales();
            resetForm();
        } catch (error) {
            console.error('Error submitting form data:', error);
            setError('Error submitting form data');
        }
    };

    const handleEdit = (sale) => {
        setFormData({ ...sale });
    };

    const handleDelete = async (saleId) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/sales/${saleId}`);
            await fetchSales();
            setSuccess('Sale deleted successfully');
        } catch (error) {
            console.error('Error deleting sale:', error);
            setError('Error deleting sale');
        }
    };

    const resetForm = () => {
        setFormData({
            id: '',
            article: '',
            description: '',
            client: '',
            quantity: '',
            unit_price: '',
            category: ''
        });
    };

    return (
        <div className='sales-screen client-screen'>
            <div className='forme'>
                <form onSubmit={handleSubmit} className='formulaire'>
                    <input type="hidden" name="id" value={formData.id} />
                    <div className='title-input'>
                        <h5>Article</h5>
                        <select className={'styled-input'} name="article" value={formData.article} onChange={handleChange}>
                            <option value="">Please select an article...</option>
                            {stock.map(item => (
                                <option key={item.id} value={item.article}>{item.article}</option>
                            ))}
                        </select>
                    </div>
                    <div className='title-input'>
                        <h5>Description</h5>
                        <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder='Please enter the description ...' />
                    </div>
                    <div className='title-input'>
                        <h5>Client</h5>
                        <select className={'styled-input'} name="client" value={formData.client} onChange={handleChange}>
                            <option value="">Please select a client...</option>
                            {clients.map(client => (
                                <option key={client.id} value={`${client.first_name} ${client.last_name}`}>
                                    {`${client.first_name} ${client.last_name}`}
                                </option>

                            ))}
                        </select>
                    </div>
                    <div className='title-input'>
                        <h5>Quantity</h5>
                        <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} placeholder='Please enter the quantity ...' />
                    </div>
                    <div className='title-input'>
                        <h5>Unit Price</h5>
                        <input type="number" name="unit_price" value={formData.unit_price} onChange={handleChange} placeholder='Please enter the unit price ...' />
                    </div>
                    <div className='title-input'>
                        <h5>Category</h5>
                        <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder='Please enter the category ...' />
                    </div>
                    <button type="submit" className='validate'>{formData.id ? 'Update' : 'Add'}</button>
                </form>
            </div>
            <div className='ttable'>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                <table>
                    <thead>
                    <tr>
                        <th>Article</th>
                        <th>Description</th>
                        <th>Client</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Category</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Array.isArray(sales) && sales.length > 0 ? (
                        sales.map(sale => (
                            <tr key={sale.id}>
                                <td>{sale.article}</td>
                                <td>{sale.description}</td>
                                <td>{sale.client}</td>
                                <td>{sale.quantity}</td>
                                <td>{sale.unit_price}</td>
                                <td>{sale.category}</td>
                                <td>
                                    <div className="action">
                                        <button className="edit" onClick={() => handleEdit(sale)}>
                                            <Edit className="nav__toggle icon-edit" />
                                        </button>
                                        <button className="delete" onClick={() => handleDelete(sale.id)}>
                                            <Trash2 className="nav__toggle icon-delete" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7}>No sales found.</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SalesPage;
