import React, { Component } from "react";
import { connect } from "react-redux";
import { getCart, removeOne, updateQuantity } from "../../ducks/reducer" 

class Cart extends Component {
    constructor(props) {
        super(props)

        this.state = {
            newQuantity: 0,
            newPrice: 0
        };

    this.handleTotal = this.handleTotal.bind(this);    
    this.handleDelete = this.handleDelete.bind(this);
    this.handleQuantity = this.handleQuantity.bind(this);
    this.updateCartQuantity = this.updateCartQuantity.bind(this);
    };

    componentDidMount() {
        this.props.getCart();
    }

    handleTotal = () => {
        const { cart } = this.props;
        let cartTotal;
        if(cart !== undefined && cart.length !== 0) {
            cartTotal = cart.map((curr, index) => {
                return (curr.price);
            }).reduce(function(a,b){
                return a+b;
            });
        }
        return cartTotal;
    }

    handleDelete = (product) => {
        const {user, removeOne, getCart} = this.props;
        removeOne(product);
        getCart();
    }

    handleQuantity = (val) => {
        this.setState({
            newQuantity: val.target.value,
            newPrice: this.props.products[this.props.match.params.id].price * parseInt(val.target.value)
        })
    }

    updateCartQuantity = (user_id, product_id, cart_quantity) => {
        const { user, updateQuantity, getCart } = this.props;
        updateQuantity(user_id, product_id, cart_quantity);
        getCart();
    }


    
    render() {
        let cartView;
        if(this.props.cart.length !== undefined && this.props.cart.length !== 0) {
            cartView = this.props.cart.map((curr, index) => {
                return(
                    <div className="cart-products" key = {index}>
                        <img className = 'product-img' src={require(`../assets/${curr.img_url}`)} alt="product images"/>
                        <h2>{curr.name}</h2>
                        <div>{curr.price * curr.cart_quantity}</div>
                        <input value={curr.cart_quantity} onChange = {(e) => this.handleQuantity(e)}></input>
                        <button onClick = {() => {this.handleDelete(curr.product_id)}}>X</button>
                    </div>
                )
            })
        }
        return (
            <div className="cart-container">
              <h1>Shopping Cart</h1>
              { cartView }
              <div className = 'cart-total'><h3>Total: {this.handleTotal()}</h3></div>
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { getCart, removeOne, updateQuantity })(Cart);