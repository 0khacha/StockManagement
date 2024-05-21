import React, { useState, useEffect } from 'react';
import { Edit, Trash2 } from "react-feather";
import axios from 'axios';
import "./Article.css";

function Articles() {
    const [formData, setFormData] = useState({
        id: '',
        article: '',
        supplier: '',
        category: '',
        quantity: '',
        unit_price: '',
        validate_date: '',
        description: '',
        image: '',
        localisation: ''
    });

    const [articles, setArticles] = useState([]);
    const [orders, setOrders] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        fetchArticles();
        fetchOrders();
        fetchSuppliers();
    }, []);

    const fetchArticles = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/article');
            setArticles(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching articles:', error);
            setError('Error fetching articles data');
        }
    };

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/stock');
            setOrders(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching order:', error);
            setError('Error fetching stock data');
        }
    };


    const fetchSuppliers = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/supplier');
            setSuppliers(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            setError('Error fetching suppliers data');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'article') {
            const selectedOrder = orders.find(order => order.article === value);
            setFormData(prevState => ({
                ...prevState,
                article: value,
                description: selectedOrder ? selectedOrder.description : '',
                unit_price: selectedOrder ? selectedOrder.unit_price : '',
                quantity: selectedOrder ? selectedOrder.quantity : '',
                category: selectedOrder ? selectedOrder.category : '',
                supplier: selectedOrder ? selectedOrder.supplier : ''
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

        // Reset messages
        setError(null);
        setSuccess(null);

        // Validate for unique article
        const isDuplicate = articles.some(article => article.article.toLowerCase() === formData.article.toLowerCase() && article.id !== formData.id);

        if (isDuplicate) {
            setError('Article already exists in the stock.');
            return;
        }

        try {
            if (formData.id) {
                await axios.put(`http://127.0.0.1:8000/api/article/${formData.id}`, formData);
                setSuccess('Article updated successfully');
            } else {
                await axios.post('http://127.0.0.1:8000/api/article', formData);
                setSuccess('Article added successfully');
            }
            fetchArticles();
            resetForm();
        } catch (error) {
            console.error('Error submitting article:', error);
            setError('Error submitting article data');
        }
    };

    const handleEdit = (article) => {
        setFormData({ ...article });
    };

    const handleDelete = async (articleId) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/article/${articleId}`);
            fetchArticles();
            setSuccess('Article deleted successfully');
        } catch (error) {
            console.error('Error deleting article:', error);
            setError('Error deleting article data');
        }
    };

    const resetForm = () => {
        setFormData({
            id: '',
            article: '',
            supplier: '',
            category: '',
            quantity: '',
            unit_price: '',
            validate_date: '',
            description: '',
            image: '',
            localisation: ''
        });
    };

    return (
        <div className='article-screen client-screen'>
            <div className='forme'>
                <form action="" className='formulaire' onSubmit={handleSubmit}>
                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}
                    <input type="hidden" name="id" value={formData.id}/>
                    <div className='title-input'>
                        <h5>Article</h5>
                        <select className={'styled-input'} name="article" value={formData.article} onChange={handleInputChange}>
                            <option value="">Please select an article...</option>
                            {orders.map(order => (
                                <option key={order.id} value={order.article}>{order.article}</option>
                            ))}
                        </select>
                    </div>
                    <div className='title-input'>
                        <h5>Supplier</h5>
                        <select className={'styled-input'} name="supplier" value={formData.supplier} onChange={handleInputChange}>
                            <option value="">Please select a supplier...</option>
                                <option  value={formData.supplier}>
                                    {formData.supplier}
                                </option>
                        </select>
                    </div>
                    <div className='title-input'>
                        <h5>Category</h5>
                        <input type="text" name="category" value={formData.category} onChange={handleInputChange} placeholder='Please enter the category ...'/>
                    </div>
                    <div className='title-input'>
                        <h5>Quantity</h5>
                        <input type="text" name="quantity" value={formData.quantity} onChange={handleInputChange} placeholder='Please enter the quantity ...'/>
                    </div>
                    <div className='title-input'>
                        <h5>Unit Price</h5>
                        <input type="text" name="unit_price" value={formData.unit_price} onChange={handleInputChange} placeholder='Please enter the unit price ...'/>
                    </div>
                    <div className='title-input'>
                        <h5>Validating Date</h5>
                        <input type="date" name="validate_date" value={formData.validate_date} onChange={handleInputChange}/>
                    </div>
                    <div className='title-input'>
                        <h5>Description</h5>
                        <input type="text" name="description" value={formData.description} onChange={handleInputChange} placeholder='Please enter the description ...'/>
                    </div>
                    <div className='title-input'>
                        <h5>Localisation</h5>
                        <input type="text" name="localisation" value={formData.localisation} onChange={handleInputChange} placeholder='Please enter the localisation ...'/>
                    </div>
                    <div className='title-input'>
                        <h5>Image</h5>
                        <input type="file" name="image" accept="image/*" onChange={handleInputChange}/>
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
                        <th>Localisation</th>
                        <th>Validating Date</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {articles.map(article => (
                        <tr key={article.id}>
                            <td>{article.article}</td>
                            <td>{article.supplier}</td>
                            <td>{article.category}</td>
                            <td>{article.quantity}</td>
                            <td>{article.unit_price}</td>
                            <td>{article.localisation}</td>
                            <td>{article.validate_date}</td>
                            <td>{article.image}</td>
                            <td>
                                <button className="edit" onClick={() => handleEdit(article)}><Edit className="nav__toggle icon-edit" /></button>
                                <button className="delete" onClick={() => handleDelete(article.id)}><Trash2 className="nav__toggle icon-delete" /></button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Articles;
