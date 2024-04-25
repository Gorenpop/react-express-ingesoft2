import "./HeroStyles.css";
import { Link } from "react-router-dom";

function Hero(props) {
    return (
        <>
            <div className={props.cName}>
                <img className="Hero-Image" alt="HeroImg" src={props.heroImg} />
                <div className="hero-text">
                    <h1>{props.title}</h1>
                    <h2 >{props.paragraph}</h2>
                    <Link to={props.url} className={props.bttnClass}>{props.buttonText}</Link>
                </div>
            </div>
        </>
    )
}

export default Hero;