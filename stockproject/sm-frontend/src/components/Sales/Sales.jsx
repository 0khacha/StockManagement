import React from 'react';
import { Edit, Trash2 } from "react-feather";

function SalesPage() {
    const sales = [
        { id: 1, article: 'Article 1', description: 'Description 1', client: 'Client 1', quantity: 10, unitPrice: 100, action: 'Action 1' },
        { id: 2, article: 'Article 2', description: 'Description 2', client: 'Client 2', quantity: 20, unitPrice: 200, action: 'Action 2' },
        { id: 3, article: 'Article 3', description: 'Description 3', client: 'Client 3', quantity: 30, unitPrice: 300, action: 'Action 3' },
        { id: 4, article: 'Article 4', description: 'Description 4', client: 'Client 4', quantity: 40, unitPrice: 400, action: 'Action 4' },
    ];

    return (
        <div className='sales-screen client-screen'>
            <div className='forme'>
                <form action="" className='formulaire'>
                    <div className='title-input'>
                        <h5>Article</h5>
                        <input type="text" placeholder='Please enter the article ...'/>
                    </div>
                    <div className='title-input'>
                        <h5>Description</h5>
                        <input type="text" placeholder='Please enter the description ...'/>
                    </div>
                    <div className='title-input'>
                        <h5>Client</h5>
                        <input type="text" placeholder='Please enter the client ...'/>
                    </div>
                    <div className='title-input'>
                        <h5>Quantity</h5>
                        <input type="text" placeholder='Please enter the quantity ...'/>
                    </div>
                    <div className='title-input'>
                        <h5>Unit Price</h5>
                        <input type="text" placeholder='Please enter the unit price ...'/>
                    </div>
                    <button className='validate'>Validate</button>
                </form>
            </div>
            <div className='ttable'>
                <table>
                    <tr>
                        <th>Article</th>
                        <th>Description</th>
                        <th>Client</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Action</th>
                    </tr>

                    {sales.map(sale => (
                        <tr key={sale.id}>
                            <td>{sale.article}</td>
                            <td>{sale.description}</td>
                            <td>{sale.client}</td>
                            <td>{sale.quantity}</td>
                            <td>{sale.unitPrice}</td>
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

export default SalesPage;
