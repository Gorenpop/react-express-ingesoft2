import Navbar from '../pages/Navbar';
import Hero from '../pages/Hero';
import compostarImg from "../img/assets/4.jpg";
import './compostarStyles.css';


function Nosotros() {
    return (
        <>
            <Navbar />
            <Hero
                cName="hero"
                heroImg={compostarImg}
                title="Nosotros"
                paragraph="Conoce al equipo de Compostify"
            />
        </>
    )
}

export default Nosotros;