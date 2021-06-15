# working with MongoDB
 1. mongodb adapter
 2. mangoos  


 > ## 1) using mongodb adapter

- requre mungodb npm pacage 
- get mongoClient form mongodb pacagea and using connect() method to make a connection to the MDB
- the call back function of mungoclient provied by two objects 1) error obj and 2) DB connection object
- if error occur while connection error object gives information about error occured
- on successeful connection to MDB DBobject is avalable for database operations

> ### how to connect 
  - mongo clietn is main connection object 
  - the main important methods of mongoclient are

> ###### IQ:1 what are main functions of mungoclient 

```
MongoClient = function(server, options);                // TO get mungo client
MongoClient.open()                                      // is used to connect a mungo server using server object
MongoClient.close()                                     // used to close connection
MongoClient.db()                                        // used ot get database object to do CRUD operations
MongoClient.connect()                                   // used to connect MongoDB using mungoURL
```

> ### 1) connection using Db
1. getting mongoclient object and server object form mongodb library
2. mongoclient object is created using MongoClient constructer passing server instance
3. mongoclient.open() method is used to establish connection to the MDB

NOTE: this type of connection is done to establish connection to the local MDB server

```
    var MongoClient = require('mongodb').MongoClient
    , Server = require('mongodb').Server;

    var mongoClient = new MongoClient(new Server('localhost', 27017));

    mongoClient.open(function(err, mongoClient) {
      var db1 = mongoClient.db("mydb");

    mongoClient.close();
    });
```


> ### 2) connection using url

> #### what is mungoURl?
mongo url is a special type of url which contains all the information to connect MDB

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

###  connection using url
```
    let MongoClient = require('mongodb').MongoClient;

    MongoClient.connect(<<mungourl>>, function(err, dbo) {
    if (err) throw err;
                                    //DatabaseName: products & CollectionName: items
    var dbo = dbo.db("products");    
    dbo.collection("items").insertOne({ name:"facewash",price: 30},(err, result)=>{
        if (err) throw err;
            res.json(result);
            db.close();
        });
    });
```
NOTE: in mongodb we have clusters >> databases >> collections >> records or documents

Refer: [Mongo Db connection options](https://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html?highlight=mongoclient "options for connection mongodb using mungo cliet")


# mongodb CRUD

> # 1) CREATE new record : Method1: using callbacks
```
    let mungourl = 'mongodb+srv://kdpvk_db_user:mOtWSRqQsrsc3dLI@kpvk.npdza.mongodb.net/KDPVK?retryWrites=true&w=majority';
    try {
      
        MongoClient.connect(mungourl,{useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
            if (err) throw err;
            var dbo = db.db("GBEMS"); // database name
            dbo.collection("inventory").insertOne(
                { item: "calender", qty: 25, tags: ["blue", "red"], dim_cm: [ 14, 21 ] },
                (err, result)=>{ // table name 
                if (err) throw err;
                        console.log(result.insertedCount);
                        console.log(result.insertedId);
                        console.log(result.ops);
                        console.log(result.ok);
                        
                        
                     res.json(result);
             
                     
                    db.close();
            });
          });//#MongoClient


    } catch (error) {
        res.status(500).send(error);
    }
```  
> # 2) CREATE new record : Method2: using asunc aweait

```
 let mungourl = 'mongodb+srv://kdpvk_db_user:mOtWSRqQsrsc3dLI@kpvk.npdza.mongodb.net/KDPVK?retryWrites=true&w=majority';
    try {
       let mClient =  await MongoClient.connect(mungourl,{useNewUrlParser: true, useUnifiedTopology: true}); // 1) MongoClient
       const db = mClient.db("GBEMS");    //Db
       const mongoResult = await db.collection("inventory").insertOne(  { item: "calender", qty: 25, tags: ["blue", "red"], dim_cm: [ 14, 21 ] }); //3) CommandResult 
            if(mongoResult.result.ok){
                res.json(mongoResult.result); 
            }else{
                throw new error("something went wrong during insertion");
            }
                
        } catch (error) {
            res.status(500).send(error); 
        }
```

> # 1) Read All the records : Method1: using callbacks using 
- find()method brings all the documents in the collection 

```
        let mungourl = 'mongodb+srv://kdpvk_db_user:mOtWSRqQsrsc3dLI@kpvk.npdza.mongodb.net/KDPVK?retryWrites=true&w=majority';
  
        try {
            MongoClient.connect(mungourl,{useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
                console.log(db) //MongoClient
                 if (err) throw err;

                var dbo = db.db("GBEMS"); // database name
                 console.log(dbo)//Db
           
                    dbo.collection('inventory').find({}).toArray(function(err, docs) {
                        console.log(docs) // result array of objects 
                        if (err) throw err;
                        res.json(docs);
                    });    
             });
         } catch (error) {
            res.status(500).send(error);
        }
```


> ## Reading all the records Method2: using asunc aweait


```
 //GBEMS :inventory
        let mungourl = 'mongodb+srv://kdpvk_db_user:mOtWSRqQsrsc3dLI@kpvk.npdza.mongodb.net/KDPVK?retryWrites=true&w=majority';
        //let mungourl = 'Qsrsc3dLI@kpvk.npdza.mongodb.net/KDPVK?retryWrites=true&w=majority';

        try {
            const Mongoclt = await MongoClient.connect(mungourl,{ useUnifiedTopology: true });
            const db = Mongoclt.db("GBEMS");

            // Reading Documents using cursor one by one 
            //-------------------------------------------------
            //const result = await db.collection("inventory").find({});

            // console.log("------------------------------------");
            // console.log(Mongoclt); //MongoClient
            // console.log(db); //Db
            // console.log(result); //Cursor
            // console.log("------------------------------------");

            // while (await result.hasNext()) {
            //     const doc = await result.next();
            //     console.log(doc);
            //   };
            //   res.send("all is well");

            const result = await db.collection("inventory").find({}).toArray();
            res.json(result)
            
        }  catch (error) {
            res.status(500).send(error);

        }
```