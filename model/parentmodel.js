var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema ({
			parentTitle  : {type:String},
			childTitle   : {type:String},
			Sdesc        : {type:String},
			file         : {type:String},
			parents      : {type:String},
			head         : {type:String},
			status       : {type:String},
			role         : {type:String}
});
var Parent     =mongoose.model('parent',userSchema);
module.exports =Parent;

