var express = require('express');
var router = express.Router();
const {parse, stringify, toJSON, fromJSON} = require('flatted');
// const firebase = require("firebase");

const userData = require('./../users_data.json');

var firebase = require('firebase/app');
                require('firebase/auth');
                require('firebase/database');
                require('firebase/firestore');
                require('firebase/analytics');
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
    var result =[];
    try {

     
        // const snapshot = await  firestore.collection('cities').where('capital', '==', true).get();
        // const snapshot = await  firestore.collection('cities').where('state', '>=', 'CA').where('state', '<=', 'IN').get();
        // NOTE: below query requre composit index on state and population
        // const snapshot = await  firestore.collection('cities').where('state', '==', 'CA').where('population', '>', 1000000).get();
      
        // if (snapshot.empty) { console.log('No matching documents.'); return; }  
        // snapshot.forEach(doc => {console.log(doc.id, '=>', doc.data()); });
        
       /* Quering collection group query */

        const querySnapshot = await firestore.collectionGroup('landmarks').where('type', '==', 'museum').get();
        querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
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
  


module.exports = router;
