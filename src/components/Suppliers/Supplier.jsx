// SupplierPage.js

import React from 'react';
import {Edit, Trash2} from "react-feather"; // You may need to create this component

function SupplierPage() {
    const suppliers = [
        { id: 1, firstname: 'Supplier 1',lastname: 'Supplier 1', email: 'supplier1@example.com', phone: '123-456-7890' ,address: 'city1'},
        { id: 2,firstname: 'Supplier 1',lastname: 'Supplier 1', email: 'supplier2@example.com', phone: '234-567-8901',address: 'city1'},
        { id: 3, firstname: 'Supplier 1',lastname: 'Supplier 1', email: 'supplier3@example.com', phone: '345-678-9012',address: 'city1'},
        { id: 4, firstname: 'Supplier 1',lastname: 'Supplier 1', email: 'supplier4@example.com', phone: '345-678-9012',address: 'city1'},
    ];
    return (
            <div className='supplier-screen client-screen'>
                <div className='forme'>
                    <form action="" className='formulaire'>
                        <div className='title-input'>
                            <h5>First name</h5>
                            <input type="text" placeholder='Please enter the name ...'/>
                        </div>
                        <div className='title-input'>
                            <h5>Last name</h5>
                            <input type="text" placeholder='Please enter the first name ...'/>
                        </div>
                        <div className='title-input'>
                            <h5>Email </h5>
                            <input type="text" placeholder='Please enter the email ...'/>
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
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>

                        {suppliers.map(supplier => (
                            <tr key={supplier.id}>
                                <td>{supplier.firstname}</td>
                                <td>{supplier.lastname}</td>
                                <td>{supplier.email}</td>
                                <td>{supplier.phone}</td>
                                <td>{supplier.address}</td>
                                <div className={"action"}>
                                    <button className={"edit"}><Edit className="nav__toggle icon-edit"/></button>
                                    <button className={"delete"}><Trash2 className="nav__toggle icon-delete"/>
                                    </button>
                                </div>

                            </tr>
                        ))}
                    </table>

                </div>
            </div>

    );
}

export default SupplierPage;
