var Catagorymodel = require('../model/catagorymodel');

module.exports.saveCatagory = function(req,res){
    var catagory = new Catagorymodel();

    
    catagory.catagories  = req.body.catagories;

	//console.log(req.body.catagories);
	catagory.save(function(err,data){
			if(err){
				console.log(err);
			}
			else{
				console.log(data);
				res.send(data);
			}
		})
	
	};


 module.exports.listCatagory = function(req,res)
    {
        Catagorymodel.find({},function(err,data)
        {
            if(err)
            {
                console.log(err);
            }
            else
            {
                //console.log(data);
                res.send(data);
            }
        });
    };      