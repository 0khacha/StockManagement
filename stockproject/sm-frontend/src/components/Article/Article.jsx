import React, { useState, useEffect } from 'react';
import { Edit, Trash2 } from "react-feather";
import axios from 'axios';
import "./Article.css";

function Articles() {
    const [newArticle, setNewArticle] = useState({
        id: '',
        article: '',
        category: '',
        quantity: '',
        unit_price: '',
        validate_date: '',
        description: '',
        image: '',
        localisation: ''
    });

    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/article');
            setArticles(response.data);
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewArticle({ ...newArticle, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (newArticle.id) {
                await axios.put(`http://127.0.0.1:8000/api/article/${newArticle.id}`, newArticle);
            } else {
                await axios.post('http://127.0.0.1:8000/api/article', newArticle);
            }
            fetchArticles();
            resetForm();
        } catch (error) {
            console.error('Error submitting article:', error);
        }
    };

    const handleEdit = (article) => {
        setNewArticle({ ...article });
    };

    const handleDelete = async (articleId) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/article/${articleId}`);
            fetchArticles();
        } catch (error) {
            console.error('Error deleting article:', error);
        }
    };

    const resetForm = () => {
        setNewArticle({
            id: '',
            article: '',
            category: '',
            quantity: '',
            unit_price: '',
            validate_date: '',
            description: '',
            image: '',
            localisation: ''
        });
    };

    return (
        <div className='article-screen client-screen'>
            <div className='forme'>
                <form action="" className='formulaire' onSubmit={handleSubmit}>
                    <input type="hidden" name="id" value={newArticle.id} />
                    <div className='title-input'>
                        <h5>Article</h5>
                        <input type="text" name="article" value={newArticle.article} onChange={handleInputChange} placeholder='Please enter the article ...'/>
                    </div>
                    <div className='title-input'>
                        <h5>Category</h5>
                        <input type="text" name="category" value={newArticle.category} onChange={handleInputChange} placeholder='Please enter the category ...'/>
                    </div>
                    <div className='title-input'>
                        <h5>Quantity</h5>
                        <input type="text" name="quantity" value={newArticle.quantity} onChange={handleInputChange} placeholder='Please enter the quantity ...'/>
                    </div>
                    <div className='title-input'>
                        <h5>Unit Price</h5>
                        <input type="text" name="unit_price" value={newArticle.unit_price} onChange={handleInputChange} placeholder='Please enter the unit price ...'/>
                    </div>
                    <div className='title-input'>
                        <h5>validating Date</h5>
                        <input type="date" name="validate_date" value={newArticle.validate_date} onChange={handleInputChange} />
                    </div>
                    <div className='title-input'>
                        <h5>Description</h5>
                        <input type="text" name="description" value={newArticle.description} onChange={handleInputChange} placeholder='Please enter the description ...'/>
                    </div>
                    <div className='title-input'>
                        <h5>Localisation</h5>
                        <input type="text" name="localisation" value={newArticle.localisation} onChange={handleInputChange} placeholder='Please enter the localisation ...'/>
                    </div>
                    <div className='title-input'>
                        <h5>Image</h5>
                        <input type="file" name="image" accept="image/*" onChange={handleInputChange} />
                    </div>
                    <button type="submit" className='validate'>Validate</button>
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
                        <th>Localisation</th>
                        <th>Validating Date</th>
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
                            <td>{article.unit_price}</td>
                            <td>{article.localisation}</td>
                            <td>{article.validate_date}</td>
                            <td>{article.description}</td>
                            <td>{article.image}</td>
                            <td>
                                <button className="edit" onClick={() => handleEdit(article)}><Edit className="nav__toggle icon-edit"/></button>
                                <button className="delete" onClick={() => handleDelete(article.id)}><Trash2 className="nav__toggle icon-delete"/></button>
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
