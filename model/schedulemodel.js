var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var sSchema = new Schema ({


username: { type:String },
user_id : { type:String },     
tasks   : { type:String },
date    : { type:String },
day     : { type:String },
stime   : { type:String },
etime   : { type:String },
shift   : { type:String },
mangerC : { type:String },
Status  : { type:String },
created_at:{type:Date },
updated_at:{type:Date }

});

sSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});

var User =mongoose.model('schedule',sSchema);

module.exports =User;