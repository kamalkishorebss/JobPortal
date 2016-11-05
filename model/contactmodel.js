var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({


email     : { type:String },
name      : { type:String },
message   : { type:String }

});

var Contact =mongoose.model('contact',userSchema);

module.exports =Contact;
