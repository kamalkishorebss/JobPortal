var Schedulemodel  = require('../model/schedulemodel');

module.exports.Sched  = function(req,res){
Schedulemodel.findOne({username:req.body.username},function(err,person){

    var task      = new Schedulemodel();
	task.username = req.body.username;
	task.user_id  = req.body.userid;
	task.tasks    = req.body.tasks;
	task.date     = req.body.date; 
	task.day      = req.body.day; 
	task.stime    = req.body.stime; 
	task.etime    = req.body.etime;
	task.shift    = req.body.Radios;
	task.mangerC  = req.body.cManger;
	task.Status   = "true";

	//console.log(req.body.userid);
	task.save(function(err,data){
					if(err){
			            res.send(err);
		            }
		            else{
		            	res.send(data);
		            }
				});
});

};

module.exports.ScheduleList = function(req,res){

	var u = req.params.u;

	//console.log(typeof(uid));

	 Schedulemodel.find({username:u},function(err,data){
       if(err){
       	console.log(err);
       }
       else{
       	//console.log(data);
       	res.send(data);
       }
	});
}


//** find schedule on day basis **//
module.exports.daySchedule = function(req,res){

	 Schedulemodel.find({day:"Mon"},function(err,data){
       if(err){
       	console.log(err);
       }
       else{
       	//console.log(data);
       	res.send(data);
       }
	});
}


module.exports.seeAll = function(req,res){

	 Schedulemodel.find({},function(err,data){
       if(err){
       	console.log(err);
       }
       else{
       	//console.log(data);
       	res.send(data);
       }
	});
}


/* find schedule by id*/
module.exports.scheduleOne = function(req,res){
	
	var uid = req.params.id;

     //console.log(uid);

	Schedulemodel.findById(uid,function(err,data){
		if(err){
			res.send(err);
		}
		else{
			res.send(data);
		}
	})
}

/* edit save schedule */
module.exports.editSavetask = function(req, res)
	{
		var uid = req.params.id;
		
		//console.log(uid);
	  Schedulemodel.findById(uid, function(err, event) 
	  {

		
	
		event.tasks    = req.body.tasks;
		event.date     = req.body.date; 
		event.day      = req.body.day; 
		event.stime    = req.body.stime; 
		event.etime    = req.body.etime;
		event.shift    = req.body.Radios;

         

 		event.save(function(err,store)
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
	
//**delete schedule**//

module.exports.deleteOneschedule = function(req,res){
	
	var uid = req.params.id;

     //console.log(uid);

	Schedulemodel.findByIdAndRemove(uid,function(err,data){
		if(err){
			res.send(err);
		}
		else{
			res.send(data);
		}
	});
}