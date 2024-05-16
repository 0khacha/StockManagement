import React, { useState, useEffect } from 'react';
import { Edit, Trash2 } from "react-feather";
import axios from 'axios';
import './client.css';

function Client() {
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
            const response = await axios.get('http://127.0.0.1:8000/api/clients');
            setClients(response.data);
        } catch (error) {
            console.error('Error fetching clients:', error);
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
            if (formData.id) {
                await axios.put(`http://127.0.0.1:8000/api/clients/${formData.id}`, formData);
            } else {
                await axios.post('http://127.0.0.1:8000/api/clients', formData);
            }
            fetchClients();
            resetForm();
        } catch (error) {
            console.error('Error submitting form data:', error);
        }
    };

    const handleEdit = (client) => {
        setFormData({ ...client });
    };

    const handleDelete = async (clientId) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/clients/${clientId}`);
            fetchClients();
        } catch (error) {
            console.error('Error deleting client:', error);
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

    return (
        <div className='client-screen'>
            <div className='forme'>
                <form onSubmit={handleSubmit} className='formulaire'>
                    <input type="hidden" name="id" value={formData.id} />
                    <div className='title-input'>
                        <h5>First Name</h5>
                        <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} placeholder='Please enter the first name ...'/>
                    </div>
                    <div className='title-input'>
                        <h5>Last Name</h5>
                        <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} placeholder='Please enter the last name ...'/>
                    </div>
                    <div className='title-input'>
                        <h5>Email</h5>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder='Please enter the email ...'/>
                    </div>
                    <div className='title-input'>
                        <h5>Phone Number</h5>
                        <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} placeholder='Please enter the phone number ...'/>
                    </div>
                    <div className='title-input'>
                        <h5>Address</h5>
                        <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder='Please enter the address ...'/>
                    </div>
                    <button type="submit" className='validate'>{formData.id ? 'Update' : 'Add'}</button>
                </form>
            </div>
            <div className='ttable'>
                <table>
                    <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {clients.map(client => (
                        <tr key={client.id}>
                            <td>{client.first_name}</td>
                            <td>{client.last_name}</td>
                            <td>{client.email}</td>
                            <td>{client.phone_number}</td>
                            <td>{client.address}</td>
                            <td>
                                <div className="action">
                                    <button className="edit" onClick={() => handleEdit(client)}>
                                        <Edit className="nav__toggle icon-edit"/>
                                    </button>
                                    <button className="delete" onClick={() => handleDelete(client.id)}>
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

export default Client;
