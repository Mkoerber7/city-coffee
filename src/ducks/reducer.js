import axios from "axios";

// CONSTANTS

const GET_USER = "GET_USER";
const GET_PRODUCTS = "GET_PRODUCTS";
const ADD_TO_CART = "ADD_TO_CART";
const GET_CART = "GET_CART";
const REMOVE_ONE_CART = "REMOVE_ONE_CART";


const initialState = {
    user: [],
    products: [],
    cart: [],
    isLoading: false,
    didErr: false,
    errMessage: null
};


// ACTION CREATORS
//Get Users from database
export function getUser() {
    return {
    type: GET_USER,
    payload: axios
        .get("/api/currentuser")
        .then(res => {
            console.log(res.data)
            return res.data;
        })
        .catch(err => {
            return err.message;
        })
    };
};

export function getProducts() {
    return {
    type: GET_PRODUCTS,
    payload: axios
        .get("/api/products")
        .then(response => {
            console.log(response + `From get products in reducer`)
            return response.data;
        }).catch(console.log)
    };
};

export function addToCart(user_id, product_id, cart_quantity) {
    return {
        type: ADD_TO_CART,
        payload: axios
            .post("/api/addtocart", {
                user_id: user_id,
                product_id: product_id,
                cart_quantity: 1,
            })
            .then(res => {
                return res.data;
            }).catch(console.log)
    };
};

export function getCart() {
    return {
        type: GET_CART,
        payload: axios
            .get("/api/getCart")
            .then(res => {
                return res.data;
            }).catch(console.log)
    };
};

export function removeOne() {
    return {
        type: REMOVE_ONE_CART,
        payload: axios
            .delete("/api/removeOneCart")
            .then(res => {
                return res.data;
            }).catch(console.log)
    };
};


export default function reducer (state = initialState, action) {
    console.log(action.type)
    switch(action.type) {
        case `${GET_USER}_PENDING`:
            return Object.assign({}, state, { isLoading: true });

        case `${GET_USER}_FULFILLED`:
            return Object.assign({}, state, { isLoading: false, user: action.payload});

        case `${GET_USER}_REJECTED`:
            return Object.assign({}, state, { isLoading: false, didErr: true, errMessage: action.payload});

        case `${GET_PRODUCTS}_PENDING`:
            return Object.assign({}, state, { isLoading: true });
    
        case `${GET_PRODUCTS}_FULFILLED`:
            return Object.assign({}, state, { isLoading: false, products: action.payload});
    
        case `${GET_PRODUCTS}_REJECTED`:
            return Object.assign({}, state, { isLoading: false, didErr: true, errMessage: action.payload});

        case `${ADD_TO_CART}_PENDING`:
            return Object.assign({}, state, { isLoading: true });

        case `${ADD_TO_CART}_FULFILLED`:
            return Object.assign({}, state, { isLoading: false, cart: action.payload});
    
        case `${ADD_TO_CART}_REJECTED`:
            return Object.assign({}, state, { isLoading: false, didErr: true, errMessage: action.payload});

        case `${GET_CART}_PENDING`:
            return Object.assign({}, state, { isLoading: true});

        case`${GET_CART}_FULFILLED`:
            return Object.assign({}, state, { isLoading: false, cart: action.payload});

        case`${GET_CART}_REJECTED`:
            return Object.assign({}, state, { isLoading: false, didErr: true, errMessage: action.payload});

        case `${REMOVE_ONE_CART}_PENDING`:
            return Object.assign({}, state, { isLoading: true});

        case `${REMOVE_ONE_CART}_FULFILLED`:
            return Object.assign({}, state, { isLoading: false, cart: action.payload});

        case `${REMOVE_ONE_CART}_REJECTED`:
            return Object.assign({}, state, { isLoading: false, didErr: true, errMessage: action.payload});

        default:
            return state;
    }
}