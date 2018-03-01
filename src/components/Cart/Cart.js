import React, { Component } from "react";
import { connect } from "react-redux";
// import { withRouter } from "react-router-dom";

class Cart extends Component {
    render() {
        return (
            <div>
              <h1>Cart</h1>
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Cart);