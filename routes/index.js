var express = require('express');
var router  = express.Router();
var multer  = require("multer");
var model   = require('../model/adminmodel');
var mime = require('mime-types');
var bCrypt = require('bcrypt');
var passport  =  require('passport');
var LocalStrategy =  require('passport-local').Strategy;


var subAdmin            = require('../controller/admincontroller');
var companyController   = require('../controller/companycontroller');
var jobController       = require('../controller/jobcontroller');
var candidateController = require('../controller/candidatecontroller');
var parentController    = require('../controller/parentcontroller');
var userController      = require('../controller/usercontroller');
var contactController   = require('../controller/contactcontroller');
var reviewController    = require('../controller/reviewcontroller');
var scheduleController  = require('../controller/schedulecontroller');
var catController       = require('../controller/catagorycontroller');
//***************uploadsimage in company****************//
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
    	console.log('file ',file);
        cb(null, Date.now()+'.'+ mime.extension(file.mimetype));
    }
});
var uploads = multer({ storage: storage });
//------end----//


//***************upload file signup****************//
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/userdp/')
    },
    filename: function (req, file, cb) {
    	console.log('file ',file);
        cb(null, Date.now()+'.'+ mime.extension(file.mimetype));
    }
});
var userdp = multer({ storage: storage });

//***************locationadmin******************//
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/admin/')
    },
    filename: function (req, file, cb) {
    	console.log('file ',file);
        cb(null, Date.now()+'.'+ mime.extension(file.mimetype));
    }
});
var admin = multer({ storage: storage });

//***************uploads images parents******************//
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/photo/')
    },
    filename: function (req, file, cb) {
    	console.log('file ',file);
        cb(null, Date.now()+'.'+ mime.extension(file.mimetype));
    }
});
var photo = multer({ storage: storage });

//***************uploads images child******************//
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/childImage/')
    },
    filename: function (req, file, cb) {
        console.log('file ',file);
        cb(null, Date.now()+'.'+ mime.extension(file.mimetype));
    }
});
var childImage = multer({ storage: storage });

//**is validfunction**//
var isValidpassword = function(user,password)
{
    return bCrypt.compareSync(password, user.password);
    console.log("compared password"+user.password);
    console.log(user);
}   

/*var auth = function(req,res,next){

	if(req.session.admin){
		next();
	}
	else{
		res.redirect('login');
	}


}*/


/* GET home page. */
router.get('/', function(req, res,next){
  res.render('index', { title: 'Express' });
});

//admin pannel
router.get('/dashboard', function(req, res, next) {
  res.render('dashboard', { title: 'dashboard' });
});


/* admin */
router.post('/admin', admin.single('file'),subAdmin.save);
router.post('/loged', subAdmin.log);
router.post('/sendemail',subAdmin.mailSend);
router.get('/changepassword',subAdmin.changePassword);
router.post('/update/:E',subAdmin.updatedPassword);
router.get('/adminlist', subAdmin.listadmin);
router.get('/viewadmin/:id', subAdmin.viewadmin);
router.get('/editadmin/:id', subAdmin.edit);
router.post('/saveadmin/:id', subAdmin.editSave);
router.delete('/deleteadmin/:id',subAdmin.delete);
router.get('/adminLogout', function(req, res) {

    req.logout();
	res.send(req.data);

});


/* compnay */
router.post('/xyz', uploads.single('file'),companyController.add);
router.get('/company', companyController.viewCompnay);
router.get('/editcompany/:id',companyController.editCompany);
router.post('/editcompany/:id', companyController.saveCompany);
router.get('/viewcompany/:id',companyController.viewCompany);
router.get('/viewCompanies/:ad',companyController.viewCompanies);
router.post('/email',companyController.reminder);
router.delete('/delete/:id',companyController.delete);



/* jobs */
router.post('/job',jobController.job);
router.get('/joblist',jobController.alljob);
router.get('/viewjob/:id',jobController.viewjob);
router.get('/editjob/:id',jobController.editjob);
router.post('/editjobsave/:id',jobController.editjobsave);
router.delete('/deletejob/:id',jobController.deletejob);
router.post('/searchjob',jobController.clJob);



/*parent*/
router.post('/parent',photo.single('file'),parentController.Parent);
router.get('/vp',parentController.viewparent); //view parent


/*child*/
router.post('/childpage',childImage.single('file'),parentController.child);// add child pages
router.get('/childlist',parentController.viewChilds); //view all child pages
router.get('/seechild/:id',parentController.viewChild);
router.post('/editchildsave/:id',parentController.editChildsave);
router.delete('/deletechild/:id',parentController.deleteChild);



/*candidate*/
router.post('/addcandidate',candidateController.addcandidate);
router.get('/candidatelist',candidateController.candidate);
router.get('/editcandidate/:id',candidateController.editcandidate);
router.get('/viewcandidate/:id',candidateController.candidateprofile);
router.get('/candidates/:nm',candidateController.candidateWise);
router.post('/savecandidate/:id',candidateController.saveCandidate);
router.delete('/deletecandidate/:id',candidateController.deletecandidate);



/* schedule */
router.post('/schedule',scheduleController.Sched);
router.get('/seeSchedule',scheduleController.seeAll);
router.get('/singleSchedule/:id',scheduleController.scheduleOne);
router.get('/singleDay',scheduleController.daySchedule);
router.get('/seeSchedule/:u',scheduleController.ScheduleList);
router.post('/editSavetask/:id',scheduleController.editSavetask);
router.delete('/deleteSch/:id',scheduleController.deleteOneschedule);


/*add catagory*/
router.post('/addCat',catController.saveCatagory);
router.get('/listCat',catController.listCatagory);
//**admin panel  end**//




///////////////////////////////////////////////////////////////////////////////////////////////

//**start user end**//

/* user */
router.post('/abc',userdp.single('file'),userController.register);
router.post('/usersignin', passport.authenticate('local'), function(req, res) {
  res.send(req.user);
});
router.get('/logout',function(req,res){
    req.logout();
	res.send(req.user);
});
router.post('/send',userController.sendemail);
router.get('/password',userController.password);
router.post('/update/:e',userController.save);
router.post('/saveEdit/:id',userController.saveEdit);
router.get('/userlist',userController.viewUser);
router.delete('/deleteUsers/:id',userController.deleteUser);

router.post('/contact',contactController.contact);
router.get('/peoplelist',contactController.people);

/*reviews*/
router.post('/reviews',reviewController.saveReview);
router.get('/seeAll',reviewController.showReview);
router.get('/getreviews',reviewController.viewReview);
router.delete('/deletereview/:id',reviewController.reviewDelete);
router.get('/w/:id',reviewController.View);
router.post('/viewSave/:id',reviewController.viewSave);

//**End user end**//




module.exports = router;

