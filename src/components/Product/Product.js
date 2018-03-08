import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../../ducks/reducer';


class Product extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        console.log('product on state: ', this.props.products);
        let singleProductView = () => {
        if(this.props.products.length !== undefined && this.props.products.length !== 0) {
            let id = this.props.match.params.id;
            console.log(this.props.products);
            let productDetails = this.props.products[`${id}`];
            let user_id = this.props.user.id;
            console.log('This is productDetails.id: ',productDetails.id);
            let product_id = productDetails.id;
            console.log('this is product_id: ', product_id);
            let quantity = productDetails.quantity;
        
        return(
            <div className="product-container">
            <img className="big-img" src={require(`../assets/${productDetails.img_url}`)} alt="product images"/>
              {productDetails.name}
              {productDetails.price}

              <button onClick = {() => this.props.addToCart(user_id, product_id, quantity)}>Add to Cart</button>
            </div>
            
        )}}
        //The render method's return is below
        return(singleProductView());
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { addToCart })(Product);