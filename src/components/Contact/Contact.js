import React from 'react';
import spSketch from "../assets/spSketch.jpg"

const Contact = () => {
        return (
          <div className="contact-container">
            <h1 className="contact-title">Contact</h1>
            <p className="info">Come see us at 135 Los Gatos Road, Arlen, Texas <br/> or give us a call at 123-456-7899. </p>
            <img className="sketch" src={spSketch} alt="Strickland Propane"/>
          </div>
        )
}

export default Contact;