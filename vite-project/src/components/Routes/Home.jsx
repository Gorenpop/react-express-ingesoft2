import Navbar from '../pages/Navbar';
import Hero from '../pages/Hero';
import compostarImg from "../img/assets/1.jpg";
import './compostarStyles.css';

function Home() {
    return (
        <>
            <Navbar />
            <Hero
                cName="hero"
                heroImg={compostarImg}
                title="titulo"
                paragraph="lema"
            />
        </>
    )
}

export default Home;