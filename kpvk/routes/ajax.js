var express = require('express');
var router = express.Router();

var multer  = require('multer')
var upload = multer({ dest: './uploads' })


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);  
    }
  });

  var upload = multer({ storage: storage });


router.get('/', function(req, res, next) {
 res.render('ajax-promis', { 
    appname: "appData.appName",
    title: "appData.loginPage.pagetitle",
    desc:"appData.loginPage.pageDesc",
   });
});


//  getName -> getModifiedName -> getMessage
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



// working with fetch api



router.get('/getJson', function(req, res, next) {
   res.json({ user: 'Mustaq Ahamed' });
//    return res.status(400).send({
//         message: 'This is an error!'
//     }); 
            
});


router.post('/postjson', function(req, res, next) {

    console.log("---------------------------------");
    console.log(req.body);
    // console.log((req.headers));
    console.log((req.headers['x-authantication-key']));
    console.log("---------------------------------");
    res.json({ message: 'Data submitted' });
        
});



router.get('/fileUPload', function(req, res, next) {
    res.render('fetch_file_ul', { 
        appname: "appData.appName",
        title: "appData.loginPage.pagetitle",
        desc:"appData.loginPage.pageDesc",
       });
        
});



router.post('/fileUPload',  upload.single('avatar'),function(req, res, next) {
    console.log("=========================================="); 
    console.log(req.file, req.body);
    
    res.json({ message: 'Data submitted' });
    console.log("=========================================="); 
   
});

router.post('/double-data',function(req, res, next) {
    console.log("==========================================");   
    console.log( req.body.salery );  
    
    if(req.body.salery==2){
        res.json({ value :  req.body.salery+2.5 });
    }

    console.log("=========================================="); 
   
});









module.exports = router;