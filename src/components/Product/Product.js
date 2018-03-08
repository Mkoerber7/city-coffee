import React, { Component } from 'react';
import { connect } from 'react-redux';


class Product extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        console.log(this.props);
        let id = this.props.match.params.id;
        if(this.props.products.length !== 0) {
        let productDetails = this.props.products[`${id}`];
        return(
            <div className="product-container">
            <img className="big-img" src={require(`../assets/${productDetails.img_url}`)} alt="product images"/>
              {productDetails.name}
              {productDetails.price}

            <button>Add to Cart</button>
            </div>
            
        )}
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Product);