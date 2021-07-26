# working with child documnets

<pre>

     var studentsRef = await firestore.collection("students");
        studentsRef.doc("001").set({
                stidemtID: 001,
                stopts:['cricket','baseball']
            });


       // create document
       
        let documentRef = firestore.doc('students/001'); 
        documentRef.update(
            'stopts', firebase.firestore.FieldValue.arrayUnion("two")
          ).then(() => {
            return documentRef.get();
          }).then(doc => {
                console.log("--------------working-------------");
                console.error(doc.data())
                console.log("-------------------------------");
          });
</pre>



# collectionGroup

        
       /* Quering collection group query */

        // const querySnapshot = await firestore.collectionGroup('landmarks').where('type', '==', 'museum').get();
        // querySnapshot.forEach((doc) => {
        // console.log(doc.id, ' => ', doc.data());
        // });


