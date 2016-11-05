//******** add job by company *********
var Jobmodel  = require('../model/jobmodel');

module.exports.job  = function(req,res){

//console.log(req.body);
//alert(req.body.company_id);
var job          = new Jobmodel();
job.admin        = req.body.admin;
job.content      = req.body.content;
job.company_id   = req.body.company_id;
job.companyManger= req.body.companyemail;
job.title        = req.body.title;
job.age          = req.body.age; 
job.salary       = req.body.salary; 
job.qualification= req.body.qualification; 
job.address      = req.body.address;
job.location     = req.body.location;
job.description  = req.body.htmlcontent;
job.experience   = req.body.experience;
job.catagories   = req.body.catagories;

//console.log(req.body.htmlcontent);

job.save(function(err,data){
				if(err){
		            res.send(err);
	            }
	            else{
	            	res.send(data);
	            }
			})
		
	};


//view all jobs location and catagories******	
module.exports.clJob = function(req,res)
	{
        var location    = req.body.location;
        var catagories  = req.body.catagories;
          
		Jobmodel.find({ $and: [ { location: location  }, { catagories: catagories } ] }).exec(function(err,data)
		 //{ $and: [ { price: { $ne: 1.99 } }, { price: { $exists: true } } ] }
		{
			if(!data)
			{
				console.log(err);
			}
			else
			{
				
				res.send(data);

			}
                

			
		});
	};


//view all jobs*******************	
module.exports.alljob = function(req,res)
	{
		Jobmodel.find({},function(err,data)
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

//** viewjob**//

module.exports.viewjob = function(req, res)
	{
		var uid = req.params.id;

		
	  Jobmodel.findById(uid, function(err, info) 
	  {
       if (err) {
				res.send(err);
           }
		   else{
			   res.send(info);
		   }
	  
     });
	};

	//** edit job**//

module.exports.editjob = function(req, res)
	{
		var uid = req.params.id;

	
	  Jobmodel.findById(uid, function(err, info) 
	  {
       if (err) {
				res.send(err);
           }
		   else{
			   res.send(info);
		   }
	  
     });
	};


//**save edit job**//
module.exports.editjobsave = function(req, res)
	{
		var uid = req.params.id;
		
		//console.log(uid);
	  Jobmodel.findById(uid, function(err, jobs) 
	  {

		jobs.title        = req.body.title;
		jobs.age          = req.body.age; 
		jobs.salary       = req.body.salary;
		jobs.address      = req.body.address;
		jobs.location     = req.body.location;
		jobs.experience   = req.body.experience;
		jobs.description  = req.body.htmlcontent;
        jobs.qualification= req.body.qualification; 
 		jobs.save(function(err,store)
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
	


//**delete job list **//
module.exports.deletejob = function(req, res)
	{

		var uid = req.params.id;
		console.log(uid);
	  Jobmodel.findByIdAndRemove(uid, function(err, info) 
	  {
       if (err) {
				res.send(err);
           }
		   else{
			   res.send(info);
			   //console.log(info);
		   }
	  
     });
     }