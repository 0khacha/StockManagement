import React from 'react';
import { Edit, Trash2 } from "react-feather";

function Orders() {
    const Orders = [
        { id: 1, article: 'Article 1', supplier: 'Supplier 1', quantity: 10, otherInfo: 'Info 1' },
        { id: 2, article: 'Article 2', supplier: 'Supplier 2', quantity: 20, otherInfo: 'Info 2' },
        { id: 3, article: 'Article 3', supplier: 'Supplier 3', quantity: 30, otherInfo: 'Info 3' },
        { id: 4, article: 'Article 4', supplier: 'Supplier 4', quantity: 40, otherInfo: 'Info 4' },
    ];

    return (
        <div className='supplier-screen client-screen'>
            <div className='forme'>
                <form action="" className='formulaire'>
                    <div className='title-input'>
                        <h5>Article</h5>
                        <input type="text" placeholder='Please enter the article ...' />
                    </div>
                    <div className='title-input'>
                        <h5>Supplier</h5>
                        <input type="text" placeholder='Please enter the supplier ...' />
                    </div>
                    <div className='title-input'>
                        <h5>Quantity</h5>
                        <input type="text" placeholder='Please enter the quantity ...' />
                    </div>
                    <div className='title-input'>
                        <h5>Other Information</h5>
                        <input type="text" placeholder='Please enter other information ...' />
                    </div>
                    <button className='validate'>Validate</button>
                </form>
            </div>
            <div className='ttable'>
                <table>
                    <thead>
                    <tr>
                        <th>Article</th>
                        <th>Supplier</th>
                        <th>Quantity</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Orders.map(Orders => (
                        <tr key={Orders.id}>
                            <td>{Orders.article}</td>
                            <td>{Orders.supplier}</td>
                            <td>{Orders.quantity}</td>
                            <td>{Orders.otherInfo}</td>
                            <td>
                                <div className={"action"}>
                                    <button className={"edit"}><Edit className="nav__toggle icon-edit" /></button>
                                    <button className={"delete"}><Trash2 className="nav__toggle icon-delete" />
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

export default Orders;
