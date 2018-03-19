import React from "react";
import hank from '../assets/Hank_Hill.png';

const Footer = () => {
    return (
        <footer className='app-footer'>
            <p className="disclaimer">This website is for development purposes only. Please DO NOT try to purchase anything.<img className="hank" src={hank} alt="hank"/></p>
        </footer>
    )
}

export default Footer;