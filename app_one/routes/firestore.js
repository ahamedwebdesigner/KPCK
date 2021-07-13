var express = require('express');
var router = express.Router();

const firebase = require("firebase");
const firestore = require("firebase/firestore");
var firebaseConfig = {
  apiKey: "AIzaSyDSjSZHNxJz3cAv3J9ztFYY8GaHQR1gDxU",
    authDomain: "app-one-trile.firebaseapp.com",
    projectId: "app-one-trile",
    storageBucket: "app-one-trile.appspot.com",
    messagingSenderId: "886124432482",
    appId: "1:886124432482:web:fc0ea65d917d90f2bfd53b",
    measurementId: "G-YPSD3CW0YC"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const EmployeDbRef = db.collection("Employe");
const citiesRef = db.collection('cities');



/* GET home page. */
router.get('/',async function(req, res, next) {
  res.render('index', { title: 'get all the details ' });
});

router.get('/create', async function(req, res, next) {
  res.render('index', { title: 'working with firestore update' });
});

router.get('/read', async function(req, res, next) {
  res.render('index', { title: 'working with firestore read' });
});

router.get('/update',  async function(req, res, next) {
  res.render('index', { title: 'working with firestore update' });
});

router.get('/delet', async function(req, res, next) {
  res.render('index', { title: 'working with firestore delet' });
});



module.exports = router;
