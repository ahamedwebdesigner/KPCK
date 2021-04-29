var express = require('express');
var router = express.Router();
var appData = require('../lang/en.js');
//const bcrypt = require('bcryptjs');


/* GET users listing. */
router.get('/create', function(req, res, next) {

//   const { host, port, user, password, database } = config.database;
//   const { applicationName,appDiscription} = config.appdata;



// console.log(appDiscription); 

// db.query('SELECT 1 + 1 AS result', function (error, results, fields) {
//   if (error) throw error;
//   console.log(results[0].result);
// });


res.render('user/create',  { 
    appname: appData.appName,
    title: appData.userCreate.pagetitle,
    desc:appData.userCreate.pageDesc,
    logintxt: appData.userCreate.pagetitle,
    loginformdesc: "Please enter your email and password"

   });
});

router.post('/save',function(req, res, next){
  //TODO: save the data in user table
  console.log(req.body);
  res.send("user data saved");

})


router.post('/login',function(req, res, next){
  const  backURL=req.header('Referer') || '/';
  if(req.body.email =="mustaq@gmail.com" && req.body.password=="123456"){
    req.session.isLoggedIn=true;
    // do your thang
    res.redirect(backURL);
  }


  res.send("user data saved");

})


module.exports = router;
