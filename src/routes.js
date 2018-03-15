import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import Shop from "./components/Shop/Shop";
import Contact from "./components/Contact/Contact";
import Cart from "./components/Cart/Cart";
import Product from "./components/Product/Product";

export default (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/shop" component={Shop} />
        <Route path="/contact" component={Contact} />
        <Route path="/cart" component={Cart} />
        <Route path="/product/:id" component={Product} />

        <Route path="*" render={() => (
            <div>
                <p>Not Found</p>
            </div>
        )}
      />
    </Switch>
)