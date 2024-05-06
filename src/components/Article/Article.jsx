import React from 'react';
import { Edit, Trash2 } from "react-feather";
import  "./Article.css"

function Articles() {
    const articles = [
        { id: 1, article: 'Article 1', category: 'Category 1', quantity: 10, unitPrice: 20, manufacturingDate: '2024-05-04', description: 'Description 1', image: 'image1.jpg' },
        { id: 2, article: 'Article 2', category: 'Category 2', quantity: 20, unitPrice: 30, manufacturingDate: '2024-05-05', description: 'Description 2', image: 'image2.jpg' },
        { id: 3, article: 'Article 3', category: 'Category 3', quantity: 30, unitPrice: 40, manufacturingDate: '2024-05-06', description: 'Description 3', image: 'image3.jpg' },
        { id: 4, article: 'Article 4', category: 'Category 4', quantity: 40, unitPrice: 50, manufacturingDate: '2024-05-07', description: 'Description 4', image: 'image4.jpg' },
    ];

    return (
        <div className='article-screen client-screen'>
            <div className='forme'>
                <form action="" className='formulaire'>
                    <div className='title-input'>
                        <h5>Article</h5>
                        <input type="text" placeholder='Please enter the article ...' />
                    </div>
                    <div className='title-input'>
                        <h5>Category</h5>
                        <input type="text" placeholder='Please enter the category ...' />
                    </div>
                    <div className='title-input'>
                        <h5>Quantity</h5>
                        <input type="text" placeholder='Please enter the quantity ...' />
                    </div>
                    <div className='title-input'>
                        <h5>Unit Price</h5>
                        <input type="text" placeholder='Please enter the unit price ...' />
                    </div>
                    <div className='title-input'>
                        <h5>Manufacturing Date</h5>
                        <input type="date" />
                    </div>
                    <div className='title-input'>
                        <h5>Description</h5>
                        <input type="text" placeholder='Please enter the description ...' />
                    </div>
                    <div className='title-input'>
                        <h5>Image</h5>
                        <input type="file" accept="image/*" className={"file-image"}/>
                    </div>
                    <button className='validate'>Validate</button>
                </form>
            </div>
            <div className='ttable'>
                <table>
                    <thead>
                    <tr>
                        <th>Article</th>
                        <th>Category</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Manufacturing Date</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {articles.map(article => (
                        <tr key={article.id}>
                            <td>{article.article}</td>
                            <td>{article.category}</td>
                            <td>{article.quantity}</td>
                            <td>{article.unitPrice}</td>
                            <td>{article.manufacturingDate}</td>
                            <td>{article.description}</td>
                            <td>{article.image}</td>
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

export default Articles;
