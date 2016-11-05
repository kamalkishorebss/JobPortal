var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema ({
 
 user : {type:String},
 comp : {type:String},
 //job_id:{type:String},
 job_title:{type:String},
 div : {type:String},
 name: {type:String},
 mngr: {type:String},     
 admin:{type:String}
});

var User =mongoose.model('candidate',userSchema);

module.exports =User;