# working with mangodb pacage


- requre mungodb npm pacage 
- get mongoClient form mongodb pacagea and using connect() method make a connection to the MDB
- the call back function of mungoclient provied by two objects 1) error obj and 2) DB connection object
- if error occur while connection error object gives information about error occured
- on successeful connection to MDB DBobject is avalable for database operations

> ## how to connect 
  - mongo clietn is main connection object 
  - the main important methods of mongoclient are

    ```
        MongoClient = function(server, options);

        MongoClient.open()

        MongoClient.close()

        MongoClient.db()

        MongoClient.connect()

    ```
> ### 1) connection using Db

  - Notice that you configure the MongoClient just as you would have done the Db object. 
  - The main difference is that you access the db instances using the db method on the MongoClient object instead of   
       using the Db instance directly as you would previous methods.
  - MongoClient supports the same options as the previous Db instance you would have created.

```
    var MongoClient = require('mongodb').MongoClient
    , Server = require('mongodb').Server;

    var mongoClient = new MongoClient(new Server('localhost', 27017));

    mongoClient.open(function(err, mongoClient) {
      var db1 = mongoClient.db("mydb");

    mongoClient.close();
    });
```

## 2) The URL connection format
using mongodb url

```
    mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]
```

1. mongodb:// is a required prefix to identify that this is a string in the standard connection format.
1. username:password@:  is optional. If given, the driver will attempt to login to a database after connecting to a database server.
1. host1:  is the only required part of the URI. It identifies either a hostname, IP address, or unix domain socket
1. :portX: is optional and defaults to :27017 if not provided.
1. /database : is the name of the database to login to and thus is only relevant if the username:password@ syntax is used.
    If not specified the “admin” database will be used by default.
1. ?options: are connection options. Note that if database is absent there is still a / required between the last host and the ? introducing the options. Options are name=value pairs and the pairs are separated by “&”. For any unrecognized or unsupported option, a driver should log a warning and continue processing. A driver should not support any options that are not explicitly defined in this specification. This is in order to reduce the likelihood that different drivers will support overlapping  that differ in small but incompatible ways (like different name, different values, or different default value).
const ObjectID = require('mongodb').ObjectID;

- connection mongo connection url



```
    let MongoClient = require('mongodb').MongoClient;
    MongoClient.connect(<<mungourl>>, function(err, dbo) {
    if (err) throw err;
    // DatabaseName: products & CollectionName: items
    var dbo = dbo.db("products");
    dbo.collection("items").insertOne({ name:"facewash",price: 30},(err, result)=>{
        if (err) throw err;
            res.json(result);
            db.close();
        });
    });
```
Refer the link for [Mongo Db connection options](https://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html?highlight=mongoclient "options for connection mongodb using mungo cliet")

# mongodb CRUD


>## create new recard  (insertOne())

```
  let mungourl = 'mongodb+srv://kdpvk_db_user:mOtWSRqQsrsc3dLI@kpvk.npdza.mongodb.net/KDPVK?retryWrites=true&w=majority';
  
    try {
        MongoClient.connect(mungourl,{useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
            if (err) throw err;
            var dbo = db.db("KPVK"); // database name
            dbo.collection("inventory").insertOne(
                { item: "calender", qty: 25, tags: ["blue", "red"], dim_cm: [ 14, 21 ] },
                (err, result)=>{ // table name 
                if (err) throw err;
                    response.json(result);
                    db.close();
            });
          });//#MongoClient
    } catch (error) {
      response.status(500).send("error");
    }
```





>## inserting multiple  elements  (insertMany())


```
    let mungourl = 'mongodb+srv://kdpvk_db_user:mOtWSRqQsrsc3dLI@kpvk.npdza.mongodb.net/KDPVK?retryWrites=true&w=majority';
  
    try {
        MongoClient.connect(mungourl,{useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
            if (err) throw err;
            var dbo = db.db("KPVK"); // database name
            //    dbo.collection("items")
            //    dbo.insertMany

            dbo.collection('inventory').insertMany( [
                { item: "journal", qty: 25, tags: ["blank", "red"], dim_cm: [ 14, 21 ] },
                { item: "notebook", qty: 50, tags: ["red", "blank"], dim_cm: [ 14, 21 ] },
                { item: "paper", qty: 100, tags: ["red", "blank", "plain"], dim_cm: [ 14, 21 ] },
                { item: "planner", qty: 75, tags: ["blank", "red"], dim_cm: [ 22.85, 30 ] },
                { item: "postcard", qty: 45, tags: ["blue"], dim_cm: [ 10, 15.25 ] }
             ] , function(error, doc) {
                  if(error) {
                     console.log(error);
                  } else {
                     console.log('success');
                  }
               
              }); 

        
          });

          
      response.send("foods");
    } catch (error) {
      response.status(500).send("error");
    }
```

>### example two
```

    let mungourl = 'mongodb+srv://kdpvk_db_user:mOtWSRqQsrsc3dLI@kpvk.npdza.mongodb.net/KDPVK?retryWrites=true&w=majority';
      try {
        MongoClient.connect(mungourl,{useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
            if (err) throw err;
            var dbo = db.db("KPVK"); // database name
            //    dbo.collection("items")
            //    dbo.insertMany

            dbo.collection('itemStock').insertMany( [
                { item: "journal", instock: [ { warehouse: "A", qty: 5 }, { warehouse: "C", qty: 15 } ] ,tags: ["blank", "red"], dim_cm: [ 14, 21 ] },
                { item: "notebook", instock: [ { warehouse: "C", qty: 5 } ],tags: ["red", "blank"], dim_cm: [ 14, 21 ] },
                { item: "paper", instock: [ { warehouse: "A", qty: 60 }, { warehouse: "B", qty: 15 } ],tags: ["red", "blank", "plain"], dim_cm: [ 14, 21 ] ````` },
                { item: "planner", instock: [ { warehouse: "A", qty: 40 }, { warehouse: "B", qty: 5 } ],tags: ["blank", "red"], dim_cm: [ 22.85, 30 ] }},
                { item: "postcard", instock: [ { warehouse: "B", qty: 15 }, { warehouse: "C", qty: 35 } ],tags: ["blue"], dim_cm: [ 10, 15.25 ] }
             ] , function(error, doc) {
                  if(error) {
                     console.log(error);
                  } else {
                     console.log('success');
                  }
               
              }); 

        
          });
         
      response.send("foods");
    } catch (error) {
      response.status(500).send("error");
    }

```

 
> ## Updating existing elements

- we can update any elements singl documnet or many docutments values using updateOne() and updateMany()
- **syntax :    db.collection.updateMany(filter, update, options)**
      - filter  -> The selection criteria for the update. The same query selectors as in the find() method are available.
      - update  -> document or pipeline The modifications to apply 
      - options -> 


    
```
    let mungourl = 'mongodb+srv://kdpvk_db_user:mOtWSRqQsrsc3dLI@kpvk.npdza.mongodb.net/KDPVK?retryWrites=true&w=majority';
    try {
        MongoClient.connect(mungourl,{useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
            if (err) throw err;
            var dbo = db.db("KPVK"); // database name
            //    dbo.collection("items")
            //    dbo.insertMany
            dbo.collection('itemStock').updateOne({ item:"notebook"}, { $set: {  item:"New notebook" } }, function(err, result) {
                  response.send(result);
              });

        });
    } catch (error) {
      response.status(500).send("error");
    }
    
  });//#end get

```


>>## Remove element


collection.deleteOne({ a: 3 }, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log('Removed the document with the field a equal to 3');
    callback(result);
  });


# Quering Mongodb

> ## querying element using find filter


  let mungourl = 'mongodb+srv://kdpvk_db_user:mOtWSRqQsrsc3dLI@kpvk.npdza.mongodb.net/KDPVK?retryWrites=true&w=majority';
  
    (async ()=>{
        try {
            await  MongoClient.connect(mungourl,{useNewUrlParser: true, useUnifiedTopology: true}, async function(err, db) {
                if (err) throw err;
                var dbo = db.db("KPVK"); // database name
                 const result =  await  dbo.collection('itemStock')
                 //    .find( { } )                                   //finding all the elements
                  .find( { "instock": { warehouse: "A", qty: 5 } } ) ;  // finding using query parameters
    
                  
                  while (await result.hasNext()) {
                    const doc = await result.next();
                    console.log(doc);
                  };
    
    
                  console.log(result)
         
             });
         } catch (error) {
            res.status(500).send("error");
        }
    })();
    
```
    let mungourl = 'mongodb+srv://kdpvk_db_user:mOtWSRqQsrsc3dLI@kpvk.npdza.mongodb.net/KDPVK?retryWrites=true&w=majority';
  
    try {
        MongoClient.connect(mungourl,{useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
            if (err) throw err;
            var dbo = db.db("KPVK"); // database name
                dbo.collection('itemStock')
             //    .find( { } )                                   //finding all the elements
              .find( { "instock": { warehouse: "A", qty: 5 } } )   // finding using query parameters
               .toArray(function(err, docs) {
                         console.log(docs);
                         response.send(docs);

          });
         });
     } catch (error) {
      response.status(500).send("error");
    }
```    

>## using async/await

      ```   
          router.get("/", async (req, res) => {
              let mungourl = 'mongodb+srv://kdpvk_db_user:mOtWSRqQsrsc3dLI@kpvk.npdza.mongodb.net/KDPVK?retryWrites=true&w=majority';
              //let mungourl = 'Qsrsc3dLI@kpvk.npdza.mongodb.net/KDPVK?retryWrites=true&w=majority';

              try {
                  const Mongoclt = await MongoClient.connect(mungourl,{ useUnifiedTopology: true });
                  const db = Mongoclt.db("KPVK");
                  const result = await db.collection("inventory").find({});

                  while (await result.hasNext()) {
                      const doc = await result.next();
                      console.log(doc);
                    };
                    res.send("all is well");

                  //const result = await db.collection("inventory").find({}).toArray();
                  //res.json(result)
              }  catch (error) {
                  res.status(500).send(error);

              }
      ```   


> ## querying All  element using find filter


```   
    dbo.collection('itemStock')
    // .find( { "instock": { warehouse: "A", qty: 5 } } )
    //Equality matches on the whole embedded/nested document require an exact match of the specified document, including the field order. For example, the following query does not match any documents in the inventory collection:
    // .find( { "instock": { qty: 5, warehouse: "A" } } )
    //.find( { 'instock.qty': { $lte: 20 } } ) // field qty whose value is less than or equal to 20
    //.find( { 'instock.0.qty': { $lte: 20 } } ) //instock array has as its first element a document that contains the field qty whose value is less than or equal to 20

    //Use $elemMatch operator to specify multiple criteria on an array of embedded documents such that at least one embedded document satisfies all the specified criteria.
    //.find( { "instock": { $elemMatch: { qty: 5, warehouse: "A" } } } ) //instock array has at least one embedded document that contains both the field qty equal to 5 and the field warehouse equal to A
    // .find( { "instock": { $elemMatch: { qty: { $gt: 10, $lte: 20 } } } } )  // qty that is greater than 10 and less than or equal to 20:
    //  .find( { "instock.qty": { $gt: 10,  $lte: 20 } } ) // document nested in the instock array has the qty field greater than 10 and any document (but not necessarily the same embedded document) in the array has the qty field less than or equal to 20:
    // .find( { "instock.qty": 5, "instock.warehouse": "A" } ) // instock array has at least one embedded document that contains the field qty equal to 5 and at least one embedded document (but not necessarily the same embedded document) that contains the field warehouse equal to A:
    .toArray(function(err, docs) { 
                console.log(docs);
                response.send(docs);

});
```   















>>## Index a Collection

1. db.collection.createIndex( { name: -1 } ) //single key descending index on the name field
1. MongoDB indexes use a B-tree data structure.
1. For example, an index created on { item : 1, quantity: -1 } has the index name item_1_quantity_-1.
1. db.collection.getIndexes() get all the indexes
1. db.members.createIndex( { "user_id": 1 }, { unique: true } )  - creating unique indes 
1. db.members.createIndex( { groupNumber: 1, lastname: 1, firstname: 1 }, { unique: true } ) - unique compuind index
1. example, consider a collection with structure { _id: 1, a: [ { loc: "A", qty: 5 }, { qty: 10 } ] }
    db.collection.createIndex( { "a.loc": 1, "a.qty": 1 }, { unique: true } ) - Create a unique compound multikey index on a.loc and a.qty:



creating index with name
```  
db.products.createIndex(
  { item: 1, quantity: -1 } ,
  { name: "query for inventory" }
)
```  

Indexes can improve your application's performance. The following function creates an index on the a field in the documents collection.
```   
const indexCollection = function(db, callback) {
  db.collection('documents').createIndex({ a: 1 }, null, function(err, results) {
    console.log(results);
    callback();
  });
};
```   



>> ## Index Types
1. Single Field
2. Compound Index
3. Multikey Index   - MongoDB uses multikey indexes to index the content stored in arrays.
4. Geospatial Index - To support efficient queries of geospatial coordinate data, MongoDB provides two special indexes: 2d indexes that uses planar geometry 
5. Text Indexes - MongoDB provides a text index type that supports searching for string content in a collection. 
   These text indexes do not store language-specific stop words (e.g. "the", "a", "or") and stem the words in a collection to only store root words.
6. Hashed Indexes - To support hash based sharding, MongoDB provides a hashed index type, which indexes the hash of the value of a field.
    These indexes have a more random distribution of values along their range, but only support equality matches and cannot support range-based queries


Refer the link for [Mongo indexing](https://docs.mongodb.com/manual/core/index-unique/ "creating indexe on fields")











# Mangoose










>## working with deprecated warnings

1. mongoose.set('useNewUrlParser', true);
1. mongoose.set('useFindAndModify', false);
1. mongoose.set('useCreateIndex', true);
1. mongoose.set('useUnifiedTopology', true);
1. Replace update() with updateOne(), updateMany(), or replaceOne()
1. Replace remove() with deleteOne() or deleteMany().
1. Replace count() with countDocuments(), unless you want to count how many documents are in the whole collection (no filter). In the latter case,
1. use estimatedDocumentCount().