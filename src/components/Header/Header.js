import React from "react";
import logo from '../assets/SPlogo.svg';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";


const Header = (props) => {

    return (
        <header className="App-header">
          <img className="App-logo" src={logo} alt="logo" />

          <ul className = 'nav-container'>
            <li><Link to="/">Home</Link></li>
            <li><Link to='/shop'>Shop</Link></li>
            <li><Link to='/about'>About</Link></li>
            <li><Link to='/contact'>Contact</Link></li>
            <li><Link to='/cart'>Cart</Link></li>
            {props.user.id ? <li><a href={process.env.REACT_APP_LOGOUT}>Logout</a></li> : <li><a href={process.env.REACT_APP_LOGIN}>Login</a></li>}
          </ul>
        </header>
    )
};

const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps)(Header));

