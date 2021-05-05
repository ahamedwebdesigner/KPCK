var express = require('express');
var router = express.Router();
var appData = require('../lang/en.js');
const bcrypt = require('bcryptjs');

const ifNotLoggedin = (req, res, next) => {
  if(!req.session.isLoggedIn){
      return res.redirect('/');
  }
  next();
}


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
router.get('/super-admin',ifNotLoggedin, function(req, res, next) {
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

router.get('/setsession', function(req, res) {  
  req.session.name = 'Arshiya';
  req.session.count = 0;
  res.status(200).send('set session called');  // sending
}); 

router.get('/getsession', function(req, res) {  
  req.session.count++;
  res.status(200).send(req.session);  // sending
}); 


// redirect

router.get('/redirecteg1', function(req, res) {  
 
  // if res.settion.user.logedinstatus== false
  //res.redirect('/getsession');
  //res.redirect('http://skillsandwills.com')
  //res.redirect(301, 'http://skillsandwills.com')
}); 


router.get('/headers', function(req, res) {  
 

  res.header("x-message","hellow all");
  res.send('<p>some html</p>')
}); 



// about bcript

router.get('/bcript', function(req, res) {  
 

  

  bcrypt.compare("123456",'$2a$12$50.MTQBw3XtEaR/Rigb0/epgV0CL5GusRIuY/2HSsYBDFShmH7unS').then(result =>{

    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
    console.log(result)
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
  });

  // bcrypt.hash("123456", 12).then((hash_pass) => {
  //   console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
  //   console.log(hash_pass)
  //   console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
  // });
 res.status(200).send("password generated successefully"); 
}); 


// middle ware

const middlewareg = (req, res, next) => {

  // user is loged is or not if not logedin i will redirect to login page
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
    console.log("middle ware function is called")
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
  next();
}


router.get('/middleware',middlewareg, function(req, res) {  
  console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
  console.log("route  is called")
  console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
  res.send("From Middle ware");
});


module.exports = router;
