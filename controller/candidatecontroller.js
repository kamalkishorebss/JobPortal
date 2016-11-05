var Candidatemodel  = require('../model/candidatemodel');
var nodemailer = require('nodemailer'); 
var transporter = nodemailer.createTransport('smtps://kamalk@ocodewire.com:kamal@2016@smtp.gmail.com');
//**adding compnay unqiue**//
module.exports.addcandidate  = function(req,res){
    
    


     var candidate = new Candidatemodel();
			
          var sata ={};

          sata = req.body.user;
   
          //var bata  =  JSON.stringify(sata);

			candidate.user = JSON.stringify(sata);
			candidate.comp = req.body.comp;
			candidate.div  = req.body.farm;	
            candidate.job_title = req.body.job_title;
            candidate.name = req.body.name;
            candidate.mngr = req.body.mangerName; 
            candidate.admin = req.body.admin; 
            console.log(req.body.mangerName);

			candidate.save(function(err,data){
				if(err){
		            res.send(err);
	            }
	            else{
	            	var option = {
                    from : 'Client Request',
                    to   : data.mngr,
                    subject : "Candidate Apply for job" + data.job_title,
                    //html : 'Change password link here <a href = '+ token +'>Link</a>'
                };
                transporter.sendMail(option,function(error,info){
                  if (error) return error;
                  console.log('Message sent'+ info.response);
                });
	            	//console.log(data);
	            	res.send(data);
	            }
			})
};


//**all candidate**//

module.exports.candidate = function(req,res){


Candidatemodel.find({},function(err,info){
   
   if(err){
   	res.send(err);
   }
   else{
   	res.send(info);
   }

});

}


//**candidate  location admin wise**//

module.exports.candidateWise = function(req,res){

var admin = req.params.nm;
Candidatemodel.find({admin:admin},function(err,info){
   
   if(err){
   	res.send(err);
   }
   else{
   	res.send(info);
   }

});

}


//**edit candidate**//
module.exports.editcandidate = function(req, res)
	{
		var uid = req.params.id;
		
	  Candidatemodel.findById(uid, function(err, info) 
	  {
       if (err) {
				res.send(err);
           }
		   else{
			   res.send(info);
		   }
	  
     });
	};

//**candidate profile**//
module.exports.candidateprofile = function(req, res)
	{
		var uid = req.params.id;

		//console.log(uid);
		
	  Candidatemodel.findById(uid, function(err, info) 
	  {
       if (err) {
				res.send(err);
           }
		   else{
			   res.send(info);
		   }
	  
     });
	};


module.exports.saveCandidate = function(req, res)
	{
		var uid = req.params.id;
		
		
	  Candidatemodel.findById(uid, function(err, candidate) 
	  {
						candidate.username = req.body.username;
						candidate.email    = req.body.email;
						candidate.age      = req.body.age;
						candidate.address  = req.body.address;
						candidate.firstname= req.body.firstname;
						candidate.lastname = req.body.lastname;
						candidate.gender   = req.body.gender;
						candidate.phone   = req.body.phone;
						candidate.country = req.body.country;
						candidate.city    = req.body.city;
						candidate.state   = req.body.state;
						candidate.experience    = req.body.experience;
						candidate.qualification = req.body.qualification;
						candidate.business     = req.body.bussiness;
       candidate.save(function(err,store)
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


//**delete candidate**//
	module.exports.deletecandidate = function(req, res)
	{
		var uid = req.params.id;
		
	  Candidatemodel.findByIdAndRemove(uid, function(err, info) 
	  {
       if (err) {
				res.send(err);
           }
		   else{
			   res.send(info);
		   }
	  
     });
	};