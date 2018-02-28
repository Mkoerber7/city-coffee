import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Shop extends Component {
    render() {
        return (
          <div>
            <h1>Rain</h1>
          </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Shop);