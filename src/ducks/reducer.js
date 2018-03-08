import axios from "axios";

// CONSTANTS

const GET_USER = "GET_USER";
const GET_PRODUCTS = "GET_PRODUCTS";
const ADD_TO_CART = "ADD_TO_CART";


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

export function addToCart(user_id, product_id, quantity) {
    return {
        type: ADD_TO_CART,
        payload: axios
            .post("/api/addtocart", {
                user_id: user_id,
                product_id: product_id,
                quantity: quantity,
            })
            .then(res => {
                return res.data;
            }).catch(console.log)
    };
};

// export function getOneProduct() {
//     return {
//         type: GET_ONE_PRODUCT,
//         payload: axios
//             .get("/api/product/:id")
//             .then(res => {
//                 return res.data;
//             })
//             .catch(console.log)
//     };
// };



// INITIAL STATE


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
        console.log(`now im pending`)
            return Object.assign({}, state, { isLoading: true });

        case `${ADD_TO_CART}_FULFILLED`:
        console.log(`now im fulfilled`, action.payload)
            return Object.assign({}, state, { isLoading: false, cart: action.payload});
    
        case `${ADD_TO_CART}_REJECTED`:
        console.log(`now im rejected`)
            return Object.assign({}, state, { isLoading: false, didErr: true, errMessage: action.payload});

        default:
            return state;
    }
}