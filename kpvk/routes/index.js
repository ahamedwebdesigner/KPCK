var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome to KPVK' });
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



module.exports = router;
