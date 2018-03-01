import axios from "axios";


const GET_PRODUCTS = "GET_PRODUCTS"


export function getProducts() {
    return {
    type: GET_PRODUCTS,
    payload: axios
        .get("/api/products")
        .then(res => {
            return res.data;
        }).catch(console.log)
    }
}


const initialState = {
    products: [],
    isLoading: false,
    didErr: false,
    errMessage: null
}


export default function products(state = initialState, action) {
    switch(action.type) {
        case `${GET_PRODUCTS}_PENDING`:
        return Object.assign({}, state, { isLoading: true });

    case `${GET_PRODUCTS}_FULFILLED`:
        return Object.assign({}, state, { isLoading: false, product: action.payload});

    case `${GET_PRODUCTS}_REJECTED`:
        return Object.assign({}, state, { isLoading: false, didErr: true, errMessage: action.payload});

    default:
        return state; 
    } 
}