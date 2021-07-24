deleteCollection(path) {
    // Get a new write batch
    var batch = firebase.firestore().batch()

    firebase.firestore().collection(path).listDocuments().then(val => {
        val.map((val) => {
            batch.delete(val)
        })

        batch.commit()
    })
}


--------------------------------------------Reading collection----------------------------------------------

             let query = await  firestore.collection('users').where('first_name', '==', 'Pernell'); 
            let user = await query.get(); //QuerySnapshot
            console.log("--------------ERROR-------------");
            user.docs.map(e=>console.log(e.id));
            user.docs.map(e=>console.log(e.data()));
            console.log("-------------------------------");

-----------------------------------------------------------------------------------------------------------




        const userCollectionRef = await  firestore.collection('users'); //CollectionReference
        const usersQuerySnapshot = await  firestore.collection('users').get(); 
         if(!usersQuerySnapshot.empty){ 
           result =  usersQuerySnapshot.docs.map((doc) => { return { id: doc.id, ...doc.data() }});
           res.render('index', { title: 'working with firestore delet',data:result});
       }


//--------------------------------------------------------------------------------------------------
// modularity

file: module file
module.exports = {
	"firebase_save_data" : firebase_save_data,
	"firebase_retrieve_data": firebase_retrieve_data,
	"firebase_delete_data": firebase_delete_data,
	"firebase_update_data": firebase_update_data
	}


// Route file
const firebase_functions = require("./firebase_CRUD_custom_code/firebase_functions.js")

// with in route 

firebase_functions.firebase_update_data(req.body["category"], res, req.body)

//--------------------------------------------------------------------------------------------------














// working with sub collections

         firestore.collection("users")
                    .doc("2")
                    .collection("parentDetils")
       
                    .add({
                        name:"Roshan Jameeer"
                    //your data
                }).then((data) => {
                  
                    console.log("--------------STATUS-------------");
                    console.log(data.id);
                    console.log("Document has added")
                    console.log("-------------------------------");

                }).catch((err) => {
                    console.log(err)
                })




    const db = firebase.firestore(); 
    let commentsQuery = db.collection('comments3')
                            .where('postType', '==', type)
                            .where('postId', '==', slug)
                            .where('parentId', '==', parentId || null)
                            .orderBy("createdAt");


  const firebase = require('firebase'); // eslint-disable-line global-require
  require('firebase/firestore'); // eslint-disable-line global-require
  const db = firebase.firestore();
  const snapshots = await db
   .collection('paintings')
   .orderBy('createdAt', 'desc')
   .startAfter(lastVisible)
   .limit(FETCH_LIMIT)
   .get(); 





db.firestore()
    .collection('comments')
    .where("postId",'==',idOfThePost)
    .orderBy('postId')
    .orderBy('date','asc').limit(10).get().then( snapshot => {
       .....
     })
