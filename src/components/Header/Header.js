import React,{ Component } from "react";
import logo from '../assets/SPlogo.svg';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Burger from "../assets/burgerMenu.png"


class Header extends Component {
    constructor(props) {
      super(props);

      this.handleClick = this.handleClick.bind(this);

    }

    handleClick() {
      let burgerMenu = this.burgerMenu;
      let burgerBtn = this.burgerBtn;
      if(burgerMenu.classList.contains('show-burger-menu')) {
        burgerMenu.classList.remove('show-burger-menu');
      } else if (burgerMenu.style.display === '') {
        burgerMenu.classList.add('show-burger-menu');
      }
    }

    render() {
      return (
        <header className="App-header">
          <div className="strickland-logo">
            <Link to="/"><img className="App-logo" src={logo} alt="logo"  />
            <div className="company-title">STRICKLAND PROPANE</div></Link>
          </div>

          <div className="nav-bar">
            <ul className = 'nav-container'>
              <li><Link to='/shop'>Shop</Link></li>
              <li><Link to='/contact'>Contact</Link></li>
              <li><Link to='/cart'>Cart</Link></li>
              {this.props.user.id ? <li><a href={process.env.REACT_APP_LOGOUT}>Logout</a></li> : <li><a href={process.env.REACT_APP_LOGIN}>Login</a></li>}
            </ul>
          </div>

          <div className="burger-div">
            <button className = 'burger-btn' ref = {(burgerBtn) => {this.burgerBtn = burgerBtn}} onClick = {this.handleClick}><img className="burger-img" src={Burger} alt="burger menu"/></button>
          </div>

          <div className="burger-menu" ref = {(burgerMenu) => {this.burgerMenu = burgerMenu}}>
            <ul className = 'burger-list'>
              <li className = "burger-links"><Link to='/'>Home</Link></li>
              <li className = "burger-links"><Link to='/shop'>Shop</Link></li>
              <li className = "burger-links"><Link to='/contact'>Contact</Link></li>
              <li className = "burger-links"><Link to='/cart'>Cart</Link></li>
              {this.props.user.id ? <li><a href={process.env.REACT_APP_LOGOUT}>Logout</a></li> : <li><a href={process.env.REACT_APP_LOGIN}>Login</a></li>}
             </ul>
          </div>

        </header>
      )
    }
};

const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps)(Header));

