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


  console.log("--------------------");
  console.log(setResult);
  console.log("--------------------");

  res.render('index', { title: 'get all the details ' });
});

router.get('/create', async function(req, res, next) {

  await citiesRef.doc('SF').set({
    name: 'San Francisco', state: 'CA', country: 'USA',
    capital: false, population: 860000
  });

  await citiesRef.doc('LA').set({
    name: 'Los Angeles', state: 'CA', country: 'USA',
    capital: false, population: 3900000
  });
  await citiesRef.doc('DC').set({
    name: 'Washington, D.C.', state: null, country: 'USA',
    capital: true, population: 680000
  });
  await citiesRef.doc('TOK').set({
    name: 'Tokyo', state: null, country: 'Japan',
    capital: true, population: 9000000
  });
  await citiesRef.doc('BJ').set({
    name: 'Beijing', state: null, country: 'China',
    capital: true, population: 21500000
  });

  res.render('index', { title: 'working with firestore update' });
});

router.get('/read', async function(req, res, next) {


  const cityRef = db.collection('cities').doc('SF');
  const doc = await cityRef.get();
  if (!doc.exists) {
    console.log('No such document!');
  } else {
   
    console.log('Document data:', doc.data());

  }

  res.render('index', { title: 'working with firestore read' });
});

router.get('/update',  async function(req, res, next) {
  res.render('index', { title: 'working with firestore update' });
});

router.get('/delet', async function(req, res, next) {
  res.render('index', { title: 'working with firestore delet' });
});



module.exports = router;
