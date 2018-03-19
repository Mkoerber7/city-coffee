require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const passport = require("passport");
const massive = require("massive");
const Auth0Strategy = require("passport-auth0");
const path = require("path");
const configureStripe = require("stripe");

const port = process.env.PORT || 3210;

const app = express(); 

app.use(express.static(`${__dirname}/../build`));


// Database
const {
    CONNECTION_STRING,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    SESSION_SECRET,
    STRIPE_SECRET_KEY
} = process.env

massive(CONNECTION_STRING)
.then(db => {
    app.set("db", db);
}).catch(console.log);


const stripe = configureStripe(STRIPE_SECRET_KEY);
// Middlewares

app.use(json());
app.use(cors());

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 100000
    }
})
);

// Authentication

app.use(passport.initialize());
app.use(passport.session());

const currentUser = [];
const allProducts = [];

passport.use(
    new Auth0Strategy(
        {
            domain: DOMAIN,
            clientSecret: CLIENT_SECRET,
            clientID: CLIENT_ID,
            scope: "openid profile",
            callbackURL: "/auth"
        },
        (accessToken, refreshToken, extraParams, profile, done) => {
            app
            .get("db")
            .getUserByAuthId(profile.id)
            .then(response => {
                if(!response[0]) {
                    app
                    .get("db")
                    .createUserByAuthId([profile.id, profile.name.givenName, profile.name.familyName])
                    .then(created => done(null, created[0])).catch(err => console.log(err));
                } else {
                    return done(null, response[0]);
                }
            });
        }
    )
);

passport.serializeUser((user, done) => done(null,user));
passport.deserializeUser((user, done) => done(null, user));

// Endpoints 

// Auth0 - 

app.get("/auth", passport.authenticate("auth0", {
    successRedirect: "/#/",
    failureRedirect: "/auth"
  }));

// Login

app.get("/api/currentuser", (req, res) => {
    if(req.user) {
        currentUser.push(req.user);
        res.status(200).json(req.user);
    } else res.status(400).json({message: "User Not Logged In"})
});

//Logout

app.get("/api/logout", (req, res) => {
    req.logout();
    req.session.destroy(() => {
        res.redirect("http://localhost:3000/#/")
    })
});

//get products

app.get("/api/products", (req,res) => {
    req.app
      .get("db")
      .getProducts()
      .then(response => {
          allProducts.push(response)
          res.json(response);
        }).catch(console.log)
});

// add to cart

app.post("/api/addtocart", (req, res) => {
    const db = req.app.get("db");
    const userId = currentUser[0].id;
    const { product_id, cart_quantity } = req.body;
    console.log(product_id, cart_quantity, userId)
    db
      .addToCart([userId, product_id, cart_quantity])
      .then(cart => res.status(200).json(cart))
      .catch(err => {
          res.status(500).json(err);
      });
});

app.get("/api/getCart", (req, res) => {
    const db = req.app.get("db");
    const userId = currentUser[0].id;
    db
      .viewCart(userId)
      .then(cart => {
          res.status(200).json(cart)})
      .catch(err => {
          res.status(500).json(err);
      });
});

app.delete("/api/cart/:product_id", (req, res) => {
    const db = req.app.get("db");
    const userId = currentUser[0].id;
    console.log(userId, req.user, req.params.product_id)
    const product = req.params.product_id;
    db
      .removeOne([userId, product])
      .then( cart => {
          res.status(200).json(cart)
      }).catch(err => {
          res.status(500).json(err);
      });
});

app.put("/api/cart/quantity", (req, res) => {
    console.log(req.body)
    const db = req.app.get("db");
    const { product_id, cart_quantity, user_id } = req.body;
    db
      .updateQuantity([user_id, product_id, cart_quantity])
      .then( cart => {
          console.log(cart);
          res.status(200).json(cart)})
      .catch(err => {
          console.log(err)
          res.status(500).json(err);
      });    
});

// STRIPE PAYMENT

const postStripeCharge = res => (stripeErr, stripeRes) => {
    if(stripeErr) {
        res.status(500).json({error: stripeErr});

    } else {
        res.status(200).json({success: stripeRes});
    }
};

app.post("/api/cart/checkout", (req, res) => {
    stripe.charges.create(req.body, postStripeCharge(res));
});

// app.get("/api/test", (req, res) => {
//     req.app
//     .get('db')
//     .getUser()
//     .then(response => {
//         res.status(200).json(response)
//     }).catch(err => {
//         console.log(err)
//         res.status(500).json(err);
//     });
// });


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(port, () => {
    console.log(`I'm deadass listening on port: ${port}`);
});