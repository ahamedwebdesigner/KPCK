# CRUD 

## Creating docuemnt 

db.collection.insertOne()
db.collection.insertMany()

db.collection.update() when used with the upsert: true option.
db.collection.updateOne() when used with the upsert: true option.
db.collection.updateMany() when used with the upsert: true option.
db.collection.findAndModify() when used with the upsert: true option.
db.collection.findOneAndUpdate() when used with the upsert: true option.
db.collection.findOneAndReplace() when used with the upsert: true option.
db.collection.save().
db.collection.bulkWrite()

## insertOne() : inserting single document 
<pre>
const insertResult = await db.collection("teacher").insertOne( { 
                _id: 7, 
                Name: "Natesha", 
                subject:['science','mathematics'],
                "interests": ["Running","Darts"],
                address : "2030 Martian Way", 
                zipCode: ['995588214']
            });

    // wath for values in insertResult
</pre>
Note: we can know the insertion statues by observing response object 

    "insertedCount": 1,   
    "insertedId": 7,
    "n": 1,

## inserting multiple documnets
<pre>
 const insertResult = await db.collection("teacher").insertMany( 
                [
                    { 
                        _id: 8, 
                        Name: "black", 
                        subject:['science','mathematics'],
                        "interests": ["Running","Darts"],
                        address : "2030 Martian Way", 
                        zipCode: ['995588214']
                    },
                    { 
                        _id: 9, 
                        Name: "john", 
                        subject:['science','mathematics'],
                        "interests": ["Running","Darts"],
                        address : "2030 Martian Way", 
                        zipCode: ['995588214']
                    }
                ]
            );
 </pre>
Note: 
"insertedCount": 2,
  "insertedIds": {
    "0": 8,
    "1": 9
  }

## delet single document
db.collection.deleteMany()
db.collection.deleteOne()

db.collection.findOneAndDelete().
findOneAndDelete() provides a sort option. The option allows for the deletion of the first document sorted by the specified order.

db.collection.findAndModify().
db.collection.findAndModify() provides a sort option. The option allows for the deletion of the first document sorted by the specified order.

db.collection.bulkWrite().


<pre>   
    const insertResult = await db.collection("teacher").deleteOne( {  _id: 8,   Name: black" } );
    "deletedCount": 1,
</pre>

## deleting multiple documents
 // const insertResult = await db.collection("teacher").deleteMany( <<Query>> );
<pre>
    const insertResult = await db.collection("teacher").deleteMany( {subject:['science','mathematics'] } );
    "deletedCount": 6,
    "n": 6, 
</pre>


# --------------------- Replacing Documents -----------------------------

## Replacing the single document
<pre>
    let mongoResults = await db.collection('teacher').replaceOne({_id: 1 }, {
                                                                            Name: "Chang", 
                                                                        },  { upsert: true });
</pre>

## Replacing the many documents
XXX





## find methods
db.collection.find()                    Performs a query on a collection or a view and returns a cursor object.
db.collection.findAndModify()           Atomically modifies and returns a single document.
db.collection.findOne()                 Performs a query and returns a single document.
db.collection.findOneAndDelete()        Finds a single document and deletes it.
db.collection.findOneAndReplace()       Finds a single document and replaces it.
db.collection.findOneAndUpdate()        Finds a single document and updates it.

## db.collection.find()      
Selects documents in a collection or view and returns a cursor to the selected documents.
syntax: db.collection.find(query, projection)
The find() and findAndModify() projection can accept aggregation expressions and syntax.




<pre> 
     const result = await db.collection("emp").find({}).toArray();  //find all
     const result = await db.collection("emp").find({employe: "Scott"}).toArray(); //find by field name

    //const result = await db.collection("emp").find({"_id" :{$in:[2,3]}}).toArray();      // id with 2 and 3

    //const result = await db.collection("emp").find({"employe" :{$in:['Scott','frank']}}).toArray();   
    // emplye scott and frank

    //db.sales.find({"price": {$gt: 100}})  {make: {$not: {$eq: "smith"}}}
    // const result = await db.collection("teacher").find({Name:'smith'}).toArray();
    //const result = await db.collection("teacher").find({Name:{$not: {$eq: "smith"}}}).toArray(); 
    // const result = await db.collection("teacher").find({Name:{$not: {$eq: "smith"}}}).toArray(); 
    const result = await db.collection("teacher").find({}).limit(10).skip(0) .sort({ Name: 1 }).toArray(); 
    //const result = await db.collection("teacher").find({Name:{$not: {$eq: "smith"}}}).limit(2).skip(1).toArray(); 

     // const result = await db.collection("teacher").find({  rank: {$eq:9,$eq:10}}).toArray(); 

     
</pre>





## findOne


## Find and modify using findAndModify()

By default, both operations modify a single document. However, the update() method with its multi option can modify more than one document.
If multiple documents match the update criteria, for db.collection.findAndModify(), you can specify a sort to provide some measure of control on which document to update.
By default, db.collection.findAndModify() returns the pre-modified version of the document. To obtain the updated document, use the new option.

The update() method returns a WriteResult() object that contains the status of the operation. To return the updated document, use the find() method. 

<pre>
    // increment remove field
    let mongoResults=[];
        mongoResults = await db.collection('teacher').findAndModify(
        {Name:"smith"},                   //query
        [],                               // sorting order   [["_id", "asc"]], // sort array
        {$set: {zipCode: '9999999999'}},  // update
        {},                               // options
        function(err, object) {           // function
            if (err){
                console.warn(err.message);  // returns error if no matching object found
            }else{
                console.dir(object);
            }}
        );
</pre>

Another Example

<pre>
mongoResults = await db.collection('teacher').findAndModify(
                {Name:"smith"},                   //query
                [],                              // sorting order
                {
                    $set: {zipCode: '8888888888'},
                    $inc: { rank: 1 }}, // update
                {},                              // options
                function(err, object) {          // function
                    if (err){
                        console.warn(err.message);  // returns error if no matching object found
                    }else{
                        console.dir(object);
                    }}
                );
</pre>

Becarful while upsert and new opetions are used
<pre>
mongoResults = await db.collection('teacher').findAndModify(
    {Name:"Arnold"},                   //query
    [],                              // sorting order
    {
        $set: {zipCode: '1111111111111'},
        $inc: { rank: 1 }}, // update
        { upsert: true, new: true,returnOriginal: false},                              // options
    function(err, object) {          // function
        if (err){
            console.warn(err.message);  // returns error if no matching object found
        }else{
            console.dir(object);
        }}
    );
</pre>

# findOneAndReplace(): 
- replaces whole document

<pre>
  mongoResults = await db.collection('teacher').findOneAndReplace(
               {Name:"allen"},                   //query
                //{zipCode: '1111111111111'}, // update
                //{ $set: { zipCode: "9999999999999", author: req.body.authorName } },
                function(err, object) {          // function
                    if (err){
                        console.warn(err.message);  // returns error if no matching object found
                    }else{
                        console.dir(object);
                    }}
               );

</pre>








# ------------------- Quering the document ------------
## Get the Count of the collection

<pre>
    //const insertResult = await db.collection("teacher").estimatedDocumentCount();
    // const insertResult = await db.collection("teacher").countDocuments({ subject:['english','telugu']});
</pre>

## Get Distinct values 


<pre>
    //  const insertResult = await db.collection("teacher").distinct("Name",{ subject:['english','telugu']});
    // get all the distinct subjects
    //  const insertResult = await db.collection("teacher").distinct("subject",{});  

</pre>


## query Opertors

| Name                                                                                          | Description                                                         |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| [`$eq`](https://docs.mongodb.com/manual/reference/operator/query/eq/#mongodb-query-op.-eq)    | Matches values that are equal to a specified value.                 |
| [`$gt`](https://docs.mongodb.com/manual/reference/operator/query/gt/#mongodb-query-op.-gt)    | Matches values that are greater than a specified value.             |
| [`$gte`](https://docs.mongodb.com/manual/reference/operator/query/gte/#mongodb-query-op.-gte) | Matches values that are greater than or equal to a specified value. |
| [`$in`](https://docs.mongodb.com/manual/reference/operator/query/in/#mongodb-query-op.-in)    | Matches any of the values specified in an array.                    |
| [`$lt`](https://docs.mongodb.com/manual/reference/operator/query/lt/#mongodb-query-op.-lt)    | Matches values that are less than a specified value.                |
| [`$lte`](https://docs.mongodb.com/manual/reference/operator/query/lte/#mongodb-query-op.-lte) | Matches values that are less than or equal to a specified value.    |
| [`$ne`](https://docs.mongodb.com/manual/reference/operator/query/ne/#mongodb-query-op.-ne)    | Matches all values that are not equal to a specified value.         |
| [`$nin`](https://docs.mongodb.com/manual/reference/operator/query/nin/#mongodb-query-op.-nin) | Matches none of the values specified in an array.                   |


## Equals operator 
SYNTAX: { <field>: { $eq: <value> } }










## find wiht in array
























# ------------------   updating document

# Change a Document
Update operations mutate specified fields in one or more documents and leave other fields and values unchanged.
Replace operations remove all existing fields in one or more documents and substitute them with specified fields and values.

The top level of an update document contains one or more of the following update operators:

- $set - replaces the value of a field with a specified one
- $inc - increments or decrements field values
- $rename - renames fields
- $unset - removes fields
- $mul - multiplies a field value by a specified number


<pre>
                // modifying existing field data
                // let mongoResults = await db.collection('teacher').updateMany({Name:'smith'}, {$set: { address: "New Address"}} );
                // if filed is not added it will be created 
                // let mongoResults = await db.collection('teacher').updateMany({Name:'smith'}, {$set: { address2: "New Address two"}} );
                // unset remove field
                // let mongoResults = await db.collection('teacher').updateMany({Name:'smith'}, {$unset: { address2: ""}} );

                // increment remve field
                // let mongoResults = await db.collection('teacher').updateMany({Name:'smith'}, {$inc: { rank: 1}} );
         
                // renaming the field
                // let mongoResults = await db.collection('teacher').updateMany({}, {$rename: { rank:"MainRank"}} );

                // increment remove field
                // let mongoResults = await db.collection('teacher').updateMany({Name:'smith'}, {$mul: { MainRank: 10}} );
 </pre>
























### $currentDate
used to set temporal data


<pre>
    let mongoResults = await db.collection('teacher').updateMany({_id: 1 },  {
    $currentDate: {
        lastModified: true, //date
        "cancellationDate": { $type: "timestamp" },
        "cancellationDateTwo": { $type: "date" },
            "cancellation.date": { $type: "timestamp" }
    }
    });
</pre>

### example using $set along with currentDate date

<pre>
let mongoResults = await db.collection('teacher').updateMany({_id: 1 },  {
    $currentDate: {
        lastModified: true,
        "cancellation.date": { $type: "timestamp" }
    },
    $set: {
        "cancellation.reason": "user request",
        status: "D"
    }
    } );
</pre>

<pre>
let mongoResults = await db.collection('teacher').updateMany({_id: 1 },  {
        $set:  {lastModified:new Date(2009,12,28,1,1,1).toISOString()} 
    });

</pre>

<pre>
let mongoResults = await db.collection('teacher').updateMany({_id: 1 },  {
$currentDate: {
    lastModified: true,
    "cancellation.date": { $type: "timestamp" }
},
$set: {
    "cancellation.reason": "user request",
    status: "D"
}
});
</pre>
