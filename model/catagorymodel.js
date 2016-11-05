var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({

catagories : { type:String}


});

var Catagory =mongoose.model('catagory',userSchema);

module.exports =Catagory;