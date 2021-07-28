# working with child documnets


## ArrayRemove(params object[] elements)	

Returns a special value that can be used with SetAsync() or UpdateAsync() that tells the server to remove the given elements from any array value that already exists on the server.

## arrayUnion(params object[] elements)	

Returns a special value that can be used with SetAsync() or UpdateAsync() that tells the server to union the given elements with any array value that already exists on the server.

## Increment(long value)	

Returns a special value that can be used with SetAsync() or UpdateAsync() that tells the server to increment the field's current value by the given value.

## Increment(double value)	

Returns a special value that can be used with SetAsync() or UpdateAsync() that tells the server to increment the field's current value by the given value.

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


