import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getUser } from "../../ducks/reducer"

class Home extends Component {
    componentDidMount() {
        this.props.getUser();
    }
    render() {
        return (
            <div className="home-container">
             <h1>Strickland Propane</h1>
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps, { getUser })(Home));