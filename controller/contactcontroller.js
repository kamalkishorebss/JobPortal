var Contactmodel  = require('../model/contactmodel');
var nodemailer = require('nodemailer'); 
var transporter = nodemailer.createTransport('smtps://kamalk@ocodewire.com:kamal@2016@smtp.gmail.com');


module.exports.contact = function(req, res) {
        
  /*var data = req.body;
     console.log(data.email);*/
    var contacts    = new Contactmodel();

    contacts.name     = req.body.name;
    contacts.email    = req.body.email;
    contacts.message  = req.body.message;
      
contacts.save(function(err,data){
  if(err){
    res.send(err);
  }
  else{
      transporter.sendMail({
          
          from: data.email,
          to:'kamalk@ocodewire.com',
          subject: 'Message from ' + data.subject,
          text: data.message
          
      });
      res.send(data);
  }
 });
 

};

module.exports.people = function(req,res)
	{
		Contactmodel.find({},function(err,data)
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
