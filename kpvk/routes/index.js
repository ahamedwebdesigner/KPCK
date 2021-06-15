var express = require('express');
var router = express.Router();
var appData = require('../lang/en.js');
const bcrypt = require('bcryptjs');
let MongoClient = require('mongodb').MongoClient;


const ObjectID = require('mongodb').ObjectID;


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
router.get('/super-admin',helpers.ifNotLoggedin, function(req, res, next) {

  var sql = "select id,user_name,user_status from user"; 

  db.query(sql, (err, rows) => {

    if (err){
      res.send( err.message);
      return;
    }
 
    res.render('super-admin', { title: 'Welcome to super admin',  userdata:rows });
  });

 
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


router.get('/mongo', function(req, res) {  
  let mungourl = 'mongodb+srv://kdpvk_db_user:mOtWSRqQsrsc3dLI@kpvk.npdza.mongodb.net/KDPVK?retryWrites=true&w=majority';

  MongoClient.connect(mungourl,{useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
    if (err) throw err;
  
    var dbo = db.db("products"); // database name
/*
///////////////////////////////////////////////////////////////////////////////////////////////////////
//1) inserting 
    dbo.collection("items").insertOne({ name:"face clenser",price: 300},(err, result)=>{ // table name 
      if (err) throw err;
            res.json(result);
            db.close();
    });


    dbo.collection("items").insertOne({ name:"facewash",price: 30},(err, result)=>{ // table name 
      if (err) throw err;
            res.json(result);
            db.close();
    });

*/

/*
//2) updating
///////////////////////////////////////////////////////////////////////////////////////////////////////

// using mongodb Object ID

  dbo.collection("items").updateOne(
    { _id: new ObjectID('60c6da93bb8f743408d65d82') },
    { $set: { name:"xxxxxxxxxxxxxxxxxxxxxx" ,price: 400} },
    {upsert:true}, 
    function(err, result) {
      res.json(result);
    });



    dbo.collection("items").updateOne(
          { name:"facewash new"},
          { $set: { name:"facewash very" ,price: 400} },
           {upsert:true}, 
           function(err, result) {
            res.json(result);
           });
*/
    
dbo.collection("items")

  });

 
});




router.get('/ajaxeg', function(req, res, next) {

  var userData = [
    { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012},
    { name: 'Tux', organization: "Linux", birth_year: 1996},
    { name: 'Moby Dock', organization: "Docker", birth_year: 2013}
  ];


  res.render('promis-ajax', { 
                        appname: appData.appName,
                        title: appData.loginPage.pagetitle,
                        desc:appData.loginPage.pageDesc,
                        logintxt: appData.loginPage.pagetitle,
                        loginformdesc: "Please enter your email and password",
                        data_url:"/getdata",
                        userData: userData,

                       });
});
router.get('/getdata', function(req, res, next) {
  res.json({ name: "Mustaq" });
});



module.exports = router;
