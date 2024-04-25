import Navbar from '../pages/Navbar';
import './cuentaStyles.css';
import avatar from "../img/default-avatar.png";
import { Link } from 'react-router-dom';
import { ProfileTabsItems, profileConfigItems } from "./ProfileTabsItems";
import React, { useState } from 'react';

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
                                        <div className={UserProfileSettingsActiveTab === 1 && ProfileTabActiveTab === 4 ?
                                            "profile-info active" : "profile-info"}>
                                            <div className="nickavatar">
                                                <div className="avatar-picture">
                                                    <span className="settings-subtitle">Foto de perfil</span>
                                                    <div className="ig-profile-avatar-edit">
                                                        <Link className="avatar">
                                                            <img src={avatar} alt="Logo" className="ig-avatar" ></img>

                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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