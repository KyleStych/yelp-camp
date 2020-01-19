var express = require('express')
var app = express()
var port = 3000

const dotenv = require('dotenv');

var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var seedDB = require("./seeds");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/user");
var methodOverride = require("method-override");
var flash = require("connect-flash");

// Routes reqs
var commentRoutes    = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes      = require("./routes/index");

dotenv.config();
var dbUser = process.env.DB_USER;
var dbPass = process.env.DB_PASS;
var dbCluster = process.env.DB_CLUSTER;
var mongoDatabase  = process.env.DB_MONGO;


mongoose
.connect(`mongodb+srv://${dbUser}:${dbPass}@${dbCluster}.mongodb.net/${mongoDatabase}?retryWrites=true&w=majority`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
.then(() => console.log(`DB "${mongoDatabase}" Connected!`))
.catch(err => {
    console.log(`DB Connection Error: ${err.message}`);
});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());


// seedDB(); // seed the database

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "This whole place smells like roast beef",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Pass user info as middleware to all routes
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(port, () => console.log(`YelpCamp app listening on port ${port}!`))