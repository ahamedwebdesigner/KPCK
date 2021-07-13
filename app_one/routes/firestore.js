var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'get all the details ' });
});

router.get('/create', function(req, res, next) {
  res.render('index', { title: 'working with firestore create' });
});

router.get('/read', function(req, res, next) {
  res.render('index', { title: 'working with firestore read' });
});


router.get('/update', function(req, res, next) {
  res.render('index', { title: 'working with firestore update' });
});

router.get('/delet', function(req, res, next) {
  res.render('index', { title: 'working with firestore delet' });
});



module.exports = router;
