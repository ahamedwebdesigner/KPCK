var express = require('express');
var router = express.Router();
const {parse, stringify, toJSON, fromJSON} = require('flatted');
// const firebase = require("firebase");

var firebase = require('firebase/app')
                require('firebase/auth')
                require('firebase/functions')
                require('firebase/database')
                require('firebase/firestore')
                require('firebase/analytics')
                require('firebase/storage');
    

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
  var firestore = firebase.firestore();
  const auth = firebase.auth()


let loadTestData = async()=>{
    try {
        const usersCref = await  firestore.collection('users'); //CollectionReference
        var writeBatch = firebase.firestore().batch();   //WriteBatch
        userData.forEach(e=>{
            const {id, ...user} = e;
            writeBatch.set(usersCref.doc(String(id)), user)

        });
        writeBatch.commit();
     } catch (error) {
            console.log("-------------------");
            console.error(error)
            console.log("-------------------");
    }

};

let dropAllDocuments=async (collectionName)=>{
    try {
        firestore.collection(collectionName)
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach((doc) => {
                doc.ref.delete();
              });
        }) .catch(error=>console.log(" Error in creating document "));

    } catch (error) {
            console.log("-------------------");
            console.error(error)
            console.log("-------------------");
    }
};





/* GET home page. */
router.get('/',async function(req, res, next) {

    console.log("---------------------");
    console.log( );
    console.log("---------------------");
    const arrayToUpdate = firebase.firestore.FieldValue.arrayUnion("one");
    var result =[];
    try {




        let documentRef = firestore.doc('students/001'); 
        documentRef.update(
            'stidemtID', firebase.firestore.FieldValue.Increment(1)
          ).then(() => {
            return documentRef.get();
          }).then(doc => {
                console.log("--------------working-------------");
                console.error(doc.data())
                console.log("-------------------------------");
          });

          
          //res.render('index', { title: 'working with firestore delet',data:{}}); if(!usersQuerySnapshot.empty){ 
            const usersQuerySnapshot = await  firestore.collection('users').get(); 
            result =  usersQuerySnapshot.docs.map((doc) => { return { id: doc.id, ...doc.data() }});
            res.render('index', { title: 'working with firestore delet',data:result});
    
     } catch (error) {
            console.log("--------------ERROR-------------");
            console.error(error)
            console.log("-------------------------------");
    }
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

router.get('/reset', async function(req, res, next) {
    let result=[];
   // dropAllDocuments('users');
    loadTestData();
    res.render('index', { title: 'working with firestore delet',data:result});
});
  


router.get('/cities', async function(req, res, next) {

    var citiesRef = firestore.collection("cities");

citiesRef.doc("SF").set({
    name: "San Francisco", state: "CA", country: "USA",
    capital: false, population: 860000,
    regions: ["west_coast", "norcal"] });
citiesRef.doc("LA").set({
    name: "Los Angeles", state: "CA", country: "USA",
    capital: false, population: 3900000,
    regions: ["west_coast", "socal"] });
citiesRef.doc("DC").set({
    name: "Washington, D.C.", state: null, country: "USA",
    capital: true, population: 680000,
    regions: ["east_coast"] });
citiesRef.doc("TOK").set({
    name: "Tokyo", state: null, country: "Japan",
    capital: true, population: 9000000,
    regions: ["kanto", "honshu"] });
citiesRef.doc("BJ").set({
    name: "Beijing", state: null, country: "China",
    capital: true, population: 21500000,
    regions: ["jingjinji", "hebei"] });
//--------------------------------------------



var landmarks = Promise.all([
    citiesRef.doc('SF').collection('landmarks').doc().set({
        name: 'Golden Gate Bridge',
        type: 'bridge'
    }),
    citiesRef.doc('SF').collection('landmarks').doc().set({
        name: 'Legion of Honor',
        type: 'museum'
    }),
    citiesRef.doc('LA').collection('landmarks').doc().set({
        name: 'Griffith Park',
        type: 'park'
    }),
    citiesRef.doc('LA').collection('landmarks').doc().set({
        name: 'The Getty',
        type: 'museum'
    }),
    citiesRef.doc('DC').collection('landmarks').doc().set({
        name: 'Lincoln Memorial',
        type: 'memorial'
    }),
    citiesRef.doc('DC').collection('landmarks').doc().set({
        name: 'National Air and Space Museum',
        type: 'museum'
    }),
    citiesRef.doc('TOK').collection('landmarks').doc().set({
        name: 'Ueno Park',
        type: 'park'
    }),
    citiesRef.doc('TOK').collection('landmarks').doc().set({
        name: 'National Museum of Nature and Science',
        type: 'museum'
    }),
    citiesRef.doc('BJ').collection('landmarks').doc().set({
        name: 'Jingshan Park',
        type: 'park'
    }),
    citiesRef.doc('BJ').collection('landmarks').doc().set({
        name: 'Beijing Ancient Observatory',
        type: 'museum'
    })
]);


landmarks.then((values) => {
    console.log(values);
  });

    let result=[];
    res.render('index', { title: 'cites database created ',data:result});
});
  


router.get('/temp-data', async function(req, res, next) {
    var studentsRef = firestore.collection("students");
    studentsRef.doc("001").set({
            stidemtID: 001,
            stopts:['cricket','baseball']
        });
        res.render('index', { title: 'student data created ',data:[]});
});



module.exports = router;
