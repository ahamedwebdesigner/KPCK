var express = require('express');
var router = express.Router();
var appData = require('../lang/en.js');

/* GET home page. */
router.get('/', function(req, res, next) {

  //console.log(appData);
  res.render('index', { 
                        appname: appData.appName,
                        title: appData.loginPage.pagetitle,
                        desc:appData.loginPage.pageDesc,
                        logintxt: appData.loginPage.pagetitle,
                        loginformdesc: "Please enter your email and password"

                       });
});
router.get('/super-admin', function(req, res, next) {
  res.render('super-admin', { title: 'Welcome to super admin' });
});

router.get('/owner', function(req, res, next) {
  res.render('owner', { title: 'Welcome to super admin' });
});

router.get('/pom', function(req, res, next) {
  res.render('pom', { title: 'Welcome to super admin' });
});


// ====================================================================================//
//                     working with cookies                                            //

router.get('/cookieset', function(req, res, next) {
  res.cookie('remember',1);  // setting cookie
  res.cookie('cart', { items: [1, 2, 3] });
  res.cookie('cart2', { items: [1, 2, 3,4,5,6], }, { maxAge: 1000 *5});
  res.cookie('name', 'Aleena', { path: '/cookieget' ,maxAge: 1000 *60})
  res.cookie('remembermeTwice', true,  { expires: new Date(Date.now() + 1000), httpOnly:true});

  res.render('test', { title: 'Welcome to super admin' });
});


router.get('/cookieget', function(req, res) {  
  res.status(200).send(req.cookies);  // sending
}); 

router.get('/getcookies', function(req, res) {  
  res.status(200).send(req.cookies);  // sending
}); 

router.get('/cookieclear', function(req, res) {  
  res.clearCookie('remember');
  res.status(200).send(req.cookies);  
}); 

// ====================================================================================//

// post routes





module.exports = router;
