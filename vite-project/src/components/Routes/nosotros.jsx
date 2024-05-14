import Navbar from '../pages/Navbar';
import Hero from '../pages/Hero';
import nosotrosImg from "../img/assets/9.jpg";
import visionImg from "../img/assets/4.jpg";
import sergio from "../img/assets/sergio.jpg";
import christian from "../img/assets/christian.jpg";
import fabio from "../img/assets/fabio.jpg";
import daniel from "../img/assets/daniel.png";
import './nosotrosStyles.css';



function Nosotros() {
    return (
        <>
            <Navbar />
            <Hero
                cName="hero"
                heroImg={nosotrosImg}
                title="Nosotros"
                paragraph="Conoce al equipo de Compostify"
            />
            <h2 className='catchphrase'>"Juntos hacia una Tierra mas fertil"</h2>
            <div className="separator"></div>
            <div className="vision">
                <div className="textContent">
                    <h1 className='title'>Nuestra visión</h1>
                    <p className='text'>Para el 2026 seremos la plataforma número uno en Bogotá
                        para el intercambio de composta marcando un hito en la gestión y sostenibilidad ambiental.</p>
                    <div className="separator"></div>
                    <h1 className='title'>Nuestra misión</h1>
                    <p className='text'>Conectar a familias y empresas generadoras de residuos orgánicos con transformadores,
                        gestionando la recolección de residuos a través de una plataforma digital.</p>
                </div>
                <img className="image" alt="VisionImg" src={visionImg} />
            </div>
            <div className="separator"></div>
            <h2 className='Ustitle'>Our Team</h2>

            <div className="Uscontent">
                {/* daniel */}
                <div className="column">
                    <div className="card">
                        <img className="teamImg" src={daniel} alt="danielImg" />
                        <div className="container">
                            <h2>Daniel Felipe Ahumada Hernandez</h2>
                            <p className="title"></p>
                            <p></p>
                            <p>dahumada@unal.edu.co</p>
                        </div>
                    </div>
                </div>
                {/* christian   */}
                <div className="column">
                    <div className="card">
                        <img className="teamImg" src={christian} alt="christianImg" />
                        <div className="container">
                            <h2>Cristhian Alejandro Alarcón Florido</h2>
                            <p className="title">Product Owner/Programmer</p>
                            <p>Front-end Programmer</p>
                            <p>calarconf@unal.edu.co</p>
                        </div>
                    </div>
                </div>
                {/*fabio */}
                <div className="column">
                    <div className="card">
                        <img className="teamImg" src={fabio} alt="fabioImg" />
                        <div className="container">
                            <h2>Fabio Esteban Murcia Martínez</h2>
                            <p className="title">Programmer</p>
                            <p>Database Programmer</p>
                            <p>fmurciam@unal.edu.co</p>
                        </div>
                    </div>
                </div>
                {/* sergio */}
                <div className="column">
                    <div className="card">
                        <img className="teamImg" src={sergio} alt="sergioImg" />
                        <div className="container">
                            <h2>Sergio Alexander Parada Amarillo</h2>
                            <p className="title">Programmer</p>
                            <p>Front-end Designer & Programmer</p>
                            <p>saparadaa@unal.edu.co</p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Nosotros;