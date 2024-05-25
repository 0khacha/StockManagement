import React, { useState, useEffect } from 'react';
import { Edit, Trash2 } from "react-feather";
import axios from 'axios';
import {useSearch} from "../Header/SearchContext.jsx";

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
    const { searchQuery } = useSearch();
    useEffect(() => {
        fetchSales();
        fetchStock();
        fetchClients();
    }, []);

    const fetchSales = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://127.0.0.1:8000/api/sales', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setSales(Array.isArray(response.data.sales) ? response.data.sales : []);
        } catch (error) {
            console.error('Error fetching sales:', error);
            setError('Erreur lors de la récupération des données des ventes');
        }
    };
    const filteredSales = sales.filter(sale =>
        sale.article.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sale.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sale.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const fetchStock = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://127.0.0.1:8000/api/stock', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setStock(Array.isArray(response.data.stock) ? response.data.stock : []);
        } catch (error) {
            console.error('Error fetching stock:', error);
            setError('Erreur lors de la récupération des données du stock');
        }
    };

    const fetchClients = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://127.0.0.1:8000/api/clients', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setClients(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching clients:', error);
            if (error.response && error.response.status === 401) {
                alert('Vous n\'êtes pas autorisé. Veuillez vous connecter.');
            }
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
            const token = localStorage.getItem('token');
            const existingSale = sales.find(sale => sale.id === formData.id);
            const existingQuantity = existingSale ? existingSale.quantity : 0;
            const selectedArticle = stock.find(item => item.article === formData.article);

            if (!selectedArticle) {
                setError('Article sélectionné introuvable dans le stock.');
                return;
            }

            const stockQuantity = selectedArticle.quantity + existingQuantity - parseInt(formData.quantity);
            if (stockQuantity < 0) {
                setError('La quantité ne peut pas dépasser la quantité disponible en stock.');
                return;
            }

            const dataToSend = {
                ...formData,
                quantity: parseInt(formData.quantity),
                unit_price: parseFloat(formData.unit_price)
            };

            if (formData.id) {
                await axios.put(`http://127.0.0.1:8000/api/sales/${formData.id}`, dataToSend, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                });
                setSuccess('Vente mise à jour avec succès');
            } else {
                await axios.post('http://127.0.0.1:8000/api/sales', dataToSend, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                });
                setSuccess('Vente soumise avec succès');
            }

            await fetchSales();
            await fetchStock();
            resetForm();
        } catch (error) {
            console.error('Erreur lors de la soumission des données du formulaire:', error);
            setError("Erreur lors de la soumission des données du formulaire");
            if (error.response && error.response.data) {
                setError(error.response.data.message || "Erreur lors de la soumission des données du formulaire");
            }
        }
    };

    const handleEdit = (sale) => {
        setFormData({ ...sale });
    };

    const handleDelete = async (saleId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://127.0.0.1:8000/api/sales/${saleId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            await fetchSales();
            setSuccess('Vente supprimée avec succès');
        } catch (error) {
            console.error('Erreur lors de la suppression de la vente:', error);
            setError('Erreur lors de la suppression de la vente');
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
                        <select className='styled-input' name="article" value={formData.article} onChange={handleChange}>
                            <option value="">Veuillez sélectionner un article...</option>
                            {stock.map(item => (
                                <option key={item.id} value={item.article}>{item.article}</option>
                            ))}
                        </select>
                    </div>
                    <div className='title-input'>
                        <h5>Description</h5>
                        <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder='Veuillez saisir la description...' />
                    </div>
                    <div className='title-input'>
                        <h5>Client</h5>
                        <select className='styled-input' name="client" value={formData.client} onChange={handleChange}>
                            <option value="">Veuillez sélectionner un client...</option>
                            {clients.map(client => (
                                <option key={client.id} value={`${client.first_name} ${client.last_name}`}>
                                    {`${client.first_name} ${client.last_name}`}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='title-input'>
                        <h5>Quantité</h5>
                        <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} placeholder='Veuillez saisir la quantité...' />
                    </div>
                    <div className='title-input'>
                        <h5>Prix unitaire</h5>
                        <input type="number" name="unit_price" value={formData.unit_price} onChange={handleChange} placeholder='Veuillez saisir le prix unitaire...' />
                    </div>
                    <div className='title-input'>
                        <h5>Catégorie</h5>
                        <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder='Veuillez saisir la catégorie...' />
                    </div>
                    <button type="submit" className='validate'>{formData.id ? 'Mettre à jour' : 'Ajouter'}</button>
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
                        <th>Quantité</th>
                        <th>Prix unitaire</th>
                        <th>Catégorie</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredSales.length > 0 ? (
                        filteredSales.map(sale => (
                            <tr key={sale.id}>
                                <td>{sale.article || 'N/A'}</td>
                                <td>{sale.description || 'N/A'}</td>
                                <td>{sale.client || 'N/A'}</td>
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
                            <td colSpan={7}>Aucune vente trouvée.</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SalesPage;
