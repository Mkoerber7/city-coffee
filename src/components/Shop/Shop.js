import React, { Component } from 'react';
import { connect } from "react-redux";
// import { withRouter } from "react-router-dom";
import { getProducts } from "../../ducks/reducer"

class Shop extends Component {
  componentDidMount(props) {
    this.props.getProducts();
    console.log(props)
  }
    render() {
      console.log(this.props.products)
        return (
          <div>
            <h1>Shop</h1>
          </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { getProducts })(Shop);