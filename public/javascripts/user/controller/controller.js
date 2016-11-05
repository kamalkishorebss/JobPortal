//*******************************usercontroller*********************************
jobPortal.controller("userCtrl",function($scope,$http,$location,$localStorage,$route,$sce,notificationMessage){
 $scope.errError = function(){
  notificationMessage.error();
 }
 $scope.log = function(){
  notificationMessage.logIn();
 }

$scope.EID      = $localStorage.email;
$scope.login    = $localStorage.login; //*email shown on front
$scope.bj       = $localStorage.jb; 
$scope.frm      = $localStorage.frm;
$scope.check    = $localStorage.check;
$scope.comp     = $localStorage.comp;
$scope.jobreview= $localStorage.jobinfo;
$scope.loggedIn = $localStorage.loggedIn;
$scope.username = $localStorage.username;


//console.log($scope.username);
//console.log($scope.loggedIn);

//slider**
$scope.myInterval = 5000;
$scope.slides = [
                  {
                    image:'bg9.jpg',
                    text:'img-1.jpg',
                    header:'This is What you Looking For',
                    p:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam sit nonummy nibh euismod tincidunt ut laoreet dolore magna aliquarm erat sit volutpat.Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam sit nonummy nibh euismod tincidunt ut laoreet dolore magna aliquarm erat sit volutpat.Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam sit nonummy nibh euismod tincidunt ut laoreet dolore magna aliquarm erat sit volutpat." 
                  
                  },
                  {
                    image:'bg8.jpg',
                    text:'img-3.jpg',
                    header:'Grow Up your Career!',
                    p:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam sit nonummy nibh euismod tincidunt ut laoreet dolore magna aliquarm erat sit volutpat.Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam sit nonummy nibh euismod tincidunt ut laoreet dolore magna aliquarm erat sit volutpat.Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam sit nonummy nibh euismod tincidunt ut laoreet dolore magna aliquarm erat sit volutpat."
                
                  },
                  {
                    image:'bg1.jpg',
                    text:'img-2.jpg',
                    header:'What is the next?',
                    p:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam sit nonummy nibh euismod tincidunt ut laoreet dolore magna aliquarm erat sit volutpat.Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam sit nonummy nibh euismod tincidunt ut laoreet dolore magna aliquarm erat sit volutpat.Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam sit nonummy nibh euismod tincidunt ut laoreet dolore magna aliquarm erat sit volutpat."

                  }
                  
                ];

  var slides = $scope.slides;


//**usersignin**//
$scope.infoReg=function(){
  notificationMessage.reg();
}

$scope.addUser = function(){
     
        var file = $scope.file;    
        
            var uploadUrl = "/index/abc";
             var fd = new FormData();
                   fd.append('firstname',$scope.firstname);
                   fd.append('email',$scope.email);
                   fd.append('address',$scope.address);
                   fd.append('city',$scope.city);
                   fd.append('country',$scope.country);
                   fd.append('username',$scope.username);
                   fd.append('password',$scope.password);
                   fd.append('file', file);           
             $http.post(uploadUrl,fd, {
                 transformRequest: angular.identity,
                 headers: {'Content-Type': undefined}
             }).then(function successCallback(response) {
                         if(response.data.error)
                         {
                           $scope.error = response.data.error;
                         }else{
                           $scope.user = response.data;
                          
                           $scope.infoReg();
                           $location.path('/usersignin');
                          
                           }
          console.log(response);
             }, function errorCallback(response) {
                //console.log('error',response);
                $scope.errError();
       });
    }



//**user login**//
$scope.successLogin=function(){
  notificationMessage.success();
}
$scope.crediential=function(){
  notificationMessage.inValid();
}
$scope.login = function(){

  
  $http({
      method: 'POST',
      url: '/index/usersignin',
      data: {username:$scope.username, password:$scope.password}
    }).then(function successCallback(response) {
      if(response.data.error)
      {
        $scope.error = response.data.error;
      }
      else 
      {
    
        $scope.dp = response.data;
        $localStorage.loggedIn  = $scope.dp;
        $localStorage.login = $scope.dp.email;
        $localStorage.username  = $scope.dp.username;
        
        $scope.loginuser();
        $scope.successLogin();
        //console.log("Successfully logged");
        $location.path('/home');
        
      }
    }, function errorCallback(response) {
        //console.log('error',response);
        $scope.crediential();
        //alert("invlaid crediential");
    });
}
  



//**Reset password**//
$scope.infoMail = function(){
  notificationMessage.info();
} 
$scope.send = function(){

  //alert("hello");

  $http({

          method : 'POST',
          url    : '/index/send',
          data   : {email:$scope.email}
       
       }).then(function successCallback(response) {
              if(response.data.error)
              {
                $scope.error = response.data.error;
              }
              else 
              {
            
                $scope.detail = response.data;
                $localStorage.email = $scope.detail.email;
                //$location.path('/home');
                //console.log($localStorage.email);
                $scope.infoMail();
                //console.log('mail send to your emailid');
                
              }
      }, function errorCallback(response) {
        //console.log('error',response);
        $scope.errError();
    });
}



//**update password**//
$scope.change = function(){
  notificationMessage.reset();
}

$scope.updatePassword = function(){
     var e = $scope.EID;
   //alert(e);
   $http({
    method : 'POST',
    url    : '/index/update/' + e,
    data   : {password:$scope.password}
   }).then(function successCallback(response) {
              if(response.data.error)
              {
                $scope.error = response.data.error;
              }
              else 
              {
            
                $scope.pass = response.data;

                $scope.change();

                $location.path('/usersignin');
                //console.log('mail send to your emailid');
                
              }
      }, function errorCallback(response) {
        //console.log('error',response);
        $scope.errError();
    });

}


//**edit save User
$scope.editSaveuser =  function(id){

    $http({
      method: 'POST',
      url   : '/index/saveEdit/' + id,
      data  : { 
                name:$scope.firstname,username:$scope.username,
                address:$scope.address,city:$scope.city,country:$scope.country
              }
    }).
    then(function successCallback(response) 
    {
      //console.log(response);
      if(response.data.error)
      {
        $scope.error = response.data.error;
      }
      else
      {
        $scope.blog= response.data;
        
         //console.log($localStorage.jobinfo);
         $location.path('/userprofile');
        
        }    
    }), function errorCallback(response) 
       {
        //console.log('error',response);
        $scope.errError();
       };
    };



/* see all job */
$scope.bjj=$localStorage.jobss;
$http({
      method: 'GET',
      url: '/index/joblist'
    }).
    then(function successCallback(response) 
    {
      if(response.data.error)
      {
        $scope.error = response.data.error;
      }
      else
      {
        $scope.jobss = response.data;
        $localStorage.jobss = $scope.jobss;
        $scope.currentPage = 1;
        $scope.totalItems  = $scope.jobss.length;
        $scope.entryLimit  = 6; 
        $scope.noOfpages   = Math.ceil($scope.totalItems / $scope.entryLimit);

      }
    }, function errorCallback(response) 
       {
        console.log('error',response);
       });



//**view job by id**//
$scope.jobPreview =  function(id){

    $http({
      method: 'GET',
      url: '/index/viewjob/' + id
    }).
    then(function successCallback(response) 
    {
      //console.log(response);
      if(response.data.error)
      {
        $scope.error = response.data.error;
      }
      else
      {
        $scope.blog= response.data;
        $localStorage.jobinfo = $scope.blog;
        $localStorage.comp  = $scope.blog.company_id;
        $localStorage.title = $scope.blog.title;
        $localStorage.companyManger = $scope.blog.companyManger;
        $localStorage.admin  = $scope.blog.admin;
         //console.log($localStorage.jobinfo);
         $location.path('/previewjob');
        
        }    
    }), function errorCallback(response) 
       {
        //console.log('error',response);
        $scope.errError();
       };
    };




//**show application form with job info**// 
 $scope.showForm =  function(id){

  //alert(id); 
  $http({
      method: 'GET',
      url: '/index/viewjob/' + id
    }).
    then(function successCallback(response) 
    {
      //console.log(response);
      if(response.data.error)
      {
        $scope.error = response.data.error;
      }
      else
      {

        //console.log($scope.check);
        if($scope.check == true )
        {
            $scope.blog= response.data;

            $scope.html = $sce.trustAsHtml($scope.blog.content);
            
            $localStorage.frm = $scope.html;

            $location.path('/appform');
        }
        else{
             $scope.log();
             $location.path('/usersignin');

          }
        
        }    
    }), function errorCallback(response) 
       {
        //console.log('error',response);
        $scope.errError();
       };


 } 


//**save the userinfo**//
 $scope.title =  $localStorage.title;
 $scope.companyManger =  $localStorage.companyManger;
 $scope.admin =  $localStorage.admin;
 $scope.saveUser = function()
 {
   
   var saveForm = $("#frmid").html();
   var manger   = $scope.companyManger;
   var admin    = $scope.admin;
   //alert(s);
//console.log($scope.loggedIn);
    $http({
      method: 'POST',
      url: '/index/addcandidate',
      data:{
              user:$scope.loggedIn,comp:$scope.comp,
              job_title:$scope.title,farm:saveForm,name:$scope.username, 
              mangerName:manger,admin:admin
           }
    }).
    then(function successCallback(response) 
    {
      if(response.data.error)
      {
        $scope.error = response.data.error;
      }
      else
      {

        $scope.userInfo = response.data;
        console.log($scope.userInfo);
        console.log("You have been applied Successfully");
        $location.path('/home');

                
        //$location.path('/jobs');
      }
    
    }), function errorCallback(response) 
       {
        //console.log('error',response);
        $scope.errError();
       };

 }


 //**about**//
 /*$http({
      method: 'GET',
      url: '/index/abt'
    }).
    then(function successCallback(response) 
    {
      if(response.data.error)
      {
        $scope.error = response.data.error;
      }
      else
      {
        $scope.uabout = response.data; 
        console.log(uabout);

      

      }
    }, function errorCallback(response) 
       {
        console.log('error',response);
       });
*/


//**conatct**//
$scope.Email = function(){
  notificationMessage.mail();
}
var subject = "JobPortal";
$scope.contact = function(){
      $http({
      method: 'POST',
      url: '/index/contact',
      data: {name:$scope.name, email:$scope.email,  message:$scope.message, subject:subject}
    }).
    then(function successCallback(response) 
    {
      if(response.data.error)
      {
        $scope.error = response.data.error;
      }
      else
      {
        $scope.Email();
        $location.path('#/home');
      }
    }, function errorCallback(response) 
       {
        //console.log('error',response);
        $scope.errError();
       });
  }


//**post your review**//
$scope.rvu = function(){
  notificationMessage.post();
} 


var user_id = $scope.loggedIn._id;
var pic = $scope.loggedIn.file;



$scope.postReview = function()
{

      $http({
      method: 'POST',
      url: '/index/reviews',
      data: {username:$scope.username, user_id:$scope.user_id, review:$scope.review}
    }).
    then(function successCallback(response) 
    {
             if(response.data.error)
              {
                $scope.error = response.data.error;
              }
              else
              {
                
                $scope.rvu();
                //$route.reload();
                $scope.review="";
                
                
              }
            }, function errorCallback(response) 
               {
                //console.log('error',response);
                $scope.errError();
               });
  }

//**user review about company**//
$http({
      method: 'GET',
      url: '/index/getreviews'
    }).
    then(function successCallback(response) 
    {
      if(response.data.error)
      {
        $scope.error = response.data.error;
      }
      else
      {
        $scope.reviews = response.data;
                  
      }
    }, function errorCallback(response) 
       {
        console.log('error',response);
       });


  /* serach job by location and catagoies*/
  $scope.recordsj = $localStorage.jrecords;
  $scope.jobLocation = function()
 {

      $http({
      method: 'POST',
      url   : '/index/searchjob',
      data  : {catagories:$scope.catagories, location:$scope.location}
    }).
    then(function successCallback(response) 
    {
             if(response.data.error)
              {
                $scope.error = response.data.error;
                alert("Server error");
                //$location.path('/401');
              }
              
              else if(response.data == "")
              {
                $location.path("/401");
              }

              else
              {

               $scope.jrecords = response.data;
               $localStorage.jrecords = $scope.jrecords;
               $location.path("/jobpage");
                   
              }
                
            
      }, function errorCallback(response) 
         {
          //console.log('error',response);
          $scope.errError();
         });
  }

$scope.goHome =  function(){

  $location.path('/home');

}

});  //end of usercontroller



//***********************************maincontroller********************************************
jobPortal.controller("mainCtrl",function($scope,$http,$location,$localStorage,$route,$sessionStorage,notificationMessage){
$scope.mail = $localStorage.login;
//$scope.bj   = $localStorage.jb;

$scope.checkuser=$localStorage.check;
//**loged in**//
$scope.loginuser = function(){
          //alert('hello');
        //$scope.checkuser= true;
        $localStorage.check=true;
         $scope.checkuser=$localStorage.check;
          $route.reload();
        // console.log($localStorage.check);
         }


//**logout**//
//*notify*//
$scope.successLogout=function(){
  notificationMessage.logout();
}

$scope.logout=function(){
        $http({
            method:'get',
            url:'/index/logout',
        }).then(function successCallback(response){
          //$scope.checkuser= false;
          $scope.checkuser=false;
          $localStorage.check= false;
           
         
          //console.log($localStorage.check);
          $scope.successLogout();
          
          $location.path('/usersignin');
          $route.reload();
          //$scope.login = '';
          $localStorage.login='';
          $scope.username="";
        }, function errorCallback(res){
          console.log("error");
        });

          }

});
