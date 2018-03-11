import React, { Component } from "react";
import { connect } from "react-redux";
// import { withRouter } from "react-router-dom";
import { getCart } from "../../ducks/reducer" 

class Cart extends Component {
    constructor(props) {
        super(props)
    };

componentDidMount() {
    this.props.getCart();
}
    
    render() {
        let cartView;
        console.log(this.props.cart);
        if(this.props.cart.length !== undefined && this.props.cart.length !== 0) {
            cartView = this.props.cart.map((curr, index) => {
                return(
                    <div className="cart-products" key = {index}>
                        <img className = 'product-img' src={require(`../assets/${curr.img_url}`)} alt="product images"/>
                        <h2>{curr.name}</h2>
                        <div>{curr.price}</div>
                        <div>{curr.cart_quantity}</div>
                    </div>
                )
            })
        }
        return (
            <div className="cart-container">
              <h1>Shopping Cart</h1>
              { cartView }
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { getCart })(Cart);