import { useEffect, useRef, useState } from 'react';
import './GeneralSettings.css';
import userimg from '../images/user.png';
import { useAuth } from '../../AuthProvider.jsx';
import axios from 'axios';
import { sha512 } from "js-sha512";
import ConfirmationModal from "./ConfirmationModal.jsx";

const GeneralSettings = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        image: '',
    });
    const [passwordData, setPasswordData] = useState({
        password: '',
        new_password: '',
        new_password_confirmation: '',
    });
    const [inEditPassword, setInEditPassword] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState(null);
    const [deleteButtonClick, setDeleteButtonClick] = useState(false);
    const [confirmationPassword, setConfirmationPassword] = useState('');

    const [navigateToLogin, setNavigateToLogin] = useState(false);
    const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                first_name: user.first_name || '',
                last_name: user.last_name || '',
                email: user.email || '',
                phone_number: user.phone_number || '',
                image: user.image || '',
            });
        }
    }, [user]);

    useEffect(() => {
        if (navigateToLogin) {
            window.location.href = '/login';
        }
    }, [navigateToLogin]);

    const handleChange = (e) => {
        if (e.target.name === 'image') {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setFormData({
                        ...formData,
                        image: reader.result,
                    });
                };
                reader.readAsDataURL(file);
            }
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handlePasswordChange = (e) => {
        setPasswordData({
            ...passwordData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = window.localStorage.getItem('token');
            if (!token) {
                throw new Error('Aucun jeton trouvé');
            }
            const response = await axios.put('http://127.0.0.1:8000/api/updateUser', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                console.log('Les données utilisateur ont été mises à jour avec succès');
            } else {
                throw new Error('Échec de la mise à jour des données utilisateur');
            }
        } catch (error) {
            console.error('Échec de la mise à jour des données utilisateur', error);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = window.localStorage.getItem('token');
            if (!token) {
                throw new Error('Aucun jeton trouvé');
            }

            if (passwordData.new_password !== passwordData.new_password_confirmation) {
                throw new Error('Le nouveau mot de passe et la confirmation ne correspondent pas');
            }

            const response = await axios.put('http://127.0.0.1:8000/api/updatePassword', {
                password: sha512(passwordData.password),
                new_password: sha512(passwordData.new_password),
                new_password_confirmation: sha512(passwordData.new_password_confirmation),
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                console.log('Le mot de passe a été mis à jour avec succès');
                setPasswordData({
                    password: '',
                    new_password: '',
                    new_password_confirmation: '',
                });
                setInEditPassword(false);
            } else {
                throw new Error('Échec de la mise à jour du mot de passe');
            }
        } catch (error) {
            console.error('Échec de la mise à jour du mot de passe', error);
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            } else if (error.message === 'Le nouveau mot de passe et la confirmation ne correspondent pas') {
                alert('Le nouveau mot de passe et la confirmation ne correspondent pas. Veuillez réessayer.');
            } else {
                alert('Échec de la mise à jour du mot de passe. Veuillez réessayer.');
            }
        }
    };

    const handleConfirmDeleteModal = () => {
        setDeleteButtonClick(true);
        setIsConfirmingDelete(true);
    }

    const handleConfirmDelete = async () => {
        try {
            setIsDeleting(true);
            const token = localStorage.getItem('token');
            const response = await axios.delete('http://127.0.0.1:8000/api/delete-account', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: {
                    password: sha512(confirmationPassword),
                },
            });
            console.log('Compte supprimé avec succès:', response.data);
            window.location.href('/login');
            setNavigateToLogin(true);

        } catch (error) {
            console.error('Erreur lors de la suppression du compte:', error);
            if (error.response && error.response.data && error.response.data.error) {
                setDeleteError(error.response.data.error);
            } else {
                setDeleteError('Une erreur s\'est produite lors de la suppression de votre compte. Veuillez réessayer plus tard.');
            }
        } finally {
            setIsDeleting(false);
        }
    };

    const handleCancelDelete = () => {
        setIsConfirmingDelete(false);
        setConfirmationPassword('');
        setDeleteButtonClick(false);
    };

    const fileInputRef = useRef(null);

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleEdit = () => {
        setInEditPassword(!inEditPassword);
    };

    return (
        <div className='setting-page-profile'>
            <section className='profile-details-section'>
                <h2>Détails du profil</h2>
                <div className='photo-section'>
                    <div className='image'>
                        <img onClick={handleClick} src={formData.image || userimg} alt="utilisateur" />
                    </div>
                    <input ref={fileInputRef} type="file" id="image" name="image" accept="image/*" onChange={handleChange} style={{ display: 'none' }} />
                </div>
                <div className='user-email'>
                    <form onSubmit={handleSubmit}>
                        <div className="name_full">
                            <div className={'first_name'}>
                                <label htmlFor="first_name">Prénom</label>
                                <input
                                    type="text"
                                    id='first_name'
                                    name='first_name'
                                    value={formData.first_name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={'last_name'}>
                                <label htmlFor="last_name">Nom</label>
                                <input
                                    type="text"
                                    id='last_name'
                                    name='last_name'
                                    value={formData.last_name}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id='email'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <label htmlFor="phone">Téléphone</label>
                        <input
                            type="text"
                            id='phone'
                            name='phone_number'
                            value={formData.phone_number}
                            onChange={handleChange}
                        />
                        <button type="submit">Mettre à jour</button>
                    </form>
                </div>
            </section>
            <section className='section-second-box'>
                <section className='password-section'>
                    {inEditPassword ? (
                        <div className="edit-password">
                            <h4 className="title-password">Changer votre mot de passe</h4>
                            <form onSubmit={handlePasswordSubmit}>
                                <div className="password-inputs">
                                    <input
                                        type="password"
                                        placeholder="Entrez votre mot de passe actuel"
                                        name="password"
                                        value={passwordData.password}
                                        onChange={handlePasswordChange}
                                    />
                                    <div className="new-password-dev">
                                        <input
                                            type="password"
                                            placeholder="Entrez votre nouveau mot de passe"
                                            name="new_password"
                                            value={passwordData.new_password}
                                            onChange={handlePasswordChange}
                                        />
                                        <input
                                            type="password"
                                            placeholder="Confirmez votre nouveau mot de passe"
                                            name="new_password_confirmation"
                                            value={passwordData.new_password_confirmation}
                                            onChange={handlePasswordChange}
                                        />
                                    </div>
                                </div>
                                <button type="submit">Mettre à jour</button>
                                <button type="button" onClick={handleEdit}>Annuler</button>
                            </form>
                        </div>
                    ) : (
                        <div>
                            <h2>Changer le mot de passe</h2>
                            <p>Pour changer votre mot de passe, veuillez entrer votre mot de passe actuel et votre nouveau mot de passe ci-dessous.</p>
                            <button onClick={handleEdit}>Changer le mot de passe</button>
                        </div>
                    )}
                </section>
                <section className='delete-account-section'>
                    <h2>Supprimer le compte</h2>
                    <p>Si vous souhaitez supprimer votre compte, veuillez cliquer sur le bouton ci-dessous.</p>
                    <button onClick={handleConfirmDeleteModal}>Supprimer le compte</button>
                    {deleteButtonClick && (
                        <ConfirmationModal
                            message="Êtes-vous sûr de vouloir supprimer votre compte ?"
                            output={isDeleting && 'Suppression du compte, veuillez patienter...'}
                            result={() => deleteError ? deleteError.toString() : ''}
                            onConfirm={handleConfirmDelete}
                            onCancel={handleCancelDelete}
                            passwordInput={(
                                <input
                                    type="password"
                                    placeholder="Entrez votre mot de passe ..."
                                    value={confirmationPassword}
                                    onChange={(e) => setConfirmationPassword(e.target.value)}
                                />
                            )}
                        />
                    )}
                </section>
            </section>
        </div>
    );
};

export default GeneralSettings;
