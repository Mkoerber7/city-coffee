import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getUser } from "../../ducks/reducer"
import tank from "../assets/propaneTanks.png"

class Home extends Component {
    componentDidMount() {
        this.props.getUser();
    }
    render() {
        return (
            <div className="home-container">
             <p className="join-us">Join Us This Weekend For...</p>
             <p className="grill-title">GRILLSTRAVIGANZA!!!</p>
             <p className="deals">25% - 50% Off All Products</p>
             <div className="tank-container">
               <img className="tank1" src={tank} alt="tanks"/>
               <img className="tank2" src={tank} alt="tanks"/>
             </div>
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps, { getUser })(Home));