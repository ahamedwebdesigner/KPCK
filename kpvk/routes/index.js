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


// post routes





module.exports = router;
