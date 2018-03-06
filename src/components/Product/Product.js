import React, { Component } from 'react';
import { connect } from 'react-redux';


class Product extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        console.log(this.props);
        let id = this.props.match.params.id;
        console.log(id);
        if(this.props.products.length !== 0) {
        let productDetails = this.props.products[`${id}`];
        return(
            <div>
              {productDetails.name}
              
              {productDetails.price}
            </div>
        )}
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Product);