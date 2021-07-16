var express = require('express');
var router = express.Router();

const firebase = require("firebase");
const firestore = require("firebase/firestore");
const admin = require('firebase-admin');
const app = admin.initializeApp();

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



/* GET home page. */
router.get('/',async function(req, res, next) {

  res.render('index', { title: 'get all the details ' });
});

router.get('/create', async function(req, res, next) {

  /*
  const data = {
    name: 'Los Angeles',
    state: 'CA',
    country: 'USA'
  };
  
  // Add a new document in collection "cities" with ID 'LA'
 await citiesRef.doc('LA').set(data);
  */



/*

 const results = await citiesRef.doc('ba').set({
   capital: true
 }, { merge: true });

 */

/*
const data = {
  stringExample: 'Hello, World!',
  booleanExample: true,
  numberExample: 3.14159265,
  dateExample: new Date('December 10, 1815'),
  arrayExample: [5, true, 'hello'],
  nullExample: null,
  objectExample: {
    a: 5,
    b: true
  }
};

const results = await db.collection('dataDummy').doc('temp1').set(data);
*/

/*
const results = await citiesRef.add({
  name: 'Tokyo',
  country: 'Japan'
});
console.log('Added document with ID: ', res.id);
*/


/*
const newCityRef = citiesRef.doc('ATP');
// Later...
const results = await newCityRef.set({
  name: 'Anantpur',
  country: 'Japan'
});

console.log("-----------------");
console.log(newCityRef);
console.log(results);
console.log("-----------------");

*/
/*
// firestore: formating date

//const time = admin.firestore.Timestamp.now();
const data = {
  stringExample: 'Hello, World!',
  booleanExample: true,
  numberExample: 3.14159265,
  dateExample: firebase.firestore.Timestamp.fromDate(new Date('December 10, 1816')),
  arrayExample: [5, true, 'hello'],
  nullExample: null,
  objectExample: {
    ant: 5,
    b: true
  }
};
try {
  const results = await db.collection('dataDummy').doc('temp4').set(data);
} catch (error) {
    console.log("-----------------");
    console.log(error);
    console.log("-----------------");
}

*/




const data = {
  created: firebase.firestore.Timestamp.now(),
 
};
try {
  const results = await db.collection('dataDummy').doc('temp5').set(data);
} catch (error) {
    console.log("-----------------");
    console.log(error);
    console.log("-----------------");
}



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
