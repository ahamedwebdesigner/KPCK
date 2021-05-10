var express = require('express');
var router = express.Router();
var appData = require('../lang/en.js');
const bcrypt = require('bcryptjs');






router.get('/all',helpers.ifNotLoggedin,(req, res, next)=>{


  var sql = "select * from user"; 
  db.query(sql, (err, rows) => {

    if (err){
        
      res.send( err.message);
      return;
    }


    var pagedata= { 
      appname: appData.appName,
      title: appData.listofUsers.pagetitle,
      desc:appData.listofUsers.pageDesc,
      logintxt: appData.listofUsers.pagetitle,
      loginformdesc: "Please enter your email and password",
      userdata:rows
  
     };
    res.render('user/all',pagedata );

  });


})
/* GET users listing. */
router.get('/create', function(req, res, next) {

//   const { host, port, user, password, database } = config.database;
//   const { applicationName,appDiscription} = config.appdata;



// console.log(appDiscription); 

// db.query('SELECT 1 + 1 AS result', function (error, results, fields) {
//   if (error) throw error;
//   console.log(results[0].result);
// });  `INSERT INTO user(user_name,user_password,mobile_number,gender,address,village,user_status,doj,NoOfCatels,NoOfLiters,UserType)VALUES ?`;



res.render('user/create',  { 
    appname: appData.appName,
    title: appData.userCreate.pagetitle,
    desc:appData.userCreate.pageDesc,
    logintxt: appData.userCreate.pagetitle,
    loginformdesc: "Please enter your email and password"

   });
});



// router.post('/create', function(req, res, next) {

//   console.log("===============================");
//   console.log(req.body);
//   console.log("===============================");


// bcrypt.hash(req.body.user_password, 12).then((hash_pass)=>{
//   console.log("===============================");
//   console.log(hash_pass);
//   console.log("===============================");

//   var sql ='INSERT INTO user (user_name,user_password,mobile_number,gender,address,village,user_status,doj,NoOfCatels,NoOfLiters,UserType) VALUES (?,?,?,?,?,?,?,?,?,?,?)';
// var params =[req.body.user_name,hash_pass,req.body.mobile_number,req.body.gender,req.body.Address, req.body.village,1,'now()',req.body.NoOfCatels,req.body.NoOfLiters,req.body.UserType];

// db.query(sql, params,(err, result) =>{
//   if (err){
//     // res.status(400).json({"error": err.message})
//     res.send('Error occured : '+ err.message);
//     return;
//   }
//   res.send('user data submited with successefully');
//   });
// })




// });

router.post('/create', function(req,res,next){
  bcrypt.hash(req.body.user_password, 12).then((hash_pass)=>{
    var sql ='INSERT INTO user (user_name,user_password,mobile_number,gender,address,village,user_status,doj,NoOfCatels,NoOfLiters,UserType) VALUES (?,?,?,?,?,?,?,?,?,?,?)';
     var params =[req.body.user_name,hash_pass,req.body.mobile_number,req.body.gender,req.body.Address, req.body.village,1,'now()',req.body.NoOfCatels,req.body.NoOfLiters,req.body.UserType];
    db.query(sql, params,(err, result) =>{
        if (err){
        
          res.send( err.message);
          return;
        }
        res.send('user data submited with successefully');
        });
      })
  
})



router.post('/login',function(req, res, next){
  const  backURL=req.header('Referer') || '/';
  //1) grab the email from post data
  //2) make a databse call to get information 
  //3) compare password
  //4) if true set session islogged in true

       
        var sql = "select * from user where user_name = ?"
        let values =[req.body.user_name];

        db.query(sql,values, function (err, result) {  
          if (err) throw err;  
             
          if(result.length>0){
                console.log("+++++++++++++++++++++++++++++++++++++++++");
                console.log(req.body.password);
                console.log(result[0].user_password);
              
                bcrypt.compare(req.body.password,result[0].user_password).then(cresult =>{

                console.log(cresult);
                if(cresult){
                  req.session.isLoggedIn=true;
                  res.redirect('/super-admin');
                }else{
                  res.status(200).send(`your account password dosent match, Contact admin or login with correct passwrod<a href="/">Login</a>`);
                }
              
              });

              console.log("+++++++++++++++++++++++++++++++++++++++++");

           

          }else{
            //res.redirect('/');
            res.send(`your account doesnot exist , please provide valied information <a href="/">Login</a>`);

          }
        });  



  // if(req.body.email =="mustaq@gmail.com" && req.body.password=="123456"){
   
  //   // do your thang
  //   res.redirect(backURL);
  // }




})


module.exports = router;
