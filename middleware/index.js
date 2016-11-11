//used index.js because this name is required.
//It is home! This name needs to be there for the setup to work.
//index.js is a special name
var Campground      = require("../models/campground");
var Comment         = require("../models/comment");

//all the middleware goes here
var middlewareObj = {};
middlewareObj.checkCampgroundOwnership = function (req, res, next){
    //is user logged in
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                req.flash("error", "Campground not found");
                res.redirect("back");
            }else{
                 //does user own the campground?
                 //foundCampground.author.id & req.user._id is  mongoose object
                 //so use .toString() to compare them
                 var authorId= foundCampground.author.id.toString();
                  var userId = req.user._id.toString();
                 if(authorId === userId){
                     next();
           
                 }else{
                     req.flash("error", "You don't have permission to do that");
                      //otherwise, redirect
                     res.redirect("back");
                 }
            }
        });
    }else{
        req.flash("error", "You need to be Logged in to do that");
        //if not redirect
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function (req, res, next){
    //is user logged in
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            }else{
                 //does user own the comment?
                 //foundcomment.author.id & req.user._id is  mongoose object
                 //so use .toString() to compare them
                 var authorId= foundComment.author.id.toString();
                  var userId = req.user._id.toString();
                 if(authorId === userId){
                     next();
           
                 }else{
                      req.flash("error", "You don't have permission to do that");
                      //otherwise, redirect
                     res.redirect("back");
                 }
            }
        });
    }else{
        req.flash("error", "You need to be logged in to do that");
        //if not redirect
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    //use flash first and then redirect
    //It means in error add this "Please login first" text
    //It is not displaying anything to user yet
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}

module.exports =middlewareObj;



