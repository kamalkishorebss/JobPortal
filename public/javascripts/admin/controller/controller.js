//admincontroller***************////////
jobPortal.controller("jobCtrl",function($scope,NgTableParams,$http,$location,$localStorage,$sce,$route,notificationMessage,$window){

$scope.checkadmin = false;
 
$scope.data    = $localStorage.dd;
$scope.detail  = $localStorage.jobDetail;
$scope.jobview = $localStorage.job;
$scope.jbdata  = $localStorage.jobdata;
$scope.info    = $localStorage.view;
$scope.admindp = $localStorage.admin;
$scope.adinfo  = $localStorage.admininfo;
$scope.admin_type= $localStorage.type;

 //** parent pages**//
$scope.eds     = $localStorage.eds;
$scope.p       = $localStorage.p1; //parent data
$scope.cd      = $localStorage.childData;
$scope.pdedit  = localStorage.parentedit;
$scope.ecs1    = $localStorage.ecs1;
////////////////////////////////////////////////
//**content editor

    $scope.orightml = '';
    $scope.htmlcontent = $scope.orightml;



//**contactus people list**//



$http({
      method: 'GET',
      url: '/index/peoplelist'
    }).
    then(function successCallback(response) 
    {
      if(response.data.error)
      {
        $scope.error = response.data.error;
      }
      else
      {
        $scope.peoples = response.data;
        //$localStorage.users =   $scope.users;
      }
    }, function errorCallback(response) 
       {
        console.log('error',response);
       });


//**userlist

$http({
      method: 'GET',
      url: '/index/userlist'
    }).
    then(function successCallback(response) 
    {
      if(response.data.error)
      {
        $scope.error = response.data.error;
      }
      else
      {
        $scope.users = response.data;
        //$localStorage.users =   $scope.users;
      }
    }, function errorCallback(response) 
       {
        console.log('error',response);
       });


//**delete users

$scope.deleteUser = function(id) 
  { 
    //alert(id);
    $http({
    method:"DELETE",
    url:'/index/deleteUsers/'+id
  }).then(function successCallback(response) {
      if(response.data.error){
        $scope.error = response.data.error;
      }else{
        $scope.users.forEach(function(values,index)
       {
         if(values._id == id)
         {
           $scope.users.splice(index,1);
         }
       });
       }
      }, function errorCallback(response) {
      console.log('error',response);
    });


    }



//**add admin**// 
$scope.addAdmin = function()
  {

       
 
    var uploadUrl = "/index/admin";
    

             var fd = new FormData();
             fd.append('name',$scope.name);
             fd.append('email',$scope.email);
             fd.append('username',$scope.username);
             fd.append('password',$scope.password);
             fd.append('address',$scope.address);
             fd.append('description',$scope.description);
             fd.append('file', $scope.files); 
             fd.append('location',$scope.location);
           
             $http.post(uploadUrl,fd, {
                 transformRequest: angular.identity,
                 headers: {'Content-Type': undefined}
             }).then(function successCallback(response) {
         if(response.data.error){
           $scope.error = response.data.error;
         }else{
           $scope.admin = response.data;
           $location.path('/adminlist');
           console.log('Admin Added Successfully');
          } 
          //console.log(response);
       }, function errorCallback(response) {
           console.log('error',response);
       });

       }
     
/* login function */
$scope.admindp = $localStorage.admindp;

$scope.loginFunc = function(){
 $http({
   method : "POST",
   url    : "index/loged",
   data   : {username : $scope.username, password : $scope.password}
 }).
 then(function successCallback(response){
  if(response.data.error){

    $scope.error = response.data.error;
  }
  else{  
        
        
        var  user_type;
        var  uN;
        $scope.loged = response.data;
        
        if($scope.loged != "" )
        {
          $localStorage.admindp = $scope.loged;
          var loged = $scope.loged;
          
          for (var i  in  loged){          
           user_type = loged[i].user_type
           uN = loged[i].username;
           
          }
        
          $localStorage.type  = user_type;
          $localStorage.uN  = uN;

          $scope.loginAdmin();
          if(user_type =="admin"){
          $location.path('/companylist');
          
          }
          else{
            $location.path('/listCompany');

          }
          //$window.location.reload();
        }
        else{
          alert("Invlaid credentials");
          $location.path('/login');
        }

      }
 },
 function errorCallback(response){
  console.log('error',response);
});

}

/* reset admin password */
$scope.EID = $localStorage.email;
$scope.send = function()
{
    $http({
     method : "POST",
     url    : "index/sendemail",
     data   : {email : $scope.email}
   }).
   then(function successCallback(response){
    if(response.data.error){

      $scope.error = response.data.error;
    }
    else{  
          
          $scope.ps = response.data;   
          $localStorage.email = $scope.ps.email;
          //alert("Email has been send");
          //$localStorage.email = $scope.loged.email;    
          

        }
   },
   function errorCallback(response){
    console.log('error',response);
  });

}

/* update password */
$scope.updatePassword = function(){
     var E = $scope.EID;
   //alert(e);
   $http({
    method : 'POST',
    url    : '/index/update/' + E,
    data   : {password:$scope.password}
   }).then(function successCallback(response) {
              if(response.data.error)
              {
                $scope.error = response.data.error;
              }
              else 
              {
            
                $scope.pass = response.data;

                //$scope.change();

                $location.path('/login');
                //console.log('mail send to your emailid');
                
              }
      }, function errorCallback(response) {
        //console.log('error',response);
        $scope.errError();
    });

}


//**view all admin**//

$http({
      method: 'GET',
      url: '/index/adminlist'
    }).
    then(function successCallback(response) 
    {
      if(response.data.error)
      {
        $scope.error = response.data.error;
      }
      else
      {
        $scope.admin = response.data;

        /*$scope.currentPage = 1;
        $scope.totalItems = $scope.admin.length;
        $scope.entryLimit = 9; 
        $scope.noOfpages = Math.ceil($scope.totalItems / $scope.entryLimit);*/
        $scope.tableParams = new NgTableParams({}, { dataset:  $scope.admin});    

      }
    }, function errorCallback(response) 
       {
        console.log('error',response);
       });


//**viewAdmin**//


$scope.viewAdmin = function(id) {

 
  //alert(id);
      $http({
      method: 'GET',
      url: '/index/viewadmin/' + id
    }).
    then(function successCallback(response) 
    {
      if(response.data.error)
      {
        $scope.error = response.data.error;
      }
      else
      {
        $scope.blog = response.data;
        $localStorage.admin=$scope.blog;
        //console.log($localStorage.user);
        $location.path('/viewadmin');
        }
    
    }), function errorCallback(response) 
       {
        console.log('error',response);
       };
    };


//**editadmin**//
$scope.editAdmin = function(id) 
  { 
   
    $http({
    method:"GET",
    url:'/index/editadmin/'+id,
  }).then(function successCallback(response) {
      if(response.data.error){
        $scope.error = response.data.error;
      }else{
        $scope.Blog=response.data;
        $localStorage.admininfo=$scope.Blog;
        
        $location.path('/editadmin');
      }
      //console.log(response);
    }, function errorCallback(response) {
      console.log('error',response);
    });

}

//**saveAdmin**//
$scope.saveAdmin = function(id) 
  { 
   //alert(id);
    $http({
    method:'POST',
    url:'/index/saveadmin/'+id,
    data:{name:$scope.adinfo.name,email:$scope.adinfo.email,username:$scope.adinfo.username,address:$scope.adinfo.address,
    location:$scope.adinfo.location,description:$scope.adinfo.description}
  }).then(function successCallback(response) {
      if(response.data.error){
        $scope.error = response.data.error;
      }else{
        $scope.Blog=response.data;
        $localStorage.admininfo=$scope.Blog;
        
        $location.path('/adminlist');
      }
      //console.log(response);
    }, function errorCallback(response) {
      console.log('error',response);
    });

}


 //**delete admin **//
$scope.deleteAdmin = function(id) 
  { 
    /*$location.path('/editcompany');*/
    $http({
    method:"DELETE",
    url:'/index/deleteadmin/'+id,
  }).then(function successCallback(response) {
      if(response.data.error){
        $scope.error = response.data.error;
      }else{
        $scope.admin.forEach(function(values,index)
       {
         if(values._id == id)
         {
           $scope.admin.splice(index,1);
         }
       });
       }
      }, function errorCallback(response) {
      console.log('error',response);
    });


    }


//**addcompany**//
var adminName = $localStorage.uN;
$scope.addCompany = function()
	{
    $scope.discription = $scope.orightml;
    
   
    /*$location.path('/userlogin');*/
    var file = $scope.file;    
            var uploadUrl = "/index/xyz";
             var fd = new FormData();
             fd.append('name',$scope.name);
             fd.append('mangername',$scope.mangername);
             fd.append('email',$scope.email);
             fd.append('address',$scope.address);
             fd.append('htmlcontent',$scope.htmlcontent);
             fd.append('location',$scope.location);
             fd.append('adminName',adminName);
             fd.append('file', file);           
             $http.post(uploadUrl,fd, {
                 transformRequest: angular.identity,
                 headers: {'Content-Type': undefined}
             }).then(function successCallback(response) {
         if(response.data.error){
           $scope.error = response.data.error;
         }else{
           $scope.company = response.data;
           
           
           if($scope.admin_type =="subadmin"){
          $location.path('/listCompany');
          }
          else{
            $location.path('/companylist');
          }

           //$location.path('/companylist');
           console.log('Company Added Successfully');
    }
          //console.log(response);
       }, function errorCallback(response) {
           console.log('error',response);
       });
    }


   //**view all company**//
   $scope.companyManger=[];
   $http({
			method: 'GET',
			url: '/index/company'
		}).
		then(function successCallback(response) 
		{
			if(response.data.error)
			{
				$scope.error = response.data.error;
			}
			else
			{
				$scope.companys = response.data;
        for(var i=0; i<$scope.companys.length; i++){
          $scope.companyManger.push($scope.companys[i].email);
          
        }
        /*console.log($scope.adminReport);*/
        $localStorage.companyManger = $scope.companyManger;
        /*$scope.tableParams = new NgTableParams({}, { dataset:  $scope.companys}); */
                				
			}
		}, function errorCallback(response) 
		   {
			  console.log('error',response);
		   });
  

 
//**edit company**// 
$scope.editCompany = function(id) 
  { 
   
    $http({
    method:"GET",
    url:'/index/editcompany/'+id,
  }).then(function successCallback(response) {
      if(response.data.error){
        $scope.error = response.data.error;
      }else{
        $scope.Blog=response.data;
        $localStorage.dd=$scope.Blog;
        //console.log( $scope.updateValue)
        $location.path('/editcompany');
      }
      //console.log(response);
    }, function errorCallback(response) {
      console.log('error',response);
    });

}


//**save edit compnay**//
$scope.saveEditcompnay = function(id) 
  {
    $http({
    method:"POST",
    url:'/index/editcompany/'+id,
  data:{name:$scope.data.name,email:$scope.data.email,address:$scope.data.address,
    location:$scope.data.location,discription:$scope.data.discription,mangername:$scope.data.manger,}
  }).then(function successCallback(response) {
      if(response.data.error){
        $scope.error = response.data.error;
      }else{
        $scope.Blog=response.data;

        //$localStorage.dd=$scope.Blog;
        
        //console.log( $scope.updateValue)
        $location.path('/companylist');
      }
      //console.log(response);
    }, function errorCallback(response) {
      console.log('error',response);
    });
    }   





//**view company profile**//
$scope.viewCompnay = function(id) {

      $http({
      method: 'GET',
      url: '/index/viewcompany/' + id
    }).
    then(function successCallback(response) 
    {
      if(response.data.error)
      {
        $scope.error = response.data.error;
      }
      else
      {
        $scope.blog = response.data;
        $localStorage.view=$scope.blog;
       
        $localStorage.cManger = $scope.blog.email;
        //console.log($localStorage.cManger);
        $location.path('/viewcompany');
        }
    
    }), function errorCallback(response) 
       {
        console.log('error',response);
       };
    };


/* view company list by admin*/
var ad = $localStorage.uN;

$http({
      method: 'GET',
      url: '/index/viewCompanies/' + ad
    }).
    then(function successCallback(response) 
    {
      if(response.data.error)
      {
        $scope.error = response.data.error;
      }
      else
      {
        $scope.companies = response.data;
        
        /*$scope.tableParams = new NgTableParams({}, { dataset:  $scope.companys}); */
                        
      }
    }, function errorCallback(response) 
       {
        console.log('error',response);
       });



//**delete company **//
$scope.deleteCompany = function(id) 
  { 
    /*$location.path('/editcompany');*/
    $http({
    method:"DELETE",
    url:'/index/delete/'+id,
  }).then(function successCallback(response) {
      if(response.data.error){
        $scope.error = response.data.error;
      }else{
        $scope.companys.forEach(function(values,index)
       {
         if(values._id == id)
         {
           $scope.companys.splice(index,1);
         }
       });
       }
      }, function errorCallback(response) {
      console.log('error',response);
    });


    }



//****************************job details*****************************************//
//**add jobs**//


//console.log($localStorage.view.name); 
$scope.addJob = function() 
  {


     $scope.company_id = $localStorage.view.name;
     var contenthtml1 =  $('#formattributcontent').html();
     var companyemail = $localStorage.cManger;
     var admin   = $localStorage.uN; 

//console.log($scope.info._id);
    $http({
    method:"POST",
    url:'/index/job',
    data:{ content:contenthtml1, company_id:$scope.company_id, title:$scope.title, companyemail:companyemail,
           age:$scope.age,salary:$scope.salary,address:$scope.address,location:$scope.location,
           qualification:$scope.qualification,experience:$scope.experience, admin:admin,
           htmlcontent:$scope.htmlcontent,catagories:$scope.catagories 
         }
  }).then(function successCallback(response) {
      if(response.data.error){
        $scope.error = response.data.error;
      }else{
        $scope.Blog=response.data;
        console.log("job added Successfully");
        //$localStorage.dd=$scope.Blog;    
        //console.log( $scope.updateValue)
        $location.path('/joblist');
      }
      //console.log(response);
    }, function errorCallback(response) {
      console.log('error',response);
    });
    }    


//**view all jobs**//
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
        $scope.jobs = response.data;
        
        /*$scope.tableParams = new NgTableParams({}, { dataset:  $scope.jobs});*/ 

        $localStorage.jb = $scope.jobs;
          //console.log($localStorage.jb);        
      }
    }, function errorCallback(response) 
       {
        console.log('error',response);
       });



//**view jobs**//

$scope.viewJob = function(id) {
  //alert(id);
      $http({
      method: 'GET',
      url: '/index/viewjob/' + id
    }).
    then(function successCallback(response) 
    {
      if(response.data.error)
      {
        $scope.error = response.data.error;
      }
      else
      {
        $scope.jp = response.data;
        
         $localStorage.jobDetail = $scope.jp;

        $scope.html = $sce.trustAsHtml($scope.jp.content);
        
        $localStorage.job = $scope.html;
        
        /*$("#formid").html($localStorage.job.content);*/
        $location.path('/viewjob');
        }
    
    }), function errorCallback(response) 
       {
        console.log('error',response);
       };
     }




//**edit job**//
$scope.editJob = function(id) {
  
      $http({
      method: 'GET',
      url: '/index/editjob/' + id
    }).
    then(function successCallback(response) 
    {
      if(response.data.error)
      {
        $scope.error = response.data.error;
      }
      else
      {
        $scope.jp = response.data;
        $localStorage.jobdata=$scope.jp;        
        $location.path('/editjob');
        }
    
    }), function errorCallback(response) 
       {
        console.log('error',response);
       };
     }

//**save edited job**//

$scope.editJobsave = function(id) {
      //alert(id);
      $http({
      method: 'POST',
      url: '/index/editjobsave/' + id,
      data:{
           title:$scope.jbdata.title,location:$scope.jbdata.location,
           age:$scope.jbdata.age,salary:$scope.jbdata.salary,address:$scope.jbdata.address,
           qualification:$scope.jbdata.qualification,experience:$scope.jbdata.experience,
           htmlcontent:$scope.jbdata.description
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
        $scope.jp = response.data;
                
        $location.path('/joblist');
        }
    
    }), function errorCallback(response) 
       {
        console.log('error',response);
       };
     }



//**delete job**//
    $scope.deleteJob = function(id) 
  { 
    //alert(id);
    $http({
    method:"DELETE",
    url:'/index/deletejob/' + id,
  }).then(function successCallback(response) {
    console.log(response);
      if(response.data.error){
        $scope.error = response.data.error;
      }else{
        $scope.jobs.forEach(function(values,index)
       {
         if(values._id == id)
         {
           $scope.jobs.splice(index,1);
         }
       });
       }
      }, function errorCallback(response) {
      console.log('error',response);
    });


    }

//**add gernal user section**//

 //** add parent **//
 $scope.addParent=function(){
  var file = $scope.file;    
             var uploadUrl = "/index/parent";
             var fd = new FormData();            
             fd.append('parentTitle',$scope.parentTitle);          
             fd.append('file', $scope.file);
             $http.post(uploadUrl,fd, {
                 transformRequest: angular.identity,
                 headers: {'Content-Type': undefined}
             }).then(function successCallback(response) {
         if(response.data.error){
           $scope.error = response.data.error;
         }else{
           $scope.parent = response.data;
                       
           $location.path('/addchild');
          
    }
          //console.log(response);
       }, function errorCallback(response) {
           console.log('error',response);
       });
}

//**view all parent
$scope.viewParents = $localStorage.view_parent;
//console.log($scope.viewParents);

$http({
      method: 'GET',
      url: '/index/vp'
    }).
    then(function successCallback(response) 
    {
      if(response.data.error)
      {
        $scope.error = response.data.error;
      }
      else
      {
        $scope.viewP = response.data;
        
        $localStorage.view_parent = $scope.viewP;
                 
      }
    }, function errorCallback(response) 
       {
        console.log('error',response);
       });

//**edit parent page**//
/*$scope.editParent = function(id) {  
      $http({
      method: 'GET',
      url: '/index/ep/' + id
    }).
    then(function successCallback(response) 
    {
      if(response.data.error)
      {
        $scope.error = response.data.error;
      }
      else
      {
        $scope.pdedit = response.data;
        $localStorage.parentedit=$scope.pdedit;        
        //$location.path('/editparent');
        }
    }), function errorCallback(response) 
       {
        console.log('error',response);
       };
     }*/


//**parent**//     
/*$scope.viewParent = function(id) {
      $http({
      method: 'GET',
      url: '/index/cd/' + id
    }).
    then(function successCallback(response) 
    {
      console.log(response);
      if(response.data.error)
      {
        $scope.error = response.data.error;
      }
      else
      {
        $scope.blog= response.data;
        $localStorage.vvp=$scope.blog;
        $localStorage.title1=$scope.blog.title1;
        //$location.path('/vparent');
        }    
    }), function errorCallback(response) 
       {
        console.log('error',response);
       };
    };
*/



//**add child page **//
$scope.cpage =$localStorage.cpage;

$scope.addChild=function(){    
   
             var file = $scope.file;    
            var uploadUrl = "/index/childpage";
             var fd = new FormData();
             fd.append('titleParent',$scope.titleParent);
             fd.append('titleChild',$scope.titleChild);
             fd.append('htmlcontent',$scope.htmlcontent);
             fd.append('Radios',$scope.radio);             
             fd.append('file', file);           
             $http.post(uploadUrl,fd, {
                 transformRequest: angular.identity,
                 headers: {'Content-Type': undefined}
             }).then(function successCallback(response) {
         if(response.data.error){
           $scope.error = response.data.error;
         }else{
           $scope.childpage = response.data;
           $localStorage.cpage = $scope.childpage;
           //console.log($scope.childpage);
           $location.path('/editchild');
           console.log('Child page Added Successfully');
    }
          //console.log(response);
       }, function errorCallback(response) {
           console.log('error',response);
       });
             
}


//** list child pages **//
   $http({
      method: 'GET',
      url: '/index/childlist'
    }).
    then(function successCallback(response) 
    {
      if(response.data.error)
      {
        $scope.error = response.data.error;
      }
      else
      {
        $scope.childs = response.data; 
        
        //$localStorage.viw=$scope.ser;      
      }
    }, function errorCallback(response) 
       {
        console.log('error',response);
       });


//**view child**//
$scope.singleC = $localStorage.singleChild;
//console.log($scope.singleC);
$scope.viewChild = function(id) {
  //alert(id);
      $http({
      method: 'GET',
      url: '/index/seechild/' + id
    }).
    then(function successCallback(response) 
    {
      
      if(response.data.error)
      {
        $scope.error = response.data.error;
      }
      else
      {
        $scope.blog= response.data;
        $localStorage.singleChild=$scope.blog;

        $location.path('/viewchild');
        }    
    }), function errorCallback(response) 
       {
        console.log('error',response);
       };
    };



//**child save**//
$scope.editChildsave = function(id) {
      $http({
      method:'POST',
      url: '/index/editchildsave/' + id,
      data:{
        parentTitle:$scope.cpage.parentTitle, htmlcontent:$scope.cpage.Sdesc,
        childTitle:$scope.cpage.childTitle, optionsRadios:$scope.cpage.status,
                       
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
        $scope.ecs = response.data;
        $localStorage.ecs1=$scope.ecs;
        //console.log($scope.ecs);    
        $location.path('/childlist');
        }
    
    }), function errorCallback(response) 
       {
        console.log('error',response);
       };
     }


//** delete child **//
  $scope.deleteChild = function(id) { 
    //alert(id);
    $http({
    method:"DELETE",
    url:'/index/deletechild/' + id,
  }).then(function successCallback(response) {
    console.log(response);
      if(response.data.error){
        $scope.error = response.data.error;
      }else{
        $scope.child.forEach(function(values,index)
       {
         if(values._id == id)
         {
           $scope.child.splice(index,1);
         }
       });
       }
      }, function errorCallback(response) {
      console.log('error',response);
    });
}


//**about**//

/*$scope.about=function(){
//console.log($scope.page);
  $http({
      method:'POST',
      url: '/index/about',
      data:{
              title:$scope.title, desc1:$scope.desc1,
              desc2:$scope.desc2       
           }
    
             }).then(function successCallback(response) {
         if(response.data.error){
           $scope.error = response.data.error;
         }else{
           $scope.about = response.data;     
           
           //$location.path('/editchild');
            console.log('About add Successfully');
          
    }
          //console.log(response);
       }, function errorCallback(response) {
           console.log('error',response);
       });
}*/


/* add catagory of job*/

$scope.addCatagory=function(){
//alert($scope.catagories);
  $http({
      method:'POST',
      url: '/index/addCat',
      data:{
              catagories:$scope.catagories     
           }
    
             }).then(function successCallback(response) {
                     if(response.data.error){
                       $scope.error = response.data.error;
                     }else{
                       $scope.cat = response.data;     
                       
                        //console.log('Catagory add Successfully');
                        $location.path('/companylist'); 
    }
          //console.log(response);
       }, function errorCallback(response) {
           console.log('error',response);
       });
}

//**get all catagory*//
$scope.catlists = $localStorage.catlists;
$http({
      method: 'GET',
      url: '/index/listCat'
    }).
    then(function successCallback(response) 
    {
      if(response.data.error)
      {
        $scope.error = response.data.error;
      }
      else
      {
        $scope.catlist = response.data;
        $localStorage.catlists =   $scope.catlist;
      }
    }, function errorCallback(response) 
       {
        console.log('error',response);
       });


});
//*******************************candidatecontroller*********************************
jobPortal.controller("candiateCtrl",function($scope,$http,$location,$route,$localStorage){

  $scope.candidate  = $localStorage.cand;
  
  function dateController ($scope) {
            $scope.myDate = new Date();
            $scope.minDate = new Date(
               $scope.myDate.getFullYear(),
               $scope.myDate.getMonth() - 2,
               $scope.myDate.getDate());
            $scope.maxDate = new Date(
               $scope.myDate.getFullYear(),
               $scope.myDate.getMonth() + 2,
               $scope.myDate.getDate());
            $scope.onlyWeekendsPredicate = function(date) {
               var day = date.getDay();
               return day === 0 || day === 6;
            }
         }      


//**find candidate by admin
var nm = $localStorage.uN;
$http({
      method : 'GET',
      url    : '/index/candidates/'+nm
    }).
    then(function successCallback(response){
      if(response.data.error)
      {
        $scope.error = response.data.error;
      }
      else
      {
        $scope.candy = response.data;                          
      }
    }, function errorCallback(response) {
        console.log('error',response);
       });


//**save schedule
  $scope.Cmanger = $localStorage.comEmail;
//$scope.mangerC = $localStorage.companyManger;
$scope.u = $localStorage.usernames;
$scope.saveSchedule = function() {
   /*var datey = $scope.myDate1.getFullYear();
   var datem = $scope.myDate1.getMonth() +1;
   var dated = $scope.myDate1.getDate();

   var date  = (datey +"/"+ datem +"/"+ dated);  */
       var saveManger = $scope.Cmanger;
      $http({
      method:'POST',
      url: '/index/schedule',
      data:{

              tasks:$scope.tasks, day:$scope.day,stime:$scope.stime,etime:$scope.etime, 
              date:$scope.myDate1, username:$scope.candUser.username,cManger:saveManger,  
              userid:$scope.candUser._id, Radios:$scope.shift
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
        $scope.sch = response.data;
        $localStorage.usernames = $scope.sch.username; 

        $route.reload();
        /*$scope.tasks ='';
        $scope.day   ='';
        $scope.stime =''; 
        $scope.shift ='';
        $scope.date  ='';*/
        //$location.path('/sdlist');
        }
    
    }), function errorCallback(response) 
       {
        console.log('error',response);
       };
     }

/* see the schedule*/
//$scope.cmManger = [];
var u = $scope.u;
 $scope.schedule  = $localStorage.schedule;
 $scope.seeSchedule = function() {

        //alert(id);
    $http({
      method : 'GET',
      url    : '/index/seeSchedule/'+u
    }).
    then(function successCallback(response){
      if(response.data.error)
      {
        $scope.error = response.data.error;
      }
      else
      {
        $scope.schedules = response.data;
        $localStorage.schedule = $scope.schedules;

            /*for(var i=0; i<$scope.schedules.length; i++)
            {
              $scope.cmManger.push($scope.schedules[i].mangerC);
            }
            $localStorage.Cemail = $scope.cmManger;*/

        $location.path('/sdlist');
                  
      }
    }, function errorCallback(response) {
        console.log('error',response);
       });
 }  


/*get schedule basis on day*/

$scope.cmManger = [];
$http({
      method: 'GET',
      url: '/index/singleDay/'
     }).
    then(function successCallback(response) 
    {
      
      if(response.data.error)
      {
        $scope.error = response.data.error;
      }
      else
      {
        $scope.oneDay= response.data;
        
        for(var i=0; i<$scope.oneDay.length; i++)
            {
              $scope.cmManger.push($scope.oneDay[i].mangerC);
            }
            $localStorage.Cemail = $scope.cmManger;
        }    
    }), function errorCallback(response) 
       {
        console.log('error',response);
       };
   


/* see all schedule */
$http({
      method: 'GET',
      url: '/index/seeSchedule'
     }).
    then(function successCallback(response) 
    {
      if(response.data.error)
      {
        $scope.error = response.data.error;
      }
      else
      {
        $scope.schedulesAll = response.data;
       
        //console.log($localStorage.sManger);
      }
    }, function errorCallback(response) 
       {
        console.log('error',response);
       });



/* single sscdule */
$scope.singles = $localStorage.singles;
$scope.editSchedule = function(id) {
      $http({
      method: 'GET',
      url: '/index/singleSchedule/' + id
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
        $scope.single = response.data;
        
        $localStorage.singles = $scope.single;
        $location.path('/oneSchedule');
        }    
    }), function errorCallback(response) 
       {
        console.log('error',response);
       };
    };

/*update schedule*/
$scope.editSchedulesave = function(id) {
       console.log($scope.singles.stime+"hello"+$scope.singles.etime);
      $http({
      method: 'POST',
      url: '/index/editSavetask/' + id,
      data: {
              tasks:$scope.singles.tasks, day:$scope.singles.day, stime:$scope.singles.stime, 
               etime:$scope.singles.etime,Radios:$scope.singles.shift/*date:singles.date,*/
            }
    }).
    then(function successCallback(response) 
    {
      console.log(response);
      if(response.data.error)
      {
        $scope.error = response.data.error;
      }
      else
      {
        $scope.single = response.data;
        $location.path('/candidatelist');
        }    
    }), function errorCallback(response) 
       {
        console.log('error',response);
       };
    };

/*delete  shift*/
$scope.deleteShift = function(id) 
  { 
    //alert(id);
    $http({
    method:"DELETE",
    url:'/index/deleteSch/' + id
  }).then(function successCallback(response) {
    //console.log(response);
      if(response.data.error){
        $scope.error = response.data.error;
      }else{
        $scope.schedules.forEach(function(values,index)
       {
         if(values._id == id)
         {
           $scope.schedules.splice(index,1);
         }
       });
       }
      }, function errorCallback(response) {
      console.log('error',response);
    });


    }



//**view all candidates
    $http({
      method: 'GET',
      url: '/index/candidatelist'
    }).
    then(function successCallback(response) 
    {
      if(response.data.error)
      {
        $scope.error = response.data.error;
      }
      else
      {
        $scope.candidates = response.data;
                  
      }
    }, function errorCallback(response) 
       {
        console.log('error',response);
       });


//**edit candidate

 $scope.editCandidate = function(id)
 {
     $http({
      method:'GET',
      url : '/index/editcandidate/' +id,
    }).
     then(function successCallback(response){
      if(response.data.error)
      {
        $scope.error  = response.data.error;
      }
      else
      {
        $scope.cand = response.data;
        $localStorage.cand  = $scope.cand;
        $location.path('/editcandidate');
      }
    },function errorCallback(response){
        console.log('error',response);
       
     })

  }

//**candidateprofile
 $scope.candUser = $localStorage.user;
 //console.log($scope.candUser);
  $scope.candidateprofile = function(id)

 {
  //alert(id);
     $http({
      method:'GET',
      url : '/index/viewcandidate/' +id,
    }).
     then(function successCallback(response){
      if(response.data.error)
      {
        $scope.error  = response.data.error;
      }
      else
      {
        $scope.cands = response.data;
        $localStorage.user=JSON.parse($scope.cands.user);
        $localStorage.cands=$scope.cands;
        $localStorage.comEmail=$scope.cands.mngr;
        $location.path('/candidateprofile');
        
      }
    },function errorCallback(response){
        console.log('error',response);
       
     })

  }

//**save candidate

$scope.saveCandidate = function(id) {
      //alert(id);
      $http({
      method: 'POST',
      url: '/index/savecandidate/'+id,
      data:{
        username:$scope.candidate.username,firstname:$scope.candidate.firstname,lastname:$scope.candidate.lastname,
        age:$scope.candidate.age,city:$scope.candidate.city,country:$scope.candidate.country,state:$scope.candidate.state,
        address:$scope.candidate.address,gender:$scope.candidate.gender,email:$scope.candidate.email,
        phone:$scope.candidate.phone,qualification:$scope.candidate.qualification,
        business:$scope.candidate.business,experience:$scope.candidate.experience
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
        $scope.candidate = response.data;
                
        $location.path('/candidatelist');
        }
    
    }), function errorCallback(response) 
       {
        console.log('error',response);
       };
     }   
 
//**delete candidate

   $scope.deleteCandidate = function(id) 
  { 
    //alert(id);
    $http({
    method:"DELETE",
    url:'/index/deletecandidate/' + id,
  }).then(function successCallback(response) {
    //console.log(response);
      if(response.data.error){
        $scope.error = response.data.error;
      }else{
        $scope.candidates.forEach(function(values,index)
       {
         if(values._id == id)
         {
           $scope.candidates.splice(index,1);
         }
       });
       }
      }, function errorCallback(response) {
      console.log('error',response);
    });


    }

/*logic*/
$scope.mangers = $localStorage.companyManger;
$scope.mangerCM = $localStorage.Cemail;

//console.log($scope.mangers);
//console.log($scope.mangerCM); 
var z =[];
var x = $scope.mangers;
var y = $scope.mangerCM;
var c = x.concat(y);
for( var i =0; i<c.length; i++)
  {
    if(c.indexOf(c[i])==c.lastIndexOf(c[i]))
    {
    z.push(c[i]);
    }

  }
z=z.toString();
var hiringManger = z; //all hiring manger who does not create weekly schedule
console.log(hiringManger);
$scope.current = new Date().getDay(''); //check the day for send email reminder to hiring manger 
if($scope.current == '6')
   {

      $http({
          method:'POST',
          url   : '/index/email',
          data  : {email:hiringManger}
        }).
         then(function successCallback(response){
          if(response.data.error)
          {
            $scope.error  = response.data.error;
          }
          else
          {
            $scope.ER = response.data;
            
            alert("Email reminder send Successfully");
          }
        },function errorCallback(response){
            console.log('error',response);
           
         })
    }


}); //**end of candidate controller**// 



//** review controller**//
jobPortal.controller("reviewCtrl",function($scope,$http,$location,$localStorage){

//**user reviews**//
$http({
      method: 'GET',
      url: '/index/seeAll'
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



///**changeStatus
$scope.bl  = $localStorage.blog;
$scope.changeStatus = function(id) {

      $http({
      method: 'GET',
      url: '/index/w/' + id
    }).
    then(function successCallback(response) 
    {
      if(response.data.error)
      {
        $scope.error = response.data.error;
      }
      else
      {
        $scope.blog = response.data;
        //console.log($scope.blog);
        $localStorage.blog = $scope.blog;

        $location.path('/editview');
        }
    
    }), function errorCallback(response) 
       {
        console.log('error',response);
       };
    };



//**save status
$scope.saveStatus = function(id)

 {
  //alert(id);
     $http({
      method:'POST',
      url : '/index/viewSave/' +id,
      data: {status :  $scope.status} 
    }).
     then(function successCallback(response){
      if(response.data.error)
      {
        $scope.error  = response.data.error;
      }
      else
      {
        $scope.views = response.data;
        $location.path('/reviewlist');
        
      }
    },function errorCallback(response){
        console.log('error',response);
       
     })

  }


//**delete review

   $scope.deleteReview = function(id) 
  { 
    //alert(id);
    $http({
    method:"DELETE",
    url:'/index/deletereview/' + id,
  }).then(function successCallback(response) {
    console.log(response);
      if(response.data.error){
        $scope.error = response.data.error;
      }else{
        $scope.reviews.forEach(function(values,index)
       {
         if(values._id == id)
         {
           $scope.reviews.splice(index,1);
         }
       });
       }
      }, function errorCallback(response) {
      console.log('error',response);
    });
}




  });  //**End of review controller**//

//******main controller***//
jobPortal.controller("adminMainCtrl",function($scope,$http,$location,$localStorage,$route,$sessionStorage,$window){
$scope.dp = $localStorage.admindp;
//**check admin login

$scope.loginAdmin = function()
{
 $scope.user_type = $localStorage.type;
 
 if($scope.user_type == "subadmin"){
    
    return true;
 }

 return false;

}

/*//**login check
$scope.loginCheck = function()
{
 $scope.user_type = $localStorage.type;
 
 if(($scope.user_type == "subadmin")|| ($scope.user_type == "admin")){
    
    return true;
 }

 return false;

}*/



$scope.logoutAdmin=function(){
 $scope.checkadmin = true;
 
        $http({
            method:'get',
            url:'/index/adminLogout',
        }).then(function successCallback(response){             
          $location.path('/login');
          $scope.dp='';
          
          
        }, function errorCallback(res){
          console.log("error");
        });

          }

});