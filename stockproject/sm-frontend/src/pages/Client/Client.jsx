import React, { useState, useEffect } from 'react';
import { Edit, Trash2 } from 'react-feather';
import axios from 'axios';
import { useSearch } from '../../components/Header/SearchContext.jsx'; // Assurez-vous que le chemin d'importation est correct
import './client.css';

function Client() {
    const { searchQuery } = useSearch();
    const [formData, setFormData] = useState({
        id: '',
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        address: ''
    });

    const [clients, setClients] = useState([]);

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://127.0.0.1:8000/api/clients', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setClients(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des clients :', error);
            if (error.response && error.response.status === 401) {
                alert('Vous n\'êtes pas autorisé. Veuillez vous connecter.');
            }
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
            const requestData = { ...formData };

            if (formData.id) {
                await axios.put(`http://127.0.0.1:8000/api/clients/${formData.id}`, requestData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            } else {
                await axios.post('http://127.0.0.1:8000/api/clients', requestData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            }
            fetchClients();
            resetForm();
        } catch (error) {
            console.error('Erreur lors de la soumission des données du formulaire :', error);
            if (error.response && error.response.status === 401) {
                alert('Vous n\'êtes pas autorisé. Veuillez vous connecter.');
            }
        }
    };

    const handleEdit = (client) => {
        setFormData({ ...client });
    };

    const handleDelete = async (clientId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://127.0.0.1:8000/api/clients/${clientId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchClients();
        } catch (error) {
            console.error('Erreur lors de la suppression du client :', error);
            if (error.response && error.response.status === 401) {
                alert('Vous n\'êtes pas autorisé. Veuillez vous connecter.');
            }
        }
    };

    const resetForm = () => {
        setFormData({
            id: '',
            first_name: '',
            last_name: '',
            email: '',
            phone_number: '',
            address: ''
        });
    };

    // Filtrer les clients en fonction de la requête de recherche
    const filteredClients = clients.filter(client =>
        client.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.phone_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.address.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='client-screen'>
            <div className='forme'>
                <form onSubmit={handleSubmit} className='formulaire'>
                    <input type="hidden" name="id" value={formData.id} />
                    <div className='title-input'>
                        <h5>Prénom</h5>
                        <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} placeholder='Veuillez entrer le prénom ...' />
                    </div>
                    <div className='title-input'>
                        <h5>Nom</h5>
                        <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} placeholder='Veuillez entrer le nom ...' />
                    </div>
                    <div className='title-input'>
                        <h5>Email</h5>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Veuillez entrer l'email ..." />
                    </div>
                    <div className='title-input'>
                        <h5>Numéro de téléphone</h5>
                        <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} placeholder='Veuillez entrer le numéro de téléphone ...' />
                    </div>
                    <div className='title-input'>
                        <h5>Adresse</h5>
                        <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Veuillez entrer l'adresse ..."/>
                    </div>
                    <button type="submit" className='validate'>{formData.id ? 'Mettre à jour' : 'Ajouter'}</button>
                </form>
            </div>
            <div className='ttable'>
                <table>
                    <thead>
                    <tr>
                        <th>Prénom</th>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Numéro de téléphone</th>
                        <th>Adresse</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredClients.map(client => (
                        <tr key={client.id}>
                            <td>{client.first_name}</td>
                            <td>{client.last_name}</td>
                            <td>{client.email}</td>
                            <td>{client.phone_number}</td>
                            <td>{client.address}</td>
                            <td>
                                <div className="action">
                                    <button className="edit" onClick={() => handleEdit(client)}>
                                        <Edit className="nav__toggle icon-edit" />
                                    </button>
                                    <button className="delete" onClick={() => handleDelete(client.id)}>
                                        <Trash2 className="nav__toggle icon-delete" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Client;
