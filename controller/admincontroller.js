var Adminmodel = require('../model/adminmodel');

var nodemailer = require('nodemailer'); 
var transporter = nodemailer.createTransport('smtps://kamalk@ocodewire.com:kamal@2016@smtp.gmail.com');

module.exports.save = function(req,res){
    var admin = new Adminmodel();

    admin.user_type = "subadmin";
    admin.name      = req.body.name;
    admin.email     = req.body.email;
    admin.address   = req.body.address;
    admin.username  = req.body.username;
    admin.password  = req.body.password;
    admin.location  = req.body.location;
    admin.file      = req.file.filename;
    admin.description  = req.body.description;


   console.log(req.body);
    
    	//db.registers.insert({"user_type":"admin","username":"admin","password":"admin","user_type":"admin"})		

     Adminmodel.findOne({email:req.body.email},function(err,person){
    	
    	if(err){
    		console.log(err);
    	}

    	else{

    		if(!person){
    			admin.save(function(err,data){
    				if(err){
    					console.log(err);
    				}
    				else{
    					//console.log(data);
    					res.send(data);
    				}
    			})
    		}
    		else{
                  console.log("Email address aleardy taken");
                }
    		}
     })
    		};




/*login*/
module.exports.log =  function(req, res) 
{
   var username  = req.body.username;
   var password  = req.body.password;
          
		Adminmodel.find({ $and: [ { username: username  }, { password: password } ] }).exec(function(err,data)
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


/*send email*/
module.exports.mailSend = function(req, res) {
     
     var email = req.body.email;
     console.log(email);
     var admin = new Adminmodel();   
     Adminmodel.findOne({email:email},function(err,admin){
           if(err)
           {
            console.log(err);
           }
           else{
            var token = 'http://localhost:3009/dashboard#/changePass';
            admin.save(function(err,data){
              if(err){
                res.send(err);
                console.log(err);
              } 
              else{
                  var option = {
                  from : 'Reset password',
                  to   : admin.email,
                  subject : 'Change Your password',
                  html : 'Change password link here <a href = '+ token +'>Link</a>'
                };
                transporter.sendMail(option,function(error,info){
                  if (error) return error;
                  console.log('Message sent'+ info.response);
                });
              }
              res.send(data);
            });
           }
     })
     };


/* password */
module.exports.changePassword = function(req,res){
 //console.log('verify token: ',req.query.token);
Adminmodel.findOne({email: req.body.email}, function(err,user) {
          if (err)
           { 
            console.error(err); 
           }
            
          else {
                   //console.log(user);
                   return res.redirect('http://localhost:3009/dashboard#/changePass');
               };
    });
};


//** password updated
module.exports.updatedPassword = function(req,res){
  //console.log("password"+req.body.password);
    Adminmodel.findOne({email:req.params.E},function(err,person){
        
        person.password = req.body.password;
            person.save(function (err, data) {
                    if (err) {
                        res.send(err);
                    }
                    else {
                      res.send(data);
                     }
                   });
           });
}


/*view all subadmin*/
   module.exports.listadmin = function(req,res)
	{
		Adminmodel.find({user_type:"subadmin"},function(err,data)
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

module.exports.viewadmin = function(req, res)
	{
		var uid = req.params.id;
		
	  Adminmodel.findById(uid, function(err, info) 
	  {
       if (err) {
				res.send(err);
           }
		   else{
			   res.send(info);
		   }
	  
     });
	};


	module.exports.edit = function(req, res)
	{
		var uid = req.params.id;
		
	  Adminmodel.findById(uid, function(err, info) 
	  {
       if (err) {
				res.send(err);
           }
		   else{
			   res.send(info);
		   }
	  
     });
	};

//**saveadmin**//
module.exports.editSave = function(req, res)
	{
		var uid = req.params.id;
		
		
	  Adminmodel.findById(uid, function(err, admin) 
	  {
		admin.name = req.body.name;
		admin.username = req.body.username;
        admin.email = req.body.email;
        admin.address = req.body.address; 
        admin.location = req.body.location; 
        admin.description = req.body.description;
            //console.log(req.body);
         		admin.save(function(err,store)
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

//**deleteadmin**//
	module.exports.delete = function(req, res)
	{
		var uid = req.params.id;
		
	  Adminmodel.findByIdAndRemove(uid, function(err, info) 
	  {
       if (err) {
				res.send(err);
           }
		   else{
			   res.send(info);
		   }
	  
     });
	};