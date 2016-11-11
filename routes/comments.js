var express         = require("express");
var router          = express.Router({mergeParams: true});
var Campground      = require("../models/campground");
var Comment         = require("../models/comment");
var middleware      = require("../middleware");
//Comments New
router.get("/new", middleware.isLoggedIn, function(req,res){
    //find campground by Id
    //merge params was added in router to be able to 
    //retrieve this req.params.id here. 
    //It was not able to find it before!
    Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
       } else{
          res.render("comments/new", {campground: campground});
       }
        
    });
    
});

//Comments Create
router.post("/", middleware.isLoggedIn, function(req, res){
    //lookup campground using ID
    Campground.findById(req.params.id, function(err, campground) {
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            //create new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash("error", "Something went wrong");
                    console.log(err);
                }else{
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    req.flash("success", "Successfully added comment");
                   // console.log(comment);
                     //connect new comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    //redirect to campground show page
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
});

//Edit Comments
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        }else {
               res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    });
});

//Update Comments
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    //Id to find by it,  data to update, and callback
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        }else {
            res.redirect("/campgrounds/" +req.params.id);
         }
    });
});

//Destroy Comments
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    //find by id and remove
      Comment.findByIdAndRemove(req.params.comment_id, function(err){
          if(err){
               req.flash("error", "You don't have permission to do that to do that");
              res.redirect("back");
          }else{
               req.flash("success", "Comment deleted");
              res.redirect("/campgrounds/" +req.params.id);
          }
      });
});



module.exports = router;