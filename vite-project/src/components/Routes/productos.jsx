import Navbar from '../pages/Navbar';
import Hero from '../pages/Hero';
import compostarImg from "../img/assets/8.jpg";
import './compostarStyles.css';
function Productos() {
    return (
        <>
            <Navbar />
            <Hero
                cName="hero"
                heroImg={compostarImg}
                title="Nuestros productos"
                paragraph="Lema"
            />
        </>
    )
}

export default Productos;