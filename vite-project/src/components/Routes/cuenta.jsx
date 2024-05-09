import Navbar from '../pages/Navbar';
import './cuentaStyles.css';
import avatar from "../img/default-avatar.png";
import { Link } from 'react-router-dom';
import { ProfileTabsItems, profileConfigItems } from "./ProfileTabsItems";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Cuenta() {
    const [ProfileTabActiveTab, setProfileTabActive] = useState(4);
    const handleProfileTab = (index) => {
        if (ProfileTabActiveTab !== index) {
            setProfileTabActive(index);
        }
    };
    const [UserProfileSettingsActiveTab, setUserProfileSettingsActiveTab] = useState(0);
    const handleUserProfileSettings = (index) => {
        if (UserProfileSettingsActiveTab !== index) {
            setUserProfileSettingsActiveTab(index);
        }
    };
    const [collects, setCollects] = useState([]);
    const [editingCollect, setEditingCollect] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);
    const [calculatedPrice, setCalculatedPrice] = useState(0);


    useEffect(() => {
        getCollects(); 
        getAllCollect();
    }, []);
    const getCollects = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/recolectaActiva`);
            setCollects(response.data.collects);
        } catch (error) {
            console.error('Error getting recolectas:', error);
            alert('Ocurrió un error al obtener las recolectas. Por favor, inténtalo de nuevo más tarde.');
        } 
    };
    const getAllCollect = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/recolectaAll`);
            setCollects(response.data.collects);
        } catch (error) {
            console.error('Error getting all collects:', error);
            alert('Ocurrió un error al obtener todas las recolectas. Por favor, inténtalo de nuevo más tarde.');
        } 
    };
    const handleDelete = async (idOrder) => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/recolecta/delete/${idOrder}`);
            alert('Recolecta eliminada exitosamente');
    
            getCollects(); 
        } catch (error) {
            console.error('Error deleting collect:', error);
            alert('Ocurrió un error al eliminar la recolecta. Por favor, inténtalo de nuevo más tarde.');
        }
    };
    const handleEdit = (collect) => {
        setEditingCollect(collect);
        setShowEditForm(true);
        calculatePrice(collect.amount);
    };
    const calculatePrice = (amount) => {
        const calculatedPrice = amount / 10 * 55000;
        setCalculatedPrice(calculatedPrice);
    };
    const handleSubmitEdit = async (event) => {
        event.preventDefault(); // Prevenir la recarga de la página

        // Obtener los datos del formulario
        const newData = {
            quality: event.target.quality.value,
            amount: event.target.amount.value,
            price: calculatedPrice, 
            destiny: event.target.destiny.value,
            type: event.target.type.value
        };

        try {
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/recolecta/edit/${editingCollect.idOrder}`, newData);
            alert('Los datos se actualizaron correctamente.'); // Alerta de éxito
            setShowEditForm(false);
            setEditingCollect(null);
            getCollects();
        } catch (error) {
            console.error('Error editing collect:', error);
            alert('Ocurrió un error al editar la recolecta. Por favor, inténtalo de nuevo más tarde.');
        }
    };

    const renderTable = () => {
        return (
            <div>
            {showEditForm && editingCollect && (
                <form name="forms-edit-collect" onSubmit={handleSubmitEdit}>
                    <div className='component-form'>
                        <label htmlFor="quality">Calidad:</label>
                        <input type="text" id="quality" defaultValue={editingCollect.quality} />
                    </div>
                    <div className='component-form'>
                        <label htmlFor="amount">Cantidad:</label>
                        <input
                            type="number"
                            id="amount"
                            defaultValue={editingCollect.amount}
                            min="0"
                            onChange={(event) => calculatePrice(event.target.value)}
                        />
                    </div>
                    <div className='component-form'>
                        <label>Precio Calculado:</label>
                        <span style={{ color: 'white', fontSize: '16px' }}>{calculatedPrice}</span>
                    </div>
                    <div className='component-form'>
                        <label htmlFor="destiny">Destino:</label>
                        <input type="text" id="destiny" defaultValue={editingCollect.destiny} />
                    </div>
                    <div className='component-form'>
                        <label htmlFor="type">Tipo:</label>
                        <input type="text" id="type" defaultValue={editingCollect.type} />
                    </div>
                    <button type="submit">Guardar cambios</button>
                </form>
                )}
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th>idOrder</th>
                            <th>quality</th>
                            <th>amount</th>
                            <th>price</th>
                            <th>destiny</th>
                            <th>type</th>
                            <th>Actions</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {collects.map(collect => (
                            <tr key={collect.idOrder}>
                                <td>{collect.idOrder}</td>
                                <td>{collect.quality}</td>
                                <td>{collect.amount}</td>
                                <td>{collect.price}</td>
                                <td>{collect.destiny}</td>
                                <td>{collect.type}</td>
                                <td>
                                    <button onClick={() => handleEdit(collect)}>Editar</button>
                                    <button onClick={() => handleDelete(collect.idOrder)}>Cancelar</button> 
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };
    const renderTableGeneral = () => {
        getAllCollect();
        return (
            <div>
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th>idOrder</th>
                            <th>quality</th>
                            <th>amount</th>
                            <th>price</th>
                            <th>destiny</th>
                            <th>type</th>
                            <th>State</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {collects.map(collect => (
                            <tr key={collect.idOrder}>
                                <td>{collect.idOrder}</td>
                                <td>{collect.quality}</td>
                                <td>{collect.amount}</td>
                                <td>{collect.price}</td>
                                <td>{collect.destiny}</td>
                                <td>{collect.type}</td>
                                <td>{collect.activeOrder}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };
    
    

    return (
        <>
            <Navbar />
            <body className='cuenta-main-region'>
                <div className='main-content'>
                    <div className='user-profile-layout'>
                        <div className='profile-container'>
                            <div className='main-panel'>
                                <div className='avatar-panel'>
                                    <div className='user-avatar own'>
                                        <Link className="avatar">
                                            <img src={avatar} alt="Logo" className="ig-avatar" ></img>
                                        </Link>
                                    </div>
                                    <div className="user-links">
                                        <div className='item title'>
                                            <span className="user-nickname placeholder-nickname">
                                                Compostify-User
                                            </span>
                                        </div>
                                        <div className='ig-profile-info-date'>Miembro desde: abr 03, 2024</div>
                                    </div>
                                </div>
                            </div>
                            <div className='separator'></div>
                            <ul className="user-profile-tabs" >
                                <i className="fa-solid fa-chevron-right"></i>
                                {ProfileTabsItems.map((item, index) => {
                                    return (
                                        <li key={index} onClick={() => handleProfileTab(index)}>
                                            <Link className={ProfileTabActiveTab === index ?
                                                item.cNameActive : item.cName} to={item.url}>
                                                <i className={item.icon}></i>
                                                {item.title}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                            <div className="separator mobile"></div>
                            <div className="user-profile-settings" >
                                <ul className={ProfileTabActiveTab === 1 ?
                                    "active-collect-tabs active" : "active-colect-tabs"} >
                                    <h1 className="table-title">Recolectas activas sobre el usuarío</h1>
                                    {renderTable()}
                                </ul>
                                <ul className={ProfileTabActiveTab === 2 ?
                                    "collect-record-tabs active" : "collect-record-tabs"} >
                                    <h1 className="table-title">Total de recolectas sobre el usuarío</h1>
                                    {renderTableGeneral()}
                                </ul>
                                <ul className={ProfileTabActiveTab === 3 ?
                                    "follow-collect-tabs active" : "follow-collect-tabs"} >
                                    <h1>hello3</h1>
                                </ul>
                                <ul className={ProfileTabActiveTab === 4 ?
                                    "user-profile-settings-tabs active" : "user-profile-settings-tabs"} >
                                    {
                                        profileConfigItems.map((item, index) => {
                                            return (
                                                <li key={index} onClick={() => handleUserProfileSettings(index)}>
                                                    <Link className={UserProfileSettingsActiveTab === index
                                                        ? item.cNameActive : item.cName} to={item.url}>
                                                        <i className={item.icon}></i>
                                                        <div className="lines">
                                                            <span class="title">{item.title}</span>
                                                            <span>{item.content}</span>
                                                        </div>
                                                        <div className="fa-solid fa-chevron-right"></div>
                                                    </Link>
                                                </li>
                                            );
                                        })
                                    }
                                </ul>

                                <div className="separator"></div>
                                <div className="settings-content">
                                    <div className="tab-content-settings">
                                        {/* <div className={UserProfileSettingsActiveTab === 0 && ProfileTabActiveTab === 4 ?
                                            "profile-info active" : "profile-info"}></div> */}
                                        <div className={UserProfileSettingsActiveTab === 1 && ProfileTabActiveTab === 4 ?
                                            "profile-info active" : "profile-info"}>
                                            <div className="nickavatar">
                                                <div className="avatar-picture">
                                                    <span className="settings-subtitle">Foto de perfil</span>
                                                    <div className="ig-profile-avatar-edit">
                                                        <Link className="avatar">
                                                            <img src={avatar} alt="Logo" className="ig-avatar" ></img>
                                                        </Link>
                                                        <i class="fa-solid fa-camera"></i> .jpg .png
                                                        <form className='ig-profile-avatar-editor'>
                                                            <input type="file" name="avatar"></input>
                                                            <input type="submit" className='ig-gradient-btn-pre'></input>
                                                            <input type="hidden" name="process" value="update_avatar"></input>
                                                        </form>
                                                    </div>
                                                </div>
                                                <div className="separator"></div>
                                                <div className="nick">
                                                    <span className="settings-subtitle">Nickname de usuario</span>
                                                    <form className="nickname-editor">
                                                        <input type="text" name="nickname" className='ig-profile-edit-input' maxLength={30} required></input>
                                                        <input type="submit" className='nickname-submit'></input>
                                                        <input type="hidden" name="process" value="update_nickname"></input>
                                                    </form>
                                                </div>
                                            </div>
                                            <div class="separator"></div>

                                        </div>
                                        {/* <div className={UserProfileSettingsActiveTab === 2 && ProfileTabActiveTab === 4 ?
                                            "profile-info active" : "profile-info"}></div>
                                        <div className={UserProfileSettingsActiveTab === 3 && ProfileTabActiveTab === 4 ?
                                            "profile-info active" : "profile-info"}></div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </body >
        </>
    )
}

export default Cuenta;