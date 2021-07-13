var express = require('express');
var router = express.Router();
var appData = require('../lang/en.js');
const bcrypt = require('bcryptjs');
const firebase = require("firebase");
const firestore = require("firebase/firestore");

const firebaseConfig = {
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
const Employe = db.collection("Employe");


/* GET home page. */
router.get("/", async (req, res) => {
    const snapshot = await Employe.get();
    
    // res.send(snapshot.docs);
    // console.log("====================================");
    // console.log(snapshot);
    // console.log("====================================");
    
 // res.render('firebase');

 const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
 res.send(list);


});
router.get("/create", async (req, res) => {
  const resuts = await Employe.add(
    {
      name:"mustaq"
    }
  );

  res.json(resuts);
  console.log("====================================");
  console.log(snapshot);
  console.log("====================================");
  
// res.render('firebase');
});
router.get("/update", async (req, res) => {

  // delete req.body.id;
  // const data = req.body;
  // await Employe.doc(id).update(data);

  const resuts =   await Employe.doc('5fEGPGowjSqYcwzkQCpN').update({
    name:"mustaq ahamed"
  });

  res.json(resuts);

});
router.get("/delet", async (req, res) => {
  const resuts =   await Employe.doc('5fEGPGowjSqYcwzkQCpN').delete();
  res.json(resuts);

});

router.get("/linkone", async (req, res) => {

console.log("=====================");
console.log(firestore);
console.log("=====================");


 // res.json(  firestore.collection('Employe'));
  // res.json({resuts:"data caeme successefully",... });

});


module.exports = router;
