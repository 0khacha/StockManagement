import React, { useState, useEffect } from 'react';
import { Edit, Trash2 } from 'react-feather';
import axios from 'axios';
import './Article.css';
import { useSearch } from '../Header/SearchContext'; // Ensure the correct import path

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
        image: null,
        localisation: ''
    });

    const [articles, setArticles] = useState([]);
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const { searchQuery } = useSearch(); // Use the search context

    useEffect(() => {
        fetchArticles();
        fetchOrders();
    }, []);

    const fetchArticles = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://127.0.0.1:8000/api/article', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setArticles(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Erreur lors de la récupération des articles:', error);
            setError('Erreur lors de la récupération des données des articles');
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
            setOrders(Array.isArray(response.data.orders) ? response.data.orders : []);
        } catch (error) {
            console.error('Erreur lors de la récupération des commandes:', error);
            setError('Erreur lors de la récupération des données des commandes');
        }
    };

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        console.log(`Champ ${name} changé en ${value}`);

        if (name === 'image' && files.length > 0) {
            setFormData((prevState) => ({
                ...prevState,
                image: files[0]
            }));
        } else if (name === 'image') {
            setFormData((prevState) => ({
                ...prevState,
                image: null
            }));
        } else if (name === 'article') {
            const selectedOrder = orders.find((order) => order.article === value);
            setFormData((prevState) => ({
                ...prevState,
                article: value,
                description: selectedOrder ? selectedOrder.description : '',
                unit_price: selectedOrder ? selectedOrder.unit_price : '',
                quantity: selectedOrder ? selectedOrder.quantity : '',
                supplier: selectedOrder ? selectedOrder.supplier : ''
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const addNewArticle = async () => {
        try {
            const token = localStorage.getItem('token');
            const formDataObj = new FormData();

            formDataObj.append('article', formData.article);
            formDataObj.append('supplier', formData.supplier);
            formDataObj.append('category', formData.category);
            formDataObj.append('quantity', formData.quantity);
            formDataObj.append('unit_price', formData.unit_price);
            formDataObj.append('validate_date', formData.validate_date);
            formDataObj.append('description', formData.description);
            formDataObj.append('localisation', formData.localisation);

            if (formData.image) {
                formDataObj.append('image', formData.image);
            }
            const response = await axios.post('http://127.0.0.1:8000/api/article', formDataObj, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 201) {
                setSuccess('Article ajouté avec succès');
                fetchArticles();
                resetForm();
            } else {
                setError('Échec de l\'ajout de l\'article');
            }
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'article:', error);
            if (error.response && error.response.data) {
                const validationErrors = error.response.data.messages;
                setError(validationErrors.article ? validationErrors.article.join(', ') : 'Erreur de validation');
            } else {
                setError('Erreur lors de l\'ajout des données de l\'article');
            }
        }
    };

    const updateArticle = async () => {
        try {
            const token = localStorage.getItem('token');

            const formDataObj = {
                article: formData.article,
                supplier: formData.supplier,
                category: formData.category,
                quantity: formData.quantity,
                unit_price: formData.unit_price,
                validate_date: formData.validate_date,
                description: formData.description,
                localisation: formData.localisation
            };

            if (formData.image) {
                formDataObj.image = formData.image;
            }

            const response = await axios.put(`http://127.0.0.1:8000/api/article/${formData.id}`, formDataObj, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                setSuccess('Article mis à jour avec succès');
                fetchArticles();
                resetForm();
            } else {
                setError('Échec de la mise à jour de l\'article');
                console.log(response.data);
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'article:', error);
            if (error.response && error.response.data) {
                const validationErrors = error.response.data.messages;
                setError(validationErrors.article ? validationErrors.article.join(', ') : 'Erreur de validation');
            } else {
                setError('Erreur lors de la mise à jour des données de l\'article');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError(null);
        setSuccess(null);

        const isDuplicate = articles.some((article) => article.article.toLowerCase() === formData.article.toLowerCase() && article.id !== formData.id);

        if (isDuplicate) {
            setError('L\'article existe déjà dans le stock.');
            return;
        }

        if (formData.id) {
            await updateArticle();
        } else {
            await addNewArticle();
        }
    };

    const handleEdit = (article) => {
        setFormData({ ...article, image: null });
    };

    const handleDelete = async (articleId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://127.0.0.1:8000/api/article/${articleId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchArticles();
            setSuccess('Article supprimé avec succès');
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'article:', error);
            setError('Erreur lors de la suppression des données de l\'article');
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
            image: null,
            localisation: ''
        });
    };

    const filteredArticles = articles.filter(article =>
        article.article.toLowerCase().includes(searchQuery.toLowerCase())
        || article.supplier.toLowerCase().includes(searchQuery.toLowerCase())
        || article.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='article-screen client-screen'>
            <div className='forme'>
                <form action="" className='formulaire' onSubmit={handleSubmit}>
                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}
                    <input type="hidden" name="id" value={formData.id || ''} />
                    <div className='title-input'>
                        <h5>Article</h5>
                        <select className='styled-input' name="article" value={formData.article || ''} onChange={handleInputChange}>
                            <option value="">Veuillez sélectionner un article...</option>
                            {orders.map((order) => (
                                <option key={order.id} value={order.article}>{order.article}</option>
                            ))}
                        </select>
                    </div>
                    <div className='title-input'>
                        <h5>Fournisseur</h5>
                        <select className='styled-input' name="supplier" value={formData.supplier || ''} onChange={handleInputChange}>
                            <option value="">Veuillez sélectionner un fournisseur...</option>
                            {orders.map((order) => (
                                <option key={order.id} value={order.supplier}>{order.supplier}</option>
                            ))}
                        </select>
                    </div>
                    <div className='title-input'>
                        <h5>Catégorie</h5>
                        <input type="text"
                               name="category" value={formData.category || ''} onChange={handleInputChange} placeholder='Please enter the category ...' />
                    </div>
                    <div className='title-input'>
                        <h5>Quantité</h5>
                        <input type="text" name="quantity" value={formData.quantity || ''} onChange={handleInputChange} placeholder='Please enter the quantity ...' />
                    </div>
                    <div className='title-input'>
                        <h5>Prix unitaire</h5>
                        <input type="text" name="unit_price" value={formData.unit_price || ''} onChange={handleInputChange} placeholder='Please enter the unit price ...' />
                    </div>
                    <div className='title-input'>
                        <h5>Date de validation</h5>
                        <input type="date" name="validate_date" value={formData.validate_date || ''} onChange={handleInputChange} />
                    </div>
                    <div className='title-input'>
                        <h5>Description</h5>
                        <input type="text" name="description" value={formData.description || ''} onChange={handleInputChange} placeholder='Please enter the description ...' />
                    </div>
                    <div className='title-input'>
                        <h5>Localisation</h5>
                        <input type="text" name="localisation" value={formData.localisation || ''} onChange={handleInputChange} placeholder='Please enter the localisation ...' />
                    </div>
                    <div className='title-input'>
                        <h5>Image</h5>
                        <input type="file" name="image" accept="image/*" onChange={handleInputChange} />
                    </div>
                    <button type="submit" className='validate'>{formData.id ? 'Update' : 'Add'}</button>
                </form>
            </div>
            <div className='ttable'>
                <table>
                    <thead>
                    <tr>
                        <th>Article</th>
                        <th>Fournisseur</th>
                        <th>Catégorie</th>
                        <th>Quantité</th>
                        <th>Prix unitaire</th>
                        <th>Localisation</th>
                        <th>Date de validation</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredArticles.map((article) => (
                        <tr key={article.id}>
                            <td>{article.article}</td>
                            <td>{article.supplier}</td>
                            <td>{article.category}</td>
                            <td>{article.quantity}</td>
                            <td>{article.unit_price}</td>
                            <td>{article.localisation}</td>
                            <td>{article.validate_date}</td>
                            <td><img src={article.image_url} alt={article.article} style={{ width: '50px', height: '50px' }} /></td>
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
