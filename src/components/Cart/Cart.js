import React, { Component } from "react";
import { connect } from "react-redux";
import { getCart, removeOne, updateQuantity } from "../../ducks/reducer";
import Checkout from "../Checkout/Checkout"
import swal from 'sweetalert2';

class Cart extends Component {
    constructor(props) {
        super(props)

    this.handleTotal = this.handleTotal.bind(this);    
    this.handleDelete = this.handleDelete.bind(this);
    this.updateCartQuantity = this.updateCartQuantity.bind(this);
    };

    componentDidMount() {
        this.props.getCart();
    }

    handleTotal = () => {
        const { cart } = this.props;
        let cartTotal;
        if(cart !== undefined && cart.length !== 0) {
            console.log(cart);
            cartTotal = cart.map((curr, index) => {
                return (curr.price * curr.cart_quantity);
            }).reduce(function(a,b){
                return a+b;
            });
        }
        return Number.parseFloat(cartTotal).toFixed(2);
    }

    handleDelete = (product) => {
        const {user, removeOne, getCart} = this.props;
        swal({
            title: 'Are you sure?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false,
            reverseButtons: true
          }).then((result) => {
            if (result.value) {
              removeOne(product);
              swal(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            } else if (
              // Read more about handling dismissals
              result.dismiss === swal.DismissReason.cancel
            ) {
              swal(
                'Cancelled',
              )
            }
          })
        getCart();
    };

    updateCartQuantity = (product_id, e) => {
        const { user, updateQuantity } = this.props;
        console.log(user.id, product_id, e.target.value)
        if(e.target.value === ""){e.target.value = 0}
        updateQuantity(user.id, product_id, parseInt(e.target.value));
    }

    
    render() {
        console.log(this.props.cart)
        const { cart = [], isLoading } = this.props;
        if(isLoading) return <div />; 
            let cartView = cart.map((curr, index) => {
                return(
                    <div className="cart-products" key = {index}>
                      <div className="name-pic">
                        <h2 className="cart-name">{curr.name}</h2>
                        <img id="cart-img" src={curr.img_url ? require(`../assets/${curr.img_url}`) : null} className = 'product-img' alt="product images"/>
                      </div>
                      <div className="cart-deets">
                        <div className="curr-price">${curr.price * curr.cart_quantity}</div>
                        Quantity: <input  className="qty-box" type = "number" value={curr.cart_quantity} onChange = {(e) => this.updateCartQuantity(curr.product_id, e)} ></input>
                        <button className="delete-ghost"onClick = {() => {this.handleDelete(curr.product_id)}}>X</button>
                      </div>
                    </div>
                )
            })

        return (
            <div className="cart-container">
              <h1 className="cart-title" >Shopping Cart</h1>
              { cartView || <div>Cart Is Empty</div> }
              <div className="total-checkout">
              <h3 className="cart-total">Total: ${this.handleTotal()}</h3>
              <Checkout name = {'Strickland Propane'} description = {'Thanks for shopping with us'} amount = {this.handleTotal()}/>
              </div>
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { getCart, removeOne, updateQuantity })(Cart);