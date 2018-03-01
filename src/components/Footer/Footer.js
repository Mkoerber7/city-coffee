import React from "react";
import footerBeans from '../assets/footerBeans.png'

const Footer = () => {
    return (
        <footer>
          <img className='app-footer' src={footerBeans} alt="footer" />
        </footer>
    )
}

export default Footer;