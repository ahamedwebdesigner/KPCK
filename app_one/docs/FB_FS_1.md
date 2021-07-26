//-------------------------------------------------------------------------------------------
Firestore: resoueses
  https://firebase.google.com/docs/reference/node/firebase.firestore.DocumentReference
  https://firebase.google.com/docs/reference/node/firebase.firestore.DocumentReference
  https://www.mockaroo.com/
https://github.com/firebase/quickstart-js/tree/master/firestore/scripts


//-------------------------------------------------------------------------------------------


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

# 4b) adding document to the collection

<pre>
    let userCollectionReference  = await  firestore.collection("users"); //CollectionReference
        let userDocumentReference = await userCollectionReference.add({foo: 'bar'});
        let DocumentSnapshot = await userDocumentReference.get()
        let data = DocumentSnapshot.data();
        // let result =  userQuerySnapshot.docs.map((doc) => { return { id: doc.id, ...doc.data() }});
        userCollectionReference.add({foo: 'bar'}).then(documentReference => {
            console.log("--------------STATUS-------------");
            console.log(data);
            console.log("-------------------------------");
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
              const usersDb = firestore.collection('users');  
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



# limit in query
- The query on which you called get() or onSnapshot() in order to get this QuerySnapshot.

<pre>
       const usersQuery= await  firestore.collection('users').limit(10); 
         let usersQuerySnapshot = await usersQuery.limit(10).get(); //Query

         const user2Query = usersQuerySnapshot.query
         let usersQuery2Snapshot = await user2Query.limit(10).get();

         console.log("--------Query-----------");
         console.error(usersQuerySnapshot.size)
         console.error(usersQuery2Snapshot.size)
         console.log("------------------------");

         result1 =  usersQuerySnapshot.docs.map((doc) => { return { id: doc.id, ...doc.data() }});
         result2 =  usersQuery2Snapshot.docs.map((doc) => { return { id: doc.id, ...doc.data() }});
         res.render('index', { title: 'working with firestore delet',data:{q1:result1,q2:result2}});
</pre>




# 12) Updating document using document referance
## changind data 
const UserdocumentReference = await firestore.doc('users/1');
const user1DocumentReference = await  firestore.collection('users').doc('2');

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

# Method 2: updating document using document referance 

   const user1DocumentReference = await  firestore.collection('users').doc('2'); //DocumentReference
   let updateRes = await user1DocumentReference.update({updatevalu: "new value for update"});


</pre>


## 13) increment field
- incrementing and decrementing int values

<pre>
        const increment = firebase.firestore.FieldValue.increment(1); //1) increment one
        const decrement = firebase.firestore.FieldValue.increment(-1); //2) decrements one
        const increaseBy = firebase.firestore.FieldValue.increment(23.99); //3) increment by certin value
        const UserdocumentReference = await firestore.doc('users/1'); 
        UserdocumentReference.update({ experience: increaseBy });
        
       // let updateRes= await UserdocumentReference.update({first_name: "syed mustaq"}); // 5) updating document using referance
        await UserdocumentReference.get().then(function(doc) {        //2) getting document
            if (doc.exists) {                                   //3) check for document exista or not
                const result = doc.data()                         //4) fetch the data form the document
                console.log("-------- data ---------");
                console.log(result);
                console.log("-----------------------");
            }
            
        });
     
</pre>



## 14) storing collection meta 
- create static document 
- update any changes and keep record about collection 
    - like newly created one 

<pre>
        const increment = firebase.firestore.FieldValue.increment(1); //1) increment one
        

        const statsRef = firestore.collection('users').doc('--stats--');
        const UserdocumentReference = await firestore.doc('users/1'); 

        const batch = firestore.batch();
        batch.update(UserdocumentReference, { title: 'New Story!' } );
        batch.set(statsRef, { storyCount: increment }, { merge: true });
        batch.commit();
</pre>




# 13 deleting docuement
<pre>
  const user1DocumentReference = await  firestore.collection('users').doc('1'); //DocumentReference
         user1DocumentReference.delete();
</pre>
compleate code
<pre>
  /* GET home page. */
router.get('/',async function(req, res, next) {
    var result =[];
    try {
        const userCollectionRef = await  firestore.collection('users'); //CollectionReference
        const usersQuerySnapshot = await  firestore.collection('users').get(); //QuerySnapshot
        const user1DocumentReference = await  firestore.collection('users').doc('1'); //DocumentReference
         user1DocumentReference.delete();
       


         //res.render('index', { title: 'working with firestore delet',data:{}}); if(!usersQuerySnapshot.empty){ 
           result =  usersQuerySnapshot.docs.map((doc) => { return { id: doc.id, ...doc.data() }});
           res.render('index', { title: 'working with firestore delet',data:result});
    
     } catch (error) {
            console.log("--------------ERROR-------------");
            console.error(error)
            console.log("-------------------------------");
    }
});
<pre>


# deleting docuement in batch

<pre>


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



example2:
//---------------------------------------------------------
// Delete documents in a batch
  const batch = db.batch();
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch.commit();
</pre>


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






let userCollectionReference  = await  firestore.collection("users"); //CollectionReference
let userDocumentReference = await userCollectionReference.add({foo: 'bar'});
let DocumentSnapshot = await userDocumentReference.get()
let data = DocumentSnapshot.data();
// let result =  userQuerySnapshot.docs.map((doc) => { return { id: doc.id, ...doc.data() }});
userCollectionReference.add({foo: 'bar'}).then(documentReference => {
    console.log("--------------STATUS-------------");
    console.log(data);
    console.log("-------------------------------");
});

############################################################

      
# 1) add(data) → {Promise.<DocumentReference>} - Add docuemnt to collection
Add a new document to this collection with the specified data, assigning it a document ID automatically.

<pre>
    let collectionRef = firestore.collection('temp');
    collectionRef.add({foo: 'bar'}).then(documentReference => {
      console.log(`Added document with name: ${documentReference.id}`);
    });
</pre>

# 2) doc(documentPathopt) → {DocumentReference} -  Getting document referance
Gets a DocumentReference instance that refers to the document at the specified path. 
<pre> 
    let collectionRef = firestore.collection('col');
    let documentRefWithName = collectionRef.doc('doc');
    let documentRefWithAutoId = collectionRef.doc();
    console.log(`Reference with name: ${documentRefWithName.path}`);
    console.log(`Reference with auto-id: ${documentRefWithAutoId.path}`);
</pre>

# 2  endAt(…fieldValuesOrDocumentSnapshot) → {Query} -
Creates and returns a new Query that ends at the provided set 
of field values relative to the order of the query.

<pre> 
    let query = await firestore.collection('users');
    let qsnopshot = await query.orderBy('experience ').endAt(5).get();
    console.log(qsnopshot);
    qsnopshot.forEach(documentSnapshot => {
          console.log(`Found document at ${documentSnapshot.ref.path}`)
    });
</pre>

# 3 endBefore(…fieldValuesOrDocumentSnapshot) → {Query}
Creates and returns a new Query that ends before the set 
of field values relative to the order of the query. 
The order of the provided values must match the order of the order by clauses of the query.

<pre>
    let query = await firestore.collection('users');
    let qsnopshot = await query.orderBy('experience ').endBefore(5).get();
    console.log(qsnopshot);
    qsnopshot.forEach(documentSnapshot => {
          console.log(`Found document at ${documentSnapshot.ref.path}`)
    });
</pre>

# 4 get() → {Promise.<QuerySnapshot>}

<pre>
        let query = await firestore.collection('users');
        let qsnopshot = await query.get();
        console.log(qsnopshot);
        qsnopshot.forEach(documentSnapshot => {
              console.log(`Found document at ${documentSnapshot.ref.path}`)
        });
</pre>

# 5 isEqual(other) → {boolean}

# 6 limit(limit) → {Query}
Creates and returns a new Query that only returns the first matching documents

<pre>
        let query = await firestore.collection('users').where('experience ', '>', 5);
        let qsnopshot = await query.limit(1).get();
       // console.log(qsnopshot);
        qsnopshot.forEach(documentSnapshot => {
            console.log("--------------------------------------------------");
            console.log(`Found document at ${documentSnapshot.ref.path}`)
            console.log("--------------------------------------------------");
        });

</pre>


# limitToLast(limit)
Creates and returns a new Query that only returns the last matching documents.

You must specify at least one orderBy clause for limitToLast queries, otherwise an exception will be thrown during execution.

<pre>
        
        let query = await firestore.collection('users').where('experience ', '==', 5).orderBy('gender');
        let qsnopshot = await query.limitToLast(1).get();
       // console.log(qsnopshot);
        qsnopshot.forEach(documentSnapshot => {
            console.log("--------------------------------------------------");
            console.log(`Found document at ${documentSnapshot.ref.path}`)
            console.log("--------------------------------------------------");
        });

</pre>



# quering and filteraing data
The where() method takes three parameters: a field to filter on, a comparison operator, and a value. Firestore supports the following comparison operators:

< less than
<= less than or equal to
== equal to
> greater than
>= greater than or equal to
!= not equal to
array-contains      - citiesRef.where('regions', 'array-contains', 'west_coast').get();
array-contains-any  - citiesRef.where('regions', 'array-contains-any',['west_coast', 'east_coast']);
in            -       citiesRef.where('country', 'in', ['USA', 'Japan']).get()
not-in        -       await citiesRef.where('country', 'not-in', ['USA', 'Japan']).get();


Use the in operator to combine up to 10 equality (==) clauses on the same field with a logical OR. An in query returns documents where the given field matches any of the comparison values. For example:

Use the not-in operator to combine up to 10 not equal (!=) clauses on the same field with a logical AND. A not-in query returns documents where the given field exists, is not null, and does not match any of the comparison values.

Use the array-contains-any operator to combine up to 10 array-contains clauses on the same field with a logical OR. An array-contains-any 
<pre>
// example 1:
//-----------------------------------------------------------------------------------------------------
      const usersRef = firestore.collection('users');
      const qshot = await usersRef.where('last_name', '==', 'Brinson').get();
      console.log("================");
      shot.forEach(documentSnapshot => console.log(`Found document at ${documentSnapshot.ref.path}`));
      console.log("================");

// example 2:
//-----------------------------------------------------------------------------------------------------

      const usersRef = firestore.collection('users');
      const qshot = await usersRef.where('last_name', '==', 'Brinson').get();
      console.log("================");
      shot.forEach(documentSnapshot => console.log(`Found document at ${documentSnapshot.ref.path}`));
      console.log("================");

//Example 3:
//------------------------------------------------------------------------------------------------------

        const usersRef = firestore.collection('users');
        const qshot = await usersRef.where('experience ', '==', 2)
                                    .where("mobile_number", "==", '207 267 1689')
                                    .get();

        if (qshot.empty) {
            console.log('No matching documents.');
           // return;
          }  
         
          
        console.log("================");
        qshot.forEach(documentSnapshot => console.log(`Found document at ${documentSnapshot.ref.path}`));
        console.log("================");
//----------------------------------------------------------------------------------------------------------

const exactlyOneCoast = await citiesRef.where('region', 'in', [['west_coast', 'east_coast']]).get();

This query returns every city document where the region field is an array that contains exactly one element of either west_coast or east_coast. From the example data, only the DC document qualifies with its region field of ["east_coast"]. 


</pre>

# working with where 

<pre>

        // const snapshot = await  firestore.collection('cities').where('capital', '==', true).get();
        // const snapshot = await  firestore.collection('cities').where('state', '>=', 'CA').where('state', '<=', 'IN').get();
        // NOTE: below query requre composit index on state and population
        // const snapshot = await  firestore.collection('cities').where('state', '==', 'CA').where('population', '>', 1000000).get();
      
        // if (snapshot.empty) { console.log('No matching documents.'); return; }  
        // snapshot.forEach(doc => {console.log(doc.id, '=>', doc.data()); });
</pre>


## limit and limitToLast
Creates and returns a new Query that only returns the last matching documents.
You must specify at least one orderBy clause for limitToLast queries, otherwise an exception will be thrown during execution.

<pre>
        let query = firestore.collection('users').where('gender', '==', 'Male');

            query.orderBy('first_name').limit(1).get().then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    console.log(`Last matching document is ${documentSnapshot.ref.path}`);
                });
            });

               let query = firestore.collection('users').where('gender', '==', 'Male');

        query.orderBy('first_name').get().then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
                console.log(`Last matching document is ${documentSnapshot.ref.path}`);
            });
        });

            query.orderBy('first_name').limitToLast(1).get().then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    console.log(`Last matching document is ${documentSnapshot.ref.path}`);
                });
            });

</pre>


# listDocuments -Retrieves the list of documents in this collecti
ToKnow


# pagination endAt() startAt()
<pre>
        const querySnapshot = await firestore.collection('users')
                                            .orderBy('first_name')
                                            .startAt(1)
                                            .get();
          querySnapshot.forEach(documentSnapshot => {
            console.log("--------------startAtRes-------------");
            console.log(`Last matching document is ${documentSnapshot.ref.path}`);
            console.log("-------------------------------");
        });

                
        const querySnapshot = await firestore.collection('cities')
                                            .orderBy('population')
                                            .endAt(1000000)
                                            .get();
          querySnapshot.forEach(documentSnapshot => {
            console.log("--------------startAtRes-------------");
            console.log(`Last matching document is ${documentSnapshot.ref.path}`);
            console.log("-------------------------------");
        });

 

</pre>

# order by desending
<pre>
        const querySnapshot = await firestore.collection('cities')
                                            .orderBy('population', 'desc')
                                            .endAt(1000000)
                                            .get();
          querySnapshot.forEach(documentSnapshot => {
            console.log("--------------startAtRes-------------");
            console.log(`Last matching document is ${documentSnapshot.ref.path}`);
            console.log("-------------------------------");
        });

</pre>

# lemet
<pre>
     query.limit(3).get().then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    console.log("--------------startAtRes-------------");
                    console.log(`Last matching document is ${documentSnapshot.ref.path}`);
                    console.log("-------------------------------------");
                });
            });

</pre>
## working i timestamp
      console.log( firebase.firestore.Timestamp.now());