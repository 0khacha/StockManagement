import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Edit, Trash2 } from "react-feather";
import { useSearch } from '../Header/SearchContext.jsx'; // Assurez-vous que le chemin d'importation est correct

function SupplierPage() {
    const { searchQuery } = useSearch();
    const [suppliers, setSuppliers] = useState([]);
    const [formData, setFormData] = useState({
        id: '',
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        address: ''
    });

    const fetchSuppliers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://127.0.0.1:8000/api/supplier', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setSuppliers(response.data.suppliers);
            console.log(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des fournisseurs :', error);
            setSuppliers([]); // Ensure suppliers is an empty array on error
            if (error.response && error.response.status === 401) {
                alert('Vous n\'êtes pas autorisé. Veuillez vous connecter.');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (formData.id) {
                await axios.put(`http://127.0.0.1:8000/api/supplier/${formData.id}`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            } else {
                await axios.post('http://127.0.0.1:8000/api/supplier', formData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            }
            fetchSuppliers();
            resetForm();
        } catch (error) {
            console.error('Erreur lors de la soumission du fournisseur :', error);
            if (error.response && error.response.status === 401) {
                alert('Vous n\'êtes pas autorisé. Veuillez vous connecter.');
            }
        }
    };

    const handleEdit = (supplier) => {
        setFormData({ ...supplier });
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://127.0.0.1:8000/api/supplier/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchSuppliers();
        } catch (error) {
            console.error('Erreur lors de la suppression du fournisseur :', error);
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

    useEffect(() => {
        fetchSuppliers();
    }, []);

    // Filtrer les fournisseurs en fonction de la requête de recherche
    const filteredSuppliers = suppliers.filter(supplier =>
        supplier.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        supplier.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        supplier.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        supplier.phone_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        supplier.address.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='supplier-screen client-screen'>
            <div className='forme'>
                <form onSubmit={handleSubmit} className='formulaire'>
                    <input type="hidden" name="id" value={formData.id}
                           onChange={(e) => setFormData({...formData, id: e.target.value})}/>
                    <div className='title-input'>
                        <h5>Prénom</h5>
                        <input type="text" name="first_name" value={formData.first_name}
                               onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                               placeholder='Veuillez entrer le prénom ...'/>
                    </div>
                    <div className='title-input'>
                        <h5>Nom</h5>
                        <input type="text" name="last_name" value={formData.last_name}
                               onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                               placeholder='Veuillez entrer le nom ...'/>
                    </div>
                    <div className='title-input'>
                        <h5>Email</h5>
                        <input type="text" name="email" value={formData.email}
                               onChange={(e) => setFormData({...formData, email: e.target.value})}
                               placeholder="Veuillez entrer l'email ..."/>
                    </div>
                    <div className='title-input'>
                        <h5>Numéro de téléphone</h5>
                        <input type="text" name="phone_number" value={formData.phone_number}
                               onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
                               placeholder='Veuillez entrer le numéro de téléphone ...'/>
                    </div>
                    <div className='title-input'>
                        <h5>Adresse</h5>
                        <input type="text" name="address" value={formData.address}
                               onChange={(e) => setFormData({...formData, address: e.target.value})}
                               placeholder="Veuillez entrer l'adresse ..."/>
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
                        <th>Téléphone</th>
                        <th>Adresse</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Array.isArray(filteredSuppliers) && filteredSuppliers.map(supplier => (
                        <tr key={supplier.id}>
                            <td>{supplier.first_name}</td>
                            <td>{supplier.last_name}</td>
                            <td>{supplier.email}</td>
                            <td>{supplier.phone_number}</td>
                            <td>{supplier.address}</td>
                            <td>
                                <div className="action">
                                    <button className="edit" onClick={() => handleEdit(supplier)}>
                                        <Edit className="nav__toggle icon-edit"/>
                                    </button>
                                    <button className="delete" onClick={() => handleDelete(supplier.id)}>
                                        <Trash2 className="nav__toggle icon-delete"/>
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

export default SupplierPage;
