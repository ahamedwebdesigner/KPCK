

                //const result = await db.collection("emp").find({"employe" :{$in:['Scott','frank']}}).toArray(); 
                // const result = await db.collection("emp").find({"skills.sports" :'tennis'}).toArray(); 
              
 

                // story poring greater than 20 and less than 23               
                //const result = await db.collection("emp").find( {  taskPoints:{ $elemMatch: { $gt: 18, $lt: 23 } } } ).toArray(); 

                //The $elemMatch operator matches documents that contain an array field with at least one element that matches all the specified query criteria.
                // const result = await db.collection("emp").find({skills:{$elemMatch:{hobbies:'photography'} } } ).toArray(); 
                


                
# find elements

## find all

```
 const result = await db.collection("emp").find({}).toArray();
 
 ```

## find by field name
``` 
    const result = await db.collection("emp").find({employe: "Scott"}).toArray();
```

## find by field name 

```
    // id with 2 and 3
    //const result = await db.collection("emp").find({"_id" :{$in:[2,3]}}).toArray(); 

    // emplye scott and frank
    //const result = await db.collection("emp").find({"employe" :{$in:['Scott','frank']}}).toArray(); 
               
```















## Update Specific Field

       let mongoResults = await db.collection('emp')
                .updateMany({employe: "Scott"},  
                            {
                                $set: {
                                    extraCredit: 20,
                                    
                              }
                            }
                           
                 ); 
## include new fields
<pre>
   let mongoResults = await db.collection('emp')
                .updateMany({employe: "Scott"},  
                            {
                                $inc: {
                                    likes: 5
                                }
                            }
                           
                 ); 
</pre>




# useful snippets
## more about updates

   let mongoResults = await db.collection('emp')
                                           .updateMany({},  
                                                      [ {$set: { astUpdate: "$$NOW"}}]
                                                      [ {$set: {date: Date()}}]
                       
                                            );  
 // NOTE:  check for n :1, nModefied : 1, ok :1


       res.send(mongoResults.result);  



# more about fine
db.posts.find().limit(2).sort({ title: 1 }).pretty()




  
  ## $gte && $gt 

  ## $lte && $gt

  ## $$NOW
  /**

 //{"createdAt" : { $gte : new Date(year,month,day,0,0,0).toISOString(), $lte:  new Date(year,month,day,23,59,59).toISOString() }}


if (req.params.sDate && req.params.eDate) {
      query["createdAt"] = {
        $gte:  new Date("2020-01-25").toISOString(),
        $lte:    new Date("2020-09-25").toISOString()
      };


MongoClient.connect(con, function (err, db) {
    if (err) throw err
    db.collection('orders').find({ "order_id": store_id, "orderDate": {     
       "$gte": new Date(today), "$lt": new Date(tomorrow)}
     }).toArray(function (err, result) {
        console.log(result);
        if (err) throw err
          res.send(result);
    })
  })


  **/
 

  let mongoResults = await db.collection('emp')
                                           .updateMany({},  
                                                      [ {$set: { astUpdate: "$$NOW"}}]
                                            );
           


$ More about Updates
     //  {$set: {skills:["java","node","spring"]}},  // adding skills arry to all
    //{$set: {howersExtraAVG:{ $avg: "$howersExtra" }}}, 

                                                        //{ $set: { "howersExtra.$.content" : 100 } }
                                                      
                                                    //    {   $set: { [`skills.${1}.value`]: "PHP"}  }
                                                       {   $set: { "skills.2" : "PHP"}  }










# Qering data 

> # Quering using datatype using $type
$type selects documents where the value of the field is an instance of the specified BSON type(s).
A $type expression for a single BSON type has the following syntax:
SYNTAX: { field: { $type: <BSON type> } }

EG: find( {"data" : { $type : "array" } } )

| Type                       | Number | Alias                 | Notes                      |
| -------------------------- | ------ | --------------------- | -------------------------- |
| Double                     | 1      | "double"              |                            |
| String                     | 2      | "string"              |                            |
| Object                     | 3      | "object"              |                            |
| Array                      | 4      | "array"               |                            |
| Binary data                | 5      | "binData"             |                            |
| Undefined                  | 6      | "undefined"           | Deprecated.                |
| ObjectId                   | 7      | "objectId"            |                            |
| Boolean                    | 8      | "bool"                |                            |
| Date                       | 9      | "date"                |                            |
| Null                       | 10     | "null"                |                            |
| Regular Expression         | 11     | "regex"               |                            |
| DBPointer                  | 12     | "dbPointer"           | Deprecated.                |
| JavaScript                 | 13     | "javascript"          |                            |
| Symbol                     | 14     | "symbol"              | Deprecated.                |
| JavaScript code with scope | 15     | "javascriptWithScope" | Deprecated in MongoDB 4.4. |
| 32-bit integer             | 16     | "int"                 |                            |
| Timestamp                  | 17     | "timestamp"           |                            |
| 64-bit integer             | 18     | "long"                |                            |
| Decimal128                 | 19     | "decimal"             | New in version 3.4.        |
| Min key                    | \-1    | "minKey"              |                            |
| Max key                    | 127    | "maxKey"              |                            |


eg:
<pre>
db.getSiblingDB("examples").sensors.insertMany([
  { "_id" : 1, "reading" : NumberDecimal(26.0) }
  { "_id" : 2, "reading" : NumberLong(25.0) }
  { "_id" : 3, "reading" : NumberInt(24) }
  { "_id" : 4, "reading" : 24.0 }
  { "_id" : 5, "reading" : "24" }
  { "_id" : 6, "reading" : [ NumberDecimal(26) ]}
])


db.sensors.aggregate([{
  $addFields : {
    "isNumber" : { $isNumber : "$reading" },
    "hasType" : {$type : "$reading"}
  }
}])

//result
{ "_id" : 1, "reading" : NumberDecimal("26.0000000000000"),<b> "isNum " : true, </b>"type" : "decimal" }
</pre>









# Resourses

Refer: [online Json viewer](http://jsonviewer.stack.hu/ "online Json viewer")
