require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const passport = require("passport");
const massive = require("massive");
const Auth0Strategy = require("passport-auth0");
const path = require("path");

const port = 3210;

const app = express();
 
// Database
const {
    CONNECTION_STRING,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    SESSION_SECRET
} = process.env

massive(CONNECTION_STRING)
    .then(db => {
        app.set("db", db);
    }).catch(console.log);


// Middlewares

app.use(json());
app.use(cors());
// app.use(express.static(`${__dirname}/../build`));
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
                    .createUserByAuthId([profile.id, profile.displayName])
                    .then(created => done(null, created[0]));
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

app.get("/auth", passport.authenticate("auth0", {
    successRedirect: "http://localhost:3000/#/",
    failureRedirect: "http://localhost:3210/auth"
  }));

app.get("api/currentuser", (req, res) => {
    if(req.user) res.status(200).json(req.user);
    else res.status(400).json({message: "User Not Logged In"})
});

app.get("api/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("http://localhost:3000/#/")
    })
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

app.listen(port, () => {
    console.log(`Listening on Port: ${port}`);
});