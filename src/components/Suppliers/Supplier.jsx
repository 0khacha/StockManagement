// SupplierPage.js

import React from 'react';
import {Edit, Trash2} from "react-feather"; // You may need to create this component

function SupplierPage() {
    const suppliers = [
        { id: 1, name: 'Supplier 1', email: 'supplier1@example.com', phone: '123-456-7890' ,address: 'city1'},
        { id: 2, name: 'Supplier 2', email: 'supplier2@example.com', phone: '234-567-8901',address: 'city1'},
        { id: 3, name: 'Supplier 3', email: 'supplier3@example.com', phone: '345-678-9012',address: 'city1'},
        { id: 4, name: 'Supplier 4', email: 'supplier4@example.com', phone: '345-678-9012',address: 'city1'},
    ];
    return (
            <div className='supplier-screen client-screen'>
                <div className='forme'>
                    <form action="" className='formulaire'>
                        <div className='title-input'>
                            <h5>Name</h5>
                            <input type="text" placeholder='Please enter the name ...'/>
                        </div>
                        <div className='title-input'>
                            <h5>First name</h5>
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
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>

                        {suppliers.map(supplier => (
                            <tr key={supplier.id}>
                                <td>{supplier.name}</td>
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
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </table>

                </div>
            </div>

    );
}

export default SupplierPage;
