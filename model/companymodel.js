var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema ({

name : { type:String },
email : { type:String, index: { unique: true } },
manger : { type:String},
address : { type:String},
admin    : { type:String},
location : { type:String},
file     : { type:String},
discription : { type:String}
});
var User =mongoose.model('company',userSchema);
module.exports =User;
