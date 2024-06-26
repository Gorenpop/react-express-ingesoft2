import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Add this line
import logo from "../img/Log.png";
import "./CompostRequestStyle.css";

function CompostRequest() {
    const [formData, setFormData] = useState({
        quality: '',
        amount: '',
        type: '',
        destiny: '',
        idUser_id: ''
    });
    const [price, setPrice] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (name === 'amount') {
            const amount = parseFloat(value);
            const calculatedPrice = amount / 20 * 55000;
            setPrice(calculatedPrice.toFixed(2));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verificar si el valor de amount es negativo
        if (formData.amount < 0) {
            alert('El valor de litros no puede ser negativo');
            return; // Detener el envío de la solicitud
        }

        const dataToSend = {
            ...formData,
            price: price
        };

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/recolecta`, dataToSend);
            console.log(response.data);
            alert('¡La solicitud se envió correctamente!');
            window.location.href = "/";
        } catch (error) {
            console.error('Error adding recolecta:', error);
        }
    };


    return (
        <>
            <nav className="NavbarItems">
                <Link className="nav-link-logo" to="/">
                    <div className="logoContainer">
                        <img src={logo} alt="Logo" />
                        <h1 className="navbar-logo" >Compostify</h1>
                    </div>
                </Link>
            </nav>
            <div className="compost-request-container">
                <h1>Solicitar recolección</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="quality">Calidad:</label>
                        <select id="quality" name="quality" value={formData.quality} onChange={handleChange} required>
                            <option value="">Seleccionar calidad</option>
                            <option value="super">Super</option>
                            <option value="alta">Alta</option>
                            <option value="media">Media</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="amount">Litros:</label>
                        <input type="number" id="amount" name="amount" value={formData.amount} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">COP: {price}</label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="type">Origen:</label>
                        <select id="type" name="type" value={formData.type} onChange={handleChange} required>
                            <option value="">Seleccionar origen</option>
                            <option value="vegetal">Vegetal</option>
                            <option value="animal">Animal</option>
                            <option value="semi-industrial">Semi-Industrial</option>
                            <option value="semi-procesado">Semi-Procesado</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="destiny">Destino:</label>
                        <input type="text" id="destiny" name="destiny" value={formData.destiny} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="idUser_id">ID de Usuario:</label>
                        <input type="number" id="idUser_id" name="idUser_id" value={formData.idUser_id} onChange={handleChange} required />
                    </div>
                    <div className="separator"></div>
                    <button type="submit">Enviar solicitud</button>
                </form>
            </div>
        </>
    );
}

export default CompostRequest;
