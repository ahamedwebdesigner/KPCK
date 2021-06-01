var express = require('express');
var router = express.Router();


module.exports = router;


router.get('/', function(req, res, next) {
 res.render('ajax-promis', { 
    appname: "appData.appName",
    title: "appData.loginPage.pagetitle",
    desc:"appData.loginPage.pageDesc",
   });
});



router.get('/getName', function(req, res, next) {
    setTimeout(()=>res.send("Mustaq"),3000) ;
        
});

router.get('/getModifiedName', function(req, res, next) {
    console.log(req.query.name);
    setTimeout(()=>res.send(req.query.name.toLocaleUpperCase()),3000) ;
    
        
});

router.get('/getMessage', function(req, res, next) {
    console.log(req.query.name);
    setTimeout(()=>res.send("Hello "+req.query.name+" welcome to new world of development"),3000) ;
    
        
});
//    