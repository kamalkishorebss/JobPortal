var Parentmodel  = require('../model/parentmodel');
//***********adding compnay unqiue*********************

/* save */
module.exports.Parent  = function(req,res){

        var parent = new Parentmodel();
		parent.parentTitle = req.body.parentTitle;
		parent.file        = req.file.filename;
		parent.role        = "parent";

//console.log(req.body);

  parent.save(function(err,data){
     if(err){
                res.send(err);
              }
              else{
                res.send(data);
              }
      })
    
};


 //**view all parent **//
module.exports.viewparent = function(req,res)
	{
		Parentmodel.find({},function(err,data)
		{
			if(err)
			{
				console.log(err);
			}
			else
			{
				res.send(data);
			}
		});
	};


/* add child page */
module.exports.child  = function(req,res){

        var childs = new Parentmodel();
		childs.parentTitle = req.body.titleParent;
		childs.childTitle  = req.body.titleChild;
		childs.Sdesc       = req.body.htmlcontent;
		childs.file        = req.file.filename;
		childs.status      = req.body.Radios;
		childs.role        = "child";

//console.log(req.body);

  childs.save(function(err,data){
     if(err){
                res.send(err);
              }
              else{
                res.send(data);
              }
      })
    
};

/* view all child */
module.exports.viewChilds = function(req,res)
	{ 
		
		Parentmodel.find({role:"child"},function(err,data)
		{
			if(err)
			{
				console.log(err);
			}
			else
			{
				res.send(data);
			}
		});
	};



/* find by id */
module.exports.viewChild = function(req,res)
	{ 
		var uid = req.params.id;
		console.log(uid);
		Parentmodel.findById(uid,function(err,data)
		{
			if(err)
			{
				console.log(err);
			}
			else
			{
				res.send(data);
			}
		});
	};


/**delete child**/
module.exports.deleteChild = function(req,res)
	{ 
		var uid = req.params.id;
		console.log(uid);
		Parentmodel.findByIdAndRemove(uid,function(err,data)
		{
			if(err)
			{
				console.log(err);
			}
			else
			{
				res.send(data);
			}
		});
	};

module.exports.editChildsave = function(req, res)
	{
		var uid = req.params.id;
		
		//console.log(uid);
	  Parentmodel.findById(uid, function(err, child) 
	  {

		child.parentTitle = req.body.parentTitle;
		child.childTitle  = req.body.childTitle;
		child.Sdesc       = req.body.htmlcontent;
	    child.status      = req.body.optionsRadios;
 		child.save(function(err,store)
		{
       if (err) {
				res.send(err);
           }
		   else{
			   res.send(store);
		   }
		
     });
	  });
	};

