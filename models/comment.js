var mongoose = require("mongoose");
//Comments Schema
var commentSchema = mongoose.Schema({
   text: String,
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   }
});

module.exports = mongoose.model("Comment", commentSchema);