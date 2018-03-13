import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../../ducks/reducer';


class Product extends Component {
    constructor(props) {
        super(props);

        this.state = {
            quantity: 1,
            total: 0
        }

        this.handleQuantity = this.handleQuantity.bind(this);
    }


    handleQuantity = (val) => {
        this.setState({
            quantity: val.target.value,
            total : this.props.products[this.props.match.params.id].price * parseInt(val.target.value)
        });
    }


    render() {
        console.log('product on state: ', this.props.products);
        let singleProductView = this.props.products.length > 0
            let id = this.props.match.params.id;
            let productDetails = this.props.products[`${id}`];
            let user_id = this.props.user.id;
            let product_id = productDetails.id;
        
        return(
            <div className="product-container">
            {productDetails.name}
            <img className="big-img" src={require(`../assets/${productDetails.img_url}`)} alt="product images"/>
            {productDetails.price}
            <div>Enter Quantity<input value={this.state.quantity} onChange = {(e) => this.handleQuantity(e)}></input></div>
            <button onClick = {() => this.props.addToCart(user_id, product_id, this.state.quantity)}>Add to Cart</button>
            </div>
            
        )
        //The render method's return is below
        return { singleProductView };
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { addToCart })(Product);