import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";

import user from "./ducks/user";
import products from "./ducks/products";

const store = createStore(
    combineReducers({ user, products }), 
    applyMiddleware(promiseMiddleware())
);

export default store;