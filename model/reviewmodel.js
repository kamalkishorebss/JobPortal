var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var reviewSchema = new Schema({
  
  userid  : { type:String},
  uname   : { type:String},
  reviews : { type:String},
  status  : { type:String},
  pic     : { type:String},
  created_at:{type:Date },
  updated_at:{type:Date }
 
});

reviewSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});


var User = mongoose.model('review', reviewSchema);

module.exports = User;