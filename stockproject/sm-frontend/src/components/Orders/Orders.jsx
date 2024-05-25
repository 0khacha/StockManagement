import React, { useState, useEffect } from 'react';
import { Edit, Trash2 } from "react-feather";
import axios from 'axios';

function Orders() {
    const [formData, setFormData] = useState({
        id: '',
        supplier: '',
        article: '',
        category: '',
        quantity: '',
        unit_price: '',
        description: ''
    });
    const [suppliers, setSuppliers] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
        fetchSupplier();
    }, []);

    const fetchSupplier = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://127.0.0.1:8000/api/supplier', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Supplier Data:', response.data); // Log the supplier data
            setSuppliers(Array.isArray(response.data.suppliers) ? response.data.suppliers : []);
        } catch (error) {
            console.error('Error fetching suppliers:', error);
            if (error.response && error.response.status === 401) {
                alert('You are not authorized. Please log in.');
            }
        }
    };

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://127.0.0.1:8000/api/orders', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response Data:', response.data);
            const ordersData = Array.isArray(response.data.orders) ? response.data.orders : [];
            setOrders(ordersData);
        } catch (error) {
            console.error('Error fetching orders:', error);
            setError('Error fetching orders data');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (formData.id) {
                await axios.put(`http://127.0.0.1:8000/api/orders/${formData.id}`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setSuccess('Order updated successfully');
            } else {
                await axios.post('http://127.0.0.1:8000/api/orders', formData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setSuccess('Order added successfully');
            }
            fetchOrders();
            resetForm();
        } catch (error) {
            console.error('Error submitting form data:', error);
            setError('Error submitting form data');
        }
    };

    const handleEdit = (order) => {
        setFormData({ ...order });
    };

    const handleDelete = async (orderId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://127.0.0.1:8000/api/orders/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchOrders();
            setSuccess('Order deleted successfully');
        } catch (error) {
            console.error('Error deleting order:', error);
            setError('Error deleting order');
        }
    };

    const resetForm = () => {
        setFormData({
            id: '',
            supplier: '',
            article: '',
            category: '',
            quantity: '',
            unit_price: '',
            description: ''
        });
    };

    return (
        <div className='orders-screen client-screen'>
            <div className='forme'>
                <form onSubmit={handleSubmit} className='formulaire'>
                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}
                    <input type="hidden" name="id" value={formData.id} />
                    <div className='title-input'>
                        <h5>Article</h5>
                        <input type="text" name="article" value={formData.article} onChange={handleChange}
                               placeholder='Please enter the article ...' />
                    </div>
                    <div className='title-input'>
                        <h5>Supplier</h5>
                        <select className='styled-input' name="supplier" value={formData.supplier} onChange={handleChange}>
                            <option value="">Please select a supplier...</option>
                            {suppliers.map(supplier => (
                                <option key={supplier.id} value={`${supplier.first_name} ${supplier.last_name}`}>
                                    {`${supplier.first_name} ${supplier.last_name}`}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='title-input'>
                        <h5>Category</h5>
                        <input type="text" name="category" value={formData.category} onChange={handleChange}
                               placeholder='Please enter the category ...' />
                    </div>
                    <div className='title-input'>
                        <h5>Quantity</h5>
                        <input type="number" name="quantity" value={formData.quantity} onChange={handleChange}
                               placeholder='Please enter the quantity ...' />
                    </div>
                    <div className='title-input'>
                        <h5>Unit Price</h5>
                        <input type="number" name="unit_price" value={formData.unit_price} onChange={handleChange}
                               placeholder='Please enter the unit price ...' />
                    </div>
                    <div className='title-input'>
                        <h5>Description</h5>
                        <input type="text" name="description" value={formData.description} onChange={handleChange}
                               placeholder='Please enter the description ...' />
                    </div>
                    <button type="submit" className='validate'>{formData.id ? 'Update' : 'Add'}</button>
                </form>
            </div>
            <div className='ttable'>
                <table>
                    <thead>
                    <tr>
                        <th>Article</th>
                        <th>Supplier</th>
                        <th>Category</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.length > 0 ? (
                        orders.map(order => (
                            <tr key={order.id}>
                                <td>{order.article}</td>
                                <td>{order.supplier}</td>
                                <td>{order.category}</td>
                                <td>{order.quantity}</td>
                                <td>{order.unit_price}</td>
                                <td>{order.description}</td>
                                <td>
                                    <div className="action">
                                        <button className="edit" onClick={() => handleEdit(order)}>
                                            <Edit className="nav__toggle icon-edit" />
                                        </button>
                                        <button className="delete" onClick={() => handleDelete(order.id)}>
                                            <Trash2 className="nav__toggle icon-delete" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">No orders available</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Orders;
