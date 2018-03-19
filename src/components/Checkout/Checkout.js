import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';

const { REACT_APP_PAYMENT_SERVER_URL_TEST } = process.env;

const CURRENCY = 'USD';

const fromDollarToCent = amount => {
    return amount * 100;
};

const successPayment = (data) => {
    alert('Payment Successful');
};

const errorPayment = (data) => {
    alert('Payment Successful');
};

const onToken = (amount, description) => token => axios.post("/api/cart/checkout", 
    {
    description,
    source: token.id,
    currency: CURRENCY,
    amount: fromDollarToCent(amount)
}).then(successPayment).catch(errorPayment);

//actual Checkout Component
const Checkout = (props) => {    
return(<div className = 'checkout-container'><StripeCheckout name = {props.name} description ={props.description} amount = {fromDollarToCent(props.amount)} token = {onToken(props.amount, props.description)} currency = {CURRENCY} stripeKey = {"pk_test_neF6OrWmotX40f1jQUwvTvdz"} /></div>);
};

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Checkout);