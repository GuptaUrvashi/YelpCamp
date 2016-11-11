var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nec consequat eros. Nam volutpat metus vel dolor elementum, eget viverra tortor ornare. Nam imperdiet efficitur congue. Etiam consequat non arcu sit amet porta. Phasellus massa quam, sollicitudin quis est ac, bibendum iaculis lacus. In hac habitasse platea dictumst. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed velit metus, eleifend nec vestibulum quis, semper eu tellus. Etiam commodo diam lectus, et dignissim enim tristique sit amet."
    },
    {
        name: "Desert Mesa", 
        image: "https://farm4.staticflickr.com/3859/15123592300_6eecab209b.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nec consequat eros. Nam volutpat metus vel dolor elementum, eget viverra tortor ornare. Nam imperdiet efficitur congue. Etiam consequat non arcu sit amet porta. Phasellus massa quam, sollicitudin quis est ac, bibendum iaculis lacus. In hac habitasse platea dictumst. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed velit metus, eleifend nec vestibulum quis, semper eu tellus. Etiam commodo diam lectus, et dignissim enim tristique sit amet."
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nec consequat eros. Nam volutpat metus vel dolor elementum, eget viverra tortor ornare. Nam imperdiet efficitur congue. Etiam consequat non arcu sit amet porta. Phasellus massa quam, sollicitudin quis est ac, bibendum iaculis lacus. In hac habitasse platea dictumst. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed velit metus, eleifend nec vestibulum quis, semper eu tellus. Etiam commodo diam lectus, et dignissim enim tristique sit amet."
    }
]

function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        Comment.remove({},function(err){
            if(err){
                console.log(err);
            }
            console.log("removed comments");
         //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a campground");
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
        });
    }); 
    //add a few comments
}

module.exports = seedDB;



