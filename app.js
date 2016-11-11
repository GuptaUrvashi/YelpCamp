var express                 = require("express"),
    app                     = express(),
    bodyParser              = require("body-parser"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    LocalStrategy           = require("passport-local"),
    methodOverride          = require("method-override"),
    Campground              = require("./models/campground"),
    Comment                 = require("./models/comment"),
    User                    = require("./models/user"),
    flash                   = require("connect-flash"),
    seedDB                  = require("./seeds");

//requiring routes
var commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    indexRoutes         = require("./routes/index");
    
//console.log(process.env.DATABASEURL);
//connecting to MongoLab
//mongoose.connect(process.env.DATABASEURL);
//back up option of OR
var url = process.env.DATABASEURL || "mongodb://localhost/your_db_name";
mongoose.connect(url);
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs"); 
app.use(express.static(__dirname +"/public"))
//console.log(__dirname); name of directory
app.use(methodOverride("_method"));
app.use(flash()); // for flash messages on our application
//seedDB(); //seed the database

//Passport Config
app.use(require("express-session")({
    secret: "Bella is awesome dog",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//creating middleware function
//this function is applied on every route
//essentially it is sending currentUser's credientials
//from every route. And this will decide which tabs 
//will show up. Login, SignUp and Logout.
app.use(function (req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next(); //this is imp to let the code continue
   // otherwise everything would stop
});

app.use(indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp server has started!");
});