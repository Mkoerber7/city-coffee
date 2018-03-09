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
        if(this.props.cart.length !== 0) {
            cartView = this.props.cart.map((curr, index) => {
                return(
                    <div className="cart-products" key = {index}>
                        <h2>{curr.name}</h2>
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