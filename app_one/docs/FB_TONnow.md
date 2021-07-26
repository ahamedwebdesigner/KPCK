# firestore client functionality

firebase.firestore().disableNetwork()
    .then(() => {
        // Do offline actions
        // ...
    });

firebase.firestore().enableNetwork()
    .then(() => {
        // Do online actions
        // ...
    });


//---------------

BulkWriter
close
create
delete
flush
onWriteError
onWriteResult
set
update
//----------------

firebase-admin

