import React from 'react';
import { Link } from 'react-router-dom'; // Add this line
import './LoginForm.css';
import { FaUser, FaLock } from "react-icons/fa";
import logo from "../img/Log.png";
import Hero from '../pages/Hero';
import compostarImg from "../img/assets/5.jpg";

const LoginForm = () => {
    return (
        <>
            <Hero
                cName="hero"
                heroImg={compostarImg}
            />
            <nav className="NavbarItems">
                <Link className="nav-link-logo" to="/">
                    <div className="logoContainer">
                        <img src={logo} alt="Logo" />
                        <h1 className="navbar-logo" >Compostify</h1>
                    </div>
                </Link>
            </nav>
            <div className="wrapper-container">
                <div className='wrapper'>
                    <form action="">
                        <h1>Iniciar sesión</h1>
                        <div className="inputbox">
                            <input type="text" placeholder='Usuario' required />
                            <FaUser className='icon' />

                        </div>
                        <div className="inputbox">
                            <input type="password" placeholder='Contraseña' required />
                            <FaLock className='icon' />

                        </div>

                        <div className="remember-forgot">
                            <label><input type="checkbox" />Recuerdame</label>
                            <a href='#forgot-password'>¿Olvidaste tu contraseña?</a>
                        </div>
                        <button type="submit">Login</button>
                        <div className="register-link" id="register-link">
                            <p>¿Aún no tienes cuenta?<a href='/RegisterForm'>  Registrarme</a></p>
                        </div>
                    </form>

                    <div id="forgot-password">
                        {/* Forgot Password Content */}
                    </div>

                    <div id="register">
                        {/* Register Content */}
                    </div>

                </div>
            </div>
        </>
    );
};

export default LoginForm;