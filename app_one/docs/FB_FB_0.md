
# 1)  configuring fire base 
<pre>

const firebase = require("firebase");
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


</pre>

# 2) configuring firebase admin tools
<pre>
//------------------------------------------------------------------------------------------------
Goto project settings -> service account etc
generate key and store in json file
https://console.firebase.google.com/u/0/project/kdpvk-24195/settings/serviceaccounts/adminsdk
create firebase ad in object -> extract firestore object
//------------------------------------------------------------------------------------------------

    const firebaseAdmin = require('firebase-admin');
    var serviceAccount = require("./../kdpvk-24195-firebase-adminsdk-x1r6l-eb56d47c92.json");
    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(serviceAccount)
    });
    firebaseAdmin.firestore.setLogFunction(console.log);
    const firestore = firebaseAdmin.firestore(); 


    const settings = {timestampsInSnapshots: true};
    firestore.settings(settings);

</pre>

# 3) working with datatypes
<pre>
        // configuration 
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

        try {
                var docData = {
                stringExample: "Hello world2!",
                booleanExample: true,
                numberExample: 3.14159265,
                dateExample: firebase.firestore.Timestamp.fromDate(new Date("July 02, 2021")),
                arrayExample: [5, true, "hello"],
                nullExample: null,
                objectExample: {
                    a: 5,
                    b: {
                        nested: "foo"
                    }
                }
        };
        firestore.collection("dataOne").doc("two").set(docData).then(() => {
            console.log("Document successfully written!");
        }).catch((error) => {
            console.error("Error writing document: ", error);
        });
          
        } catch (error) {
            console.log("-------------------");
            console.error(error)
            console.log("-------------------");
        }
</pre>

# 4) Add record to the collection
<pre>
    let result ;
    try {
        const docRef = firestore.collection('users').doc('alovelace');

          result = await docRef.set({
          first: 'Ada',
          last: 'Lovelace',
          born: 1815
        });
    } catch (error) {
            console.log("-------------------");
            console.error(error)
            console.log("-------------------");
    }


// example 2
//---------------------------------------------------------------------------------
//adding one more record with different vey value pairs
        const aTuringRef = firestore.collection('users').doc('aturing');
        await aTuringRef.set({
                  'first': 'Alan',
                  'middle': 'Mathison',
                  'last': 'Turing',
                  'born': 1912
              });
// example 3
// adding document in tow step process 1) create document referance 2) adding document
//---------------------------------------------------------------------------------
      const usersDb = firestore.collection('users');  
      const liam = usersDb.doc('lragozzine');   // 1)  create document referacne 
      await liam.set({                           //2) adding data
            first: 'Liam',
            last: 'Ragozzine',
            address: '133 5th St., San Francisco, CA',
            birthday: '05/13/1990',
            age: '30'
        });


// example 3
// creating document using set  conforming  
//---------------------------------------------------------------------------------

    let result =[];
    try {
        const usersDb = firestore.collection('users');    
        const dbResult =  await usersDb.doc('vpeluso').set({
         first: 'Vanessa',
         last: 'Peluso',
         address: '49 Main St., Tampa, FL',
         birthday: '11/30/1977',
         age: '47'
        }).then(value =>console.log(" Documnet added successefully "))
          .catch(error=>console.log(" Error in creating document "));
    } catch (error) {
            console.log("-------------------");
            console.error(error)
            console.log("-------------------");
    }


// example 4
// creating document using set  promises
//---------------------------------------------------------------------------------

  firestore.collection("cities").doc("MB").set({
        name: "Mumbai",
        state: "MAHARASTRA",
        country: "INDIA"
    })
    .then(() => {
        console.log("Document successfully written!");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });

</pre>

# 5) Setting multiple documents
<pre>
 const citiesRef = firestore.collection('cities');

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
</pre>

# 6) update docuemnt using set 
<pre>
  
  try {
       
        /*  i) create docuent to update 
        const dbResult =  await usersDb.doc('Ahamed').set({
         first: 'Ahamed',
         last: 'syed',
         address: '49 Main St., Tampa, FL',
         birthday: '11/30/1977',
         age: '47'
        }).then(value =>console.log(" Documnet added successefully "))
          .catch(error=>console.log(" Error in creating document "));
        */
       const usersDb = firestore.collection('users');    
       var cityRef = usersDb.doc('Ahamed');

       var setWithMerge = cityRef.set({
           developer : true
       }, { merge: true })
       .then(value =>console.log(" -----> Documnet updated successefully <---------- "))
       .catch(error=>console.log(" Error in creating document "));;
   
    } catch (error) {
            console.log("-------------------");
            console.error(error)
            console.log("-------------------");
    }

</pre>

# 7) quering the docuement
<pre>

 //example1 : getting all the documents
 -----------------------------------------------------------------------
   try {
         const snapshot = await firestore.collection('cities').get();
        snapshot.docs.map(doc => result.push({id:doc.id ,data: doc.data()}))
   
    } catch (error) {
            console.log("-------------------");
            console.error(error)
            console.log("-------------------");
    }



 //example 2:  retrieve a collection
 -----------------------------------------------------------------------
 
    var result =[];
    try {
   
        firestore.collection('users')
        .get()
        .then(querySnapshot => {
            result = querySnapshot.docs.map(doc => doc.data())
         
            res.render('index',{
                title: 'get all the details ',
                // data:stringify(result)
                data:result
            });
        // do something with documents
        }) .catch(error=>console.log(" Error in creating document "));

    } catch (error) {
            console.log("-------------------");
            console.error(error)
            console.log("-------------------");
    }


 
//example 3: getting document by idthe documents
 -----------------------------------------------------------------------
       firestore.collection('users')
            .doc('Ahamed')
            .get()
            .then(snapshot => {
                    const document = snapshot.data()
                     res.render('index',{
                        title: 'get all the details ',
                        // data:stringify(result)
                        data:document
                    });

            
            }).catch(error=>console.log(" Error in creating document "));


  
</pre>

# 8) getting documents to query snapshot (async)
<pre>
      try {
        
          var result =[];
          const users = await  firestore.collection('users').get(); //QuerySnapshot
          //console.log(users.size); // size of the document
          //console.log(users.empty);
          if(!users.empty){ result =  users.docs.map(doc => doc.data()); /*QuerySnapshot -> array */}
        } catch (error) {
              console.log("-------------------");
              console.error(error)
              console.log("-------------------");
      }

      //-------------------------------------------------------------------------------

      
        try {
      
            var result =[];
            const users = await  firestore.collection('users').get(); //QuerySnapshot
            //console.log(users.size); // size of the document
            //console.log(users.empty);
            //if(!users.empty){ result =  users.docs.map((doc) => { return { id: doc.id, ...doc.data() }}); /*QuerySnapshot -> array */}
            if(!users.empty){ users.forEach((doc) => { result.push({ id: doc.id, ...doc.data() }) }); /*QuerySnapshot -> array */}


        } catch (error) {
                console.log("-------------------");
                console.error(error)
                console.log("-------------------");
        }
        res.render('index',{
            title: 'get all the details ',
            // data:stringify(result)
            data:result
        });
//------------------ using then




</pre>

# 9)  getting documents to query snapshot (promis)
<pre> 

//understanding Query snap shot
//------------------------------------------------------------------------------

      firestore.collection('users')
      .get()
      .then((querySnapshot) => {
          console.log("---------------querySnapshot--------------------");
          // console.log( querySnapshot.size);
          // console.log( querySnapshot.empty);
          // console.log( querySnapshot.docChanges());
          // console.log(result);
          result =  querySnapshot.docs.map((doc) => { return { id: doc.id, ...doc.data() }});
          res.render('index',{ title: 'get all the details ',data:result });
          console.log("------------------------------------------------");
      })
      .catch(error=>console.log(error)); 



 //gettining single document
 //----------------------------------------------------------------

   try {
        firestore.collection('users')
                 .doc('Ahamed')
                .get()
                .then((documentSnapshot) => {
                    // console.log( documentSnapshot.exists);
                    // console.log( documentSnapshot.id);
                    // console.log( documentSnapshot.ref);       
                    result = documentSnapshot.data();
                    res.render('index',{ title: 'get all the details ',data:result });
                })
                .catch(error=>console.log(error)); 
     } catch (error) {
            console.log("-------------------");
            console.error(error)
            console.log("-------------------");
    }

</pre>

# 10)  understanding QuerySnap shot
<pre>
        let query = firestore.collection('users').where('developer', '==', 'one');
        query.get().then(querySnapshot => {
            if (querySnapshot.empty) {              // 1. check for document existance 
                console.log(`No document found`);
            }else{
                let docs = querySnapshot.docs;       // 2. get the documents 
                for (let doc of docs) {
                  console.log(`Document found at path: ${doc.ref.path}`);  //3. print pat of the documents
                }
            }
        });

</pre>

# 11) Mockup data loading  adding mock data to the collection
  - generate mockup data
      https://www.mockaroo.com/
  - export as json file
  - import in the array
  - not converting in to string id

  https://www.mockaroo.com/help/formulas
<pre>
    const userData = require('./../users_data.json');
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

</pre>

#12) Updating document using document referance
<pre>
 var result =[];
    try {
        const UserdocumentReference = await firestore.doc('users/1'); //1) creating document referance
        let updateRes= await UserdocumentReference.update({first_name: "syed mustaq"}); // 5) updating document using referance
        await UserdocumentReference.get().then(function(doc) {        //2) getting document
            if (doc.exists) {                                   //3) check for document exista or not
                const result = doc.data()                         //4) fetch the data form the document
                console.log("-------- data ---------");
                console.log(result);
                console.log("-----------------------");
            }
            
        });
     
       const users = await  firestore.collection('users').get(); 
       if(!users.empty){ 
           result =  users.docs.map((doc) => { return { id: doc.id, ...doc.data() }});
           res.render('index', { title: 'working with firestore delet',data:result});
       }
     } catch (error) {
            console.log("-------------------");
            console.error(error)
            console.log("-------------------");
    }
</pre>

















# creating document
<pre></pre>



# creating document
<pre></pre>


# Data types

npm install firebase-functions -s














const document = firestore.doc('users/vpeluso');

console.log("-----------------");
console.log(document);
console.log("-----------------");












# Tofix
<pre>
var docData = {
          stringExample: "Hello world!",
          booleanExample: true,
          numberExample: 3.14159265,
          dateExample: fdate,
          arrayExample: [5, true, "hello"],
          nullExample: null,
          objectExample: {
              a: 5,
              b: {
                  nested: "foo"
              }
          }
  };

  (async function () {
      firestore.collection("data").doc("one").set(docData).then(() => {
          console.log("Document successfully written!");
      }).catch((error) => {
          console.error("Error writing document: ", error);
      });
  })();
</pre>


##########################################################
# changing read write rools
default rule
<pre>
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write;
    }
  }
}
</pre>
changing rule to read update and not to create new documents
<pre>
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, update;
    }
  }
}
</pre>








############################################################

1) DocumentReference
https://firebase.google.com/docs/reference/android/com/google/firebase/firestore/DocumentReference

2) CollectionReference
https://firebase.google.com/docs/reference/android/com/google/firebase/firestore/CollectionReference