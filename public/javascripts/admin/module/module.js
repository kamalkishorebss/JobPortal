var jobPortal = angular.module("jobPortal",["textAngular","ngRoute","ngTable","ngStorage","ngMessages","ui-notification","ngMaterial"]);

jobPortal.config(function($routeProvider){
	$routeProvider.
	when('/addcompany',{
		templateUrl : 'javascripts/admin/view/addcompany.html',
		controller  : 'jobCtrl'
	}).
	when('/companylist',{
		templateUrl : 'javascripts/admin/view/companylist.html',
		controller  : 'jobCtrl'
	}).
	when('/listCompany',{
		templateUrl : 'javascripts/admin/view/listcompany.html',
		controller  : 'jobCtrl'
	}).
    when('/editcompany',{
		templateUrl : 'javascripts/admin/view/editcompany.html',
		controller  : 'jobCtrl'
	}).
	when('/viewcompany',{
		templateUrl : 'javascripts/admin/view/viewcompany.html',
		controller  : 'jobCtrl'
	}).
	when('/login',{
		templateUrl : 'javascripts/admin/view/login.html',
		controller  : 'jobCtrl'
	}).
	when('/reset',{
		templateUrl : 'javascripts/admin/view/reset.html',
		controller  : 'jobCtrl'
	}).
	when('/changePass',{
		templateUrl : 'javascripts/admin/view/changePassword.html',
		controller  : 'jobCtrl'
	}).
	when('/peoplelist',{
		templateUrl : 'javascripts/admin/view/peoplelist.html',
		controller  : 'jobCtrl'
	}).



//**job**//
	when('/addjob',{
		templateUrl : 'javascripts/admin/view/addjob.html',
		controller  : 'jobCtrl'
	}).
	when('/joblist',{
		templateUrl : 'javascripts/admin/view/joblist.html',
		controller  : 'jobCtrl'
	}).
	when('/viewjob',{
		templateUrl : 'javascripts/admin/view/viewjob.html',
		controller  : 'jobCtrl'
	}).
	when('/editjob',{
		templateUrl : 'javascripts/admin/view/editjob.html',
		controller  : 'jobCtrl'
	}).
	when('/applicationform',{
		templateUrl : 'javascripts/admin/view/applicationform.html',
		controller  : 'jobCtrl'
	}).
     when('/userlist',{
		templateUrl : 'javascripts/admin/view/userlist.html',
		controller  : 'jobCtrl'
	}).
      when('/catagory',{
		templateUrl : 'javascripts/admin/view/addcatagory.html',
		controller  : 'jobCtrl'
	}).

    //**addparent pages**//
     when('/parent',{
		templateUrl : 'javascripts/admin/view/parent.html',
		controller  : 'jobCtrl'
	}).

     when('/childlist',{
		templateUrl : 'javascripts/admin/view/childlist.html',
		controller  : 'jobCtrl'
	}).
     when('/addchild',{
		templateUrl : 'javascripts/admin/view/addchild.html',
		controller  : 'jobCtrl'
	}).
     when('/editchild',{
		templateUrl : 'javascripts/admin/view/editchild.html',
		controller  : 'jobCtrl'
	}).
     when('/viewchild',{
		templateUrl : 'javascripts/admin/view/viewchild.html',
		controller  : 'jobCtrl'
	}).
     when('/about',{
		templateUrl : 'javascripts/admin/view/about.html',
		controller  : 'jobCtrl'
	}).


	//**candidate**//
     when('/admin',{
		templateUrl : 'javascripts/admin/view/admin.html',
		controller  : 'jobCtrl'
	}).
     when('/adminlist',{
		templateUrl : 'javascripts/admin/view/adminlist.html',
		controller  : 'jobCtrl'
	}).
     when('/viewadmin',{
		templateUrl : 'javascripts/admin/view/viewadmin.html',
		controller  : 'jobCtrl'
	}).
      when('/viewadmindp',{
		templateUrl : 'javascripts/admin/view/viewadmindp.html',
		controller  : 'jobCtrl'
	}).
     when('/editadmin',{
		templateUrl : 'javascripts/admin/view/editadmin.html',
		controller  : 'jobCtrl'
	}).

     

//**candidate**//
    when('/addcandidate',{
		templateUrl : 'javascripts/admin/view/addcandidate.html',
		controller  : 'candiateCtrl'
	}).
	when('/candidatelist',{
		templateUrl : 'javascripts/admin/view/candidatelist.html',
		controller  : 'candiateCtrl'
	}).
	when('/listcandidate',{
		templateUrl : 'javascripts/admin/view/listcandidate.html',
		controller  : 'candiateCtrl'
	}).
	when('/editcandidate',{
		templateUrl : 'javascripts/admin/view/editcandidate.html',
		controller  : 'candiateCtrl'
	}).
	when('/candidateprofile',{
		templateUrl : 'javascripts/admin/view/candidateprofile.html',
		controller  : 'candiateCtrl'
	}).
	/*when('/scheduler',{
		templateUrl : 'javascripts/admin/view/calander.html',
		controller  : 'candiateCtrl'
	}).*/
	when('/scheduler',{
		templateUrl : 'javascripts/admin/view/task.html',
		controller  : 'candiateCtrl'
	}).
	when('/sdlist',{
		templateUrl : 'javascripts/admin/view/schedulelist.html',
		controller  : 'candiateCtrl'
	}).
	when('/oneSchedule',{
		templateUrl : 'javascripts/admin/view/singleSchedule.html',
		controller  : 'candiateCtrl'
	}).
	
	/*reviews*/
	when('/reviewlist',{
		templateUrl : 'javascripts/admin/view/userReviews.html',
		controller  : 'reviewCtrl'
	}).
	when('/editview',{
		templateUrl : 'javascripts/admin/view/viewReviews.html',
		controller  : 'reviewCtrl'
	}).
	
	
	 otherwise({
	 redirectTo:'/login'
	 });
});
