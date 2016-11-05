var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema ({

admin:{ type:String },
content:{ type:String },
company_id:{ type:String },
companyManger:{ type:String },
title : { type:String },
age :  { type:String },
salary : { type:String },
experience : { type:String },
qualification : { type:String },
address : { type:String },
location : { type:String },
description  :{ type:String },
catagories : { type:String },
created_at:{type:Date },
updated_at:{type:Date }

});

userSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});

var User =mongoose.model('Job',userSchema);

module.exports =User;
