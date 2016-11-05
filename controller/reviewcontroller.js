var Reviewmodel = require('../model/reviewmodel');


module.exports.saveReview = function(req,res){
     var review      = new Reviewmodel();
    review.uname     = req.body.username;
    review.userid    = req.body.user_id;
    review.reviews   = req.body.review;
    review.pic       = req.body.photo;
    review.status    = "pending";

     console.log(req.body);

    review.save(function (err, data) {
                    if (err) {
                        res.send(err);
                    }
                    else {
                      //console.log(data);
                      res.send(data);
                     }
                   });
  };


//* find all reviews *//
module.exports.showReview = function(req,res)
  {
    Reviewmodel.find({},function(err,data)
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


//**** find all reviews with status true ***//
module.exports.viewReview = function(req,res)
  {
    Reviewmodel.find({status:"Approved"},function(err,data)
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


//find by id 
  module.exports.View = function(req,res)
  {

     var uid = req.params.id;
    Reviewmodel.findById(uid,function(err,data)
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


//find by save bny id  
  module.exports.viewSave = function(req,res)
  {
     var uid = req.params.id;
    Reviewmodel.findById(uid, function(err, review) 
    {
      review.status = req.body.status;   
       review.save(function(err,store)
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


  //**delete review**//
  module.exports.reviewDelete = function(req,res)
  {
    var uid = req.params.id;
    Reviewmodel.findByIdAndRemove(uid,function(err,data)
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