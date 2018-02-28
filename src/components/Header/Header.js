import React from "react";
import logo from '../../City-wok-guy.png';
import { Link } from "react-router-dom";

const Header = () => {
    return (
    <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <ul class = 'nav-container'>
            <li><Link to="/">Home</Link></li>
            <li><a href={process.env.REACT_APP_LOGIN}>Login</a></li>
          </ul>
        </header>
    )
};

export default Header;

