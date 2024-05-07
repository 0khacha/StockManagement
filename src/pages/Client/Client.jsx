import React from 'react';
import { Edit, Trash2 } from "react-feather";
import './client.css';

function Client() {
    const clients = [
        { id: 1, firstName: 'Mohamed', lastName: 'Khacha', email: 'email@example.com', phoneNumber: '123456789', address: '123 Main St' },
        { id: 2, firstName: 'Hicham', lastName: 'Imalal', email: 'email@example.com', phoneNumber: '987654321', address: '456 Elm St' },
        { id: 3, firstName: 'Mohamed', lastName: 'hicham', email: 'email@example.com', phoneNumber: '456123789', address: '789 Oak St' },
    ];

    return (
        <div className='client-screen'>
            <div className='forme'>
                <form action="" className='formulaire'>
                    <div className='title-input'>
                        <h5>First Name</h5>
                        <input type="text" placeholder='Please enter the first name ...'/>
                    </div>
                    <div className='title-input'>
                        <h5>Last Name</h5>
                        <input type="text" placeholder='Please enter the last name ...'/>
                    </div>
                    <div className='title-input'>
                        <h5>Email</h5>
                        <input type="email" placeholder='Please enter the email ...'/>
                    </div>
                    <div className='title-input'>
                        <h5>Phone Number</h5>
                        <input type="text" placeholder='Please enter the phone number ...'/>
                    </div>
                    <div className='title-input'>
                        <h5>Address</h5>
                        <input type="text" placeholder='Please enter the address ...'/>
                    </div>
                    <button className='validate'>Validate</button>
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
                            <td>{client.firstName}</td>
                            <td>{client.lastName}</td>
                            <td>{client.email}</td>
                            <td>{client.phoneNumber}</td>
                            <td>{client.address}</td>
                            <td>
                                <div className="action">
                                    <button className="edit"><Edit className="nav__toggle icon-edit" /></button>
                                    <button className="delete"><Trash2 className="nav__toggle icon-delete" /></button>
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
