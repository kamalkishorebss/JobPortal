var jobPortal = angular.module("jobPortal",["ngSanitize","ngRoute","ngStorage","ngMessages","ui-notification","ui.bootstrap"]);

//**user**//
jobPortal.config(function($routeProvider){
	$routeProvider.
    when('/home',{
		templateUrl : 'javascripts/user/view/home.html',
		controller  : 'userCtrl'
	}).
	when('/usersignin',{
		templateUrl : 'javascripts/user/view/usersignin.html',
		controller  : 'userCtrl'
	}).
	when('/usersignup',{
		templateUrl : 'javascripts/user/view/usersignup.html',
		controller  : 'userCtrl'
	}).
    when('/reset',{
		templateUrl : 'javascripts/user/view/reset1.html',
		controller  : 'userCtrl'
	}).
	 when('/forget',{
		templateUrl : 'javascripts/user/view/forget1.html',
		controller  : 'userCtrl'
	}).

	when('/jobs',{
		templateUrl : 'javascripts/user/view/jobs.html',
		controller  : 'userCtrl'
	}).
	when('/previewjob',{
		templateUrl : 'javascripts/user/view/previewjob.html',
		controller  : 'userCtrl'
	}).
	when('/appform',{
		templateUrl : 'javascripts/user/view/userappform.html',
		controller  : 'userCtrl'
	}).
	when('/userprofile',{
		templateUrl : 'javascripts/user/view/userdp.html',
		controller  : 'userCtrl'
	}).
	when('/editdp',{
		templateUrl : 'javascripts/user/view/editdp.html',
		controller  : 'userCtrl'
	}).
	when('/uabout',{
		templateUrl : 'javascripts/user/view/uabout.html',
		controller  : 'userCtrl'
	}).
	when('/contact',{
		templateUrl : 'javascripts/user/view/contact.html',
		controller  : 'userCtrl'
	}).
	when('/review',{
		templateUrl : 'javascripts/user/view/review.html',
		controller  : 'userCtrl'
	}).
	when('/jobpage',{
		templateUrl : 'javascripts/user/view/jobpage.html',
		controller  : 'userCtrl'
	}).
	when('/500', {
        templateUrl: 'javascripts/user/view/500.html',
        controller: 'userCtrl'
    }).
    when('/404', {
        templateUrl: 'javascripts/user/view/404.html',
        controller: 'userCtrl'
    }).
	
	
	
	 otherwise({
	 redirectTo:'/home'
	 })
});




