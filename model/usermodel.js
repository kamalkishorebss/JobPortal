var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({

	firstname: String,
	email: {type:String, index: {unique:true}},
	address:{type:String},
	city:{type:String},
	country:{type:String},
	username:{type:String,index: {unique:true}},
	password: {type:String},
	authtoken:{type:String},
	name:{type:String},
	usermail :{type:String},
    file:String
	
});

var User = mongoose.model('signup', userSchema);

module.exports = User;