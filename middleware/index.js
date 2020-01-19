let Campground = require("../models/campground");
let Comment = require("../models/comment");
// let flash = require("connect-flash")

// all the middleware goes here
let middlewareObj = {};

middlewareObj.checkCampgroundOwnership = (req, res, next) => {
    if (req.isAuthenticated()){
        Campground.findById(req.params.id, (err, foundCampground) => {
            if(err) {
                req.flash("error", "Campground not found");
                res.redirect("back")
            } else {
                //does the user own the campground?
                if(foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to perform this action");
                    res.redirect("back")
                }
            }
        });
    } else {
        req.flash("error", "You must be logged in to perform this action")
        console.log("YOU MUST CONSTRUCT ADDITIONAL PYLONS");
        res.redirect("back")
    };
}

middlewareObj.checkCommentOwnership = (req, res, next) => {
    if (req.isAuthenticated()){
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if(err) {
                res.redirect("back")
            } else {
                //does the user own the comment?
                if(foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permision to perform this action");
                    res.redirect("back")
                }
            }
        });
    } else {
        req.flash("error", "You must be logged in to perform this action");
        console.log("YOU MUST CONSTRUCT ADDITIONAL PYLONS");
        res.redirect("back")
    };
}

middlewareObj.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "Please log in to perform this action")
    res.redirect("/login");
};

module.exports = middlewareObj;