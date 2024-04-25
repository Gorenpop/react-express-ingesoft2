import Navbar from '../pages/Navbar';
import Hero from '../pages/Hero';
import compostarImg from "../img/assets/2.jpg";
import './compostarStyles.css';

function Editar() {
    return (
        <>
            <Navbar />
            <Hero
                cName="hero"
                heroImg={compostarImg}
                title="¡Únete a la Revolución Verde!"
                paragraph="Juntos hacia una Tierra mas fertil"
                url="/compost-request"
                bttnClass="collection-request"
                buttonText="Solicitar recolección"
            />
        </>
    )
}

export default Editar;