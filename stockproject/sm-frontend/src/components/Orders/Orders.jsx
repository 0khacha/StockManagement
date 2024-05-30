import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Edit, Trash2 } from "react-feather";
import { SearchContext } from './../Header/SearchContext.jsx'; // Assurez-vous que le chemin d'importation est correct

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
    const { searchQuery } = useContext(SearchContext); // Assurez-vous d'avoir une searchQuery dans le SearchContext

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
            console.log('Données des fournisseurs:', response.data); // Afficher les données des fournisseurs
            setSuppliers(Array.isArray(response.data.suppliers) ? response.data.suppliers : []);
        } catch (error) {
            console.error('Erreur lors de la récupération des fournisseurs:', error);
            if (error.response && error.response.status === 401) {
                alert('Vous n\'êtes pas autorisé. Veuillez vous connecter.');
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
            console.log('Données des commandes:', response.data);
            const ordersData = Array.isArray(response.data.orders) ? response.data.orders : [];
            setOrders(ordersData);
        } catch (error) {
            console.error('Erreur lors de la récupération des commandes:', error);
            setError('Erreur lors de la récupération des données des commandes');
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
                setSuccess('Commande mise à jour avec succès');
            } else {
                await axios.post('http://127.0.0.1:8000/api/orders', formData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setSuccess('Commande ajoutée avec succès');
            }
            fetchOrders();
            resetForm();
        } catch (error) {
            console.error('Erreur lors de la soumission des données du formulaire:', error);
            setError('Erreur lors de la soumission des données du formulaire');
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
            setSuccess('Commande supprimée avec succès');
        } catch (error) {
            console.error('Erreur lors de la suppression de la commande:', error);
            setError('Erreur lors de la suppression de la commande');
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

    // Filtrer les commandes en fonction de la requête de recherche
    const filterOrders = (orders, searchQuery) => {
        return orders.filter(order => {
            // Convertir la quantité en chaîne si c'est un nombre
            const quantityStr = typeof order.quantity === 'number' ? order.quantity.toString() : order.quantity;
            return (
                order.article.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                quantityStr.toLowerCase().includes(searchQuery.toLowerCase()) || // Utiliser la chaîne de quantité convertie
                order.unit_price.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        });
    };

    const filteredOrders = filterOrders(orders, searchQuery);

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
                               placeholder="Veuillez entrer l'article ..." />
                    </div>
                    <div className='title-input'>
                        <h5>Fournisseur</h5>
                        <select className='styled-input' name="supplier" value={formData.supplier} onChange={handleChange}>
                            <option value="">Veuillez sélectionner un fournisseur...</option>
                            {suppliers.map(supplier => (
                                <option key={supplier.id} value={`${supplier.first_name} ${supplier.last_name}`}>
                                    {`${supplier.first_name} ${supplier.last_name}`}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='title-input'>
                        <h5>Catégorie</h5>
                        <input type="text" name="category" value={formData.category} onChange={handleChange}
                               placeholder='Veuillez entrer la catégorie ...' />
                    </div>
                    <div className='title-input'>
                        <h5>Quantité</h5>
                        <input type="number" name="quantity" value={formData.quantity} onChange={handleChange}
                               placeholder='Veuillez entrer la quantité ...' />
                    </div>
                    <div className='title-input'>
                        <h5>Prix unitaire</h5>
                        <input type="number" name="unit_price" value={formData.unit_price} onChange={handleChange}
                               placeholder='Veuillez entrer le prix unitaire ...' />
                    </div>
                    <div className='title-input'>
                        <h5>Description</h5>
                        <input type="text" name="description" value={formData.description} onChange={handleChange}
                               placeholder='Veuillez entrer la description ...' />
                    </div>
                    <button type="submit" className='validate'>{formData.id ? 'Mettre à jour' : 'Ajouter'}</button>
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
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredOrders.length > 0 ? (
                        filteredOrders.map(order => (
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
                            <td colSpan="7">Aucune commande disponible</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Orders;
