var Usermodel = require('../model/usermodel');
var bCrypt = require('bcrypt');
var passport  =  require('passport');
var LocalStrategy =  require('passport-local').Strategy;

var nodemailer = require('nodemailer'); 
var transporter = nodemailer.createTransport('smtps://kamalk@ocodewire.com:kamal@2016@smtp.gmail.com');
//**password hashing**//
var createHash=function(password)
{
    return bCrypt.hashSync(password,bCrypt.genSaltSync(10),null);
}
//**validation**//
var isValidpassword = function(user,password)
{
    return bCrypt.compareSync(password, user.password);
    console.log("compared password"+user.password);
    console.log(user);
}   

//**random token number**//
function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 10; i++ )
    {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

//**userregister**//
module.exports.register = function(req,res){
var user = new Usermodel();

    user.firstname = req.body.firstname;
    user.email     = req.body.email;
    user.address   = req.body.address;
    user.city      = req.body.city;
    user.country   = req.body.country;
    user.username  = req.body.username;
    user.password  = createHash(req.body.password);
    user.file      = req.file.filename;
    user.authtoken = makeid();


    //console.log(req.body);
    Usermodel.findOne({email:req.body.email},function(err,person){
    	if(err){
    		console.log(err);
    	}
    	else{
    		if(!person){
    			user.save(function(err,data){
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

}

//****login****//

passport.use('local' ,new LocalStrategy(function(username, password, done) {
    Usermodel.findOne({'username': username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!isValidpassword(user,password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
     //console.log(user);
     //console.log(user.password);
    });
  }));

//passport serialize user for their session
passport.serializeUser(function(user, done){
  done(null, user.id);
});
//passport deserialize user 
passport.deserializeUser(function(id, done) {
  Usermodel.findById(id, function(err, user) {
    done(err, user);
  });
});




//**send data to db**//
module.exports.sendemail = function(req, res) {
     
     var email = req.body.email;
     var user = new Usermodel();
     user.reset = makeid();

     Usermodel.findOne({email:req.body.email},function(err,user){
           if(err)
           {
            console.log(err);
           }
           else{
            var token = 'http://localhost:3009/#/reset';
            user.save(function(err,data){
              if(err){
                res.send(err);
                console.log(err);
              } 
              else{
                console.log("usersave");
                  var option = {
                  from : 'Reset password',
                  to   : user.email,
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

//**token password **//

module.exports.password = function(req,res){
 //console.log('verify token: ',req.query.token);
Usermodel.findOne({email: req.body.email}, function(err,user) {
          if (err)
           { 
            console.error(err); 
           }
            
          else {
                   console.log(user);
                   return res.redirect('http://localhost:3009/#/reset');
               };
    });
};


//** pass updated
module.exports.save = function(req,res){
  console.log("password"+req.body.password);
    Usermodel.findOne({email:req.params.e},function(err,person){
        
        person.password = createHash(req.body.password);
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



/*


module.exports.contact = function(req, res) {
        
  /*var data = req.body;
    /* console.log(data.email);
    var contacts    = new Usermodel();

    contacts.name     = req.body.name;
    contacts.useremail= req.body.email;
    
      
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
 

};*/

//**save edit user**//
module.exports.saveEdit = function(req, res) {
var uid = req.params.id;
    
    
    Usermodel.findById(uid, function(err, user) 
    {
            user.username = req.body.username;
            user.email    = req.body.email;
            user.address  = req.body.address;
            user.firstname= req.body.firstname;
            user.country  = req.body.country;
            user.city     = req.body.city;
            
       user.save(function(err,store)
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

//**view all  user*//

module.exports.viewUser = function(req,res)
  {
    Usermodel.find({},function(err,data)
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

  //**delete users
  module.exports.deleteUser = function(req,res)
  {
     var uid = req.params.id;

    Usermodel.findByIdAndRemove(uid,function(err,data)
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