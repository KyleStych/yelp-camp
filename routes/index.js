var express =  require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user")


// ===================
//     | ROUTES |
// ===================

// ROOT ROUTE
router.get('/', (req, res) => res.render("landing"));


// ===================
// AUTH ROUTES
// ===================

// show register form
router.get("/register", (req, res) => {
    res.render("register")
});

// handle sign up logic
router.post("/register", (req, res) => {
    let newUser = new User({username: req.body.username});
    
    User.register(newUser, req.body.password, (err, user) => {
        if(err) {
            req.flash("error", err.message);
            console.log(err);
            return res.render("register")
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp " + user.username)
            res.redirect("/campgrounds")
        });
    });
});

// show login form
router.get("/login", (req, res) => {
    res.render("login");
});

// handle login logic
router.post("/login", passport.authenticate("local", {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), (req, res) => {
});

// logout route
router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "User successfully logged out")
    res.redirect("/campgrounds");
});

module.exports = router;
