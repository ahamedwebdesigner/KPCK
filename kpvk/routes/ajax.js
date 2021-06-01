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
        res.send("Mustaq");
        
});

//    console.log(req.query.name);