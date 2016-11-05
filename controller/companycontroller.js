var Companymodel  = require('../model/companymodel');
var nodemailer = require('nodemailer'); 
var transporter = nodemailer.createTransport('smtps://kamalk@ocodewire.com:kamal@2016@smtp.gmail.com');
//***********adding compnay unqiue*********************
module.exports.add  = function(req,res){
//console.log(req.body);
var company = new Companymodel();
company.admin     = req.body.adminName;
company.name      = req.body.name;
company.email     = req.body.email;
company.manger    = req.body.mangername; 
company.address   = req.body.address;
company.location  = req.body.location;
company.file        = req.file.filename;
company.discription = req.body.htmlcontent;
Companymodel.findOne({email:req.body.email},function(err,person){
	if(err){
		res.send(err);
	}
	else{
		if(!person){
			company.save(function(err,data){
				if(err){
		            res.send(err);
	            }
	            else{
	            	res.send(data);
	            }
			})
		}else{
console.log("Email or username name aleady taken");
}}});}



//**** find all post ***//
module.exports.viewCompnay = function(req,res)
	{
		Companymodel.find({},function(err,data)
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


//**view compnay list by admin	
	module.exports.viewCompanies = function(req,res)
	{
		var admin = req.params.ad;
		//console.log("hello"+admin);
		Companymodel.find({admin:admin},function(err,data)
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
//*******edit company************
module.exports.editCompany = function(req, res)
	{
		var uid = req.params.id;
		
	  Companymodel.findById(uid, function(err, info) 
	  {
       if (err) {
				res.send(err);
           }
		   else{
			   res.send(info);
		   }
	  
     });
	};

//******save edited blog************

module.exports.saveCompany = function(req, res)
	{
		var uid = req.params.id;
		
		
	  Companymodel.findById(uid, function(err, company) 
	  {
		company.name = req.body.name;
        company.email = req.body.email;
        company.address = req.body.address; 
        company.location = req.body.location; 
        company.manger    = req.body.mangername; 
        company.discription = req.body.htmlcontent;
            //console.log(req.body);
         		company.save(function(err,store)
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

//******** view company *********
module.exports.viewCompany = function(req, res)
	{
		var uid = req.params.id;
		
	  Companymodel.findById(uid, function(err, info) 
	  {
       if (err) {
				res.send(err);
           }
		   else{
			   res.send(info);
		   }
	  
     });
	};

//** delete**//
module.exports.delete = function(req, res)
	{
		var uid = req.params.id;
		
	  Companymodel.findByIdAndRemove(uid, function(err, info) 
	  {
       if (err) {
				res.send(err);
           }
		   else{
			   res.send(info);
		   }
	  
     });
	};


/*sending email reminder*/
module.exports.reminder = function(req, res) {
  var data = req.body;
    //console.log(req.body);

    transporter.sendMail({

        from: '<h2>JobPortal</h2>',
        to:   data.email,
        subject:'Email Reminder',
        text: "Create schedule to employees."
    });
 
    //res.json(data);

};

