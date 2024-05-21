import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Edit, Trash2 } from "react-feather";

function SupplierPage() {
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
            setSuppliers(response.data);
        } catch (error) {
            console.error('Error fetching suppliers:', error);
            if (error.response && error.response.status === 401) {
                alert('You are not authorized. Please log in.');
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
            console.error('Error submitting supplier:', error);
            if (error.response && error.response.status === 401) {
                alert('You are not authorized. Please log in.');
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
            console.error('Error deleting supplier:', error);
            if (error.response && error.response.status === 401) {
                alert('You are not authorized. Please log in.');
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

    return (
        <div className='supplier-screen client-screen'>
            <div className='forme'>
                <form onSubmit={handleSubmit} className='formulaire'>
                    <input type="hidden" name="id" value={formData.id} onChange={(e) => setFormData({ ...formData, id: e.target.value })} />
                    <div className='title-input'>
                        <h5>First name</h5>
                        <input type="text" name="first_name" value={formData.first_name} onChange={(e) => setFormData({ ...formData, first_name: e.target.value })} placeholder='Please enter the name ...'/>
                    </div>
                    <div className='title-input'>
                        <h5>Last name</h5>
                        <input type="text" name="last_name" value={formData.last_name} onChange={(e) => setFormData({ ...formData, last_name: e.target.value })} placeholder='Please enter the first name ...'/>
                    </div>
                    <div className='title-input'>
                        <h5>Email </h5>
                        <input type="text" name="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder='Please enter the email ...'/>
                    </div>
                    <div className='title-input'>
                        <h5>Phone Number</h5>
                        <input type="text" name="phone_number" value={formData.phone_number} onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })} placeholder='Please enter the phone number ...'/>
                    </div>
                    <div className='title-input'>
                        <h5>Address</h5>
                        <input type="text" name="address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} placeholder='Please enter the address ...'/>
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
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {suppliers.map(supplier => (
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
