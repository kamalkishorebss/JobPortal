var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({

user_type : { type:String},
email     : { type:String ,index: {unique:true}},
name      : { type:String },
username  : { type:String ,index: {unique:true}},
password  : { type:String },
address   : { type:String },
location  : { type:String },
file      : { type:String },
description : { type:String }

});

var Admin =mongoose.model('register',userSchema);

module.exports =Admin;
