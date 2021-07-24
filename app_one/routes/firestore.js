var express = require('express');
var router = express.Router();

const firebase = require("firebase");
// const firestore = require("firebase/firestore");
const {firestore, FieldValue} = require('firebase/firestore');

const admin = require('firebase-admin');
var serviceAccount = require("./../kdpvk-24195-firebase-adminsdk-x1r6l-eb56d47c92.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// admin.initializeApp({
//   credential: admin.credential.applicationDefault(),
//   databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
// });

admin.firestore.setLogFunction(console.log);



var firebaseConfig = {
  apiKey: "AIzaSyCChBGLxm7e8TpLzATlcftPiJUGGA7hK-Q",
    authDomain: "kdpvk-24195.firebaseapp.com",
    projectId: "kdpvk-24195",
    storageBucket: "kdpvk-24195.appspot.com",
    messagingSenderId: "438665628446",
    appId: "1:438665628446:web:95fd3eb2f29d725ea9d70f",
    measurementId: "G-FQZQM92CVK"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const EmployeDbRef = db.collection("Employe");
const citiesRef = db.collection('cities');
const UsersRef = db.collection('Users');


/* GET home page. */
router.get('/',async function(req, res, next) {

  res.render('index', { title: 'get all the details ' });
});

router.get('/create', async function(req, res, next) {




  res.render('index', { title: 'working with firestore create' });
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
