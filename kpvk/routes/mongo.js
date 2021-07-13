var express = require('express');
var router = express.Router();

let MongoClient = require('mongodb').MongoClient;
let Server = require('mongodb').Server;
let ObjectID = require('mongodb').ObjectID;


let teacher = [
    { 
        _id: 1, 
        Name: "smith", 
        extraHowers:[20,30,5],
        "interests": ["Running","yoga"],
        address : "2030 Martian Way", 
        rank: 10,
        "salery": 20000, 
        "expenditure": 3000,
        mobileNo : "90698345",  
        "address": {
            "street": "Kulas Light",
            "suite": "Apt. 556",
            "city": "Gwenborough",
            "zipcode": "92998-3874",
            "geo": {
              "lat": "-37.3159",
              "lng": "81.1496"
            }
          },
    },
    { 
        _id: 2, 
        Name: "allen", 
        extraHowers:[2,3,5],
        "interests": ["Running","Bowling"],
        address : "309 delles ", 
        rank: 20,
        "salery": 12512, 
        "expenditure": 50051,
        mobileNo : 43339374 ,
        "address": {
            "street": "Victor Plains",
            "suite": "Suite 879",
            "city": "Wisokyburgh",
            "zipcode": "90566-7771",
            "geo": {
              "lat": "-43.9509",
              "lng": "-34.4618"
            }
          },
    },
    { 
        _id: 3, 
        Name: "ward", 
        extraHowers:[0,30,5],
        subject:['science','mathematics'],
        "interests": ["drawing","pastels"],
        address : "secondcroll", 
        rank: 11,
        "salery": 101010, 
        "expenditure": 50012,
        mobileNo: ['995588214'],
        "address": {
            "street": "Douglas Extension",
            "suite": "Suite 847",
            "city": "McKenziehaven",
            "zipcode": "59590-4157",
            "geo": {
              "lat": "-68.6102",
              "lng": "-47.0653"
            }
          },
    },
    { 
        _id: 4, 
        Name: "martin", 
        extraHowers:[5,3,5],
        "interests": ["pastels","Darts"],
        address : "third cross main way", 
        rank: 12,
        "salery": 150000, 
        "expenditure": 10000,
        mobileNo: ['995588214'],
        "address": {
            "street": "Hoeger Mall",
            "suite": "Apt. 692",
            "city": "South Elvis",
            "zipcode": "53919-4257",
            "geo": {
              "lat": "29.4572",
              "lng": "-164.2990"
            }
          },
    },
    { 
        _id: 5, 
        Name: "Blis", 
        extraHowers:[2,30,50],
        "interests": ["cooking","backing"],
        address : "fitth cross main way", 
        rank: 13,
        "salery": 301252, 
        "expenditure": 12345,
        mobileNo: ['3366225511'],
        "address": {
            "street": "Skiles Walks",
            "suite": "Suite 351",
            "city": "Roscoeview",
            "zipcode": "33263",
            "geo": {
              "lat": "-31.8129",
              "lng": "62.5342"
            }
          },
    },
    { 
        _id: 6, 
        Name: "Ana", 
        extraHowers:[21,5,11],
        "interests": ["cooking","backing","Running"],
        address : "ninthy one croll street", 
        rank: 9,
        "salery": 56000, 
        "expenditure": 21000,
        mobileNo: ['6655224455'],
        "address": {
            "street": "Norberto Crossing",
            "suite": "Apt. 950",
            "city": "South Christy",
            "zipcode": "23505-1337",
            "geo": {
              "lat": "-71.4197",
              "lng": "71.7478"
            }
          },
    },
    
 ];



let testData = [
    { _id: 1, employe: "Scott", storyPoints: [ 10, 5, 10 ,20,30], taskPoints: [ 10, 8 ], extraCredit: 0, howersExtra: [0,0,0,0,3,10],skills:[{sports:'cricket',hobbies:'drawing'},{sports:'basketball',hobbies:'photography'}] },
    { _id: 2, employe: "Jobkins", storyPoints: [ 10, 9, 10 ,20,30], taskPoints: [ 10, 2,3 ], extraCredit: 1, howersExtra: [0,0],skills:[{sports:'basketball',hobbies:'photography'}]},
    { _id: 3, employe: "Blis", storyPoints: [ 10, 5, 10 ,20,30], taskPoints: [ 12, 5.2 ], extraCredit: 0, howersExtra: [10,0,20,0,7,10] ,skills:[{sports:'tennis',hobbies:'gardaning'}]},
    { _id: 4, employe: "Black", storyPoints: [ 20, 5, 15 ,20,32], taskPoints: [ 13, 18], extraCredit: 2, howersExtra: [05,0,10,0,7,10],skills:[{sports:'volleyball',hobbies:'dancing'}]},
    { _id: 5, employe: "john", storyPoints: [ 30, 15, 10 ,22,30], taskPoints: [ 20, 23], extraCredit: 4, howersExtra: [10,0,3,0,7,10],skills:[{sports:'tennis',hobbies:'swiming'}]},
    { _id: 6, employe: "frank", storyPoints: [ 16, 15, 20 ,21,21], taskPoints: [ 21, 22 ], extraCredit: 4.2, howersExtra: [0,12,10,0,7,10],skills:[{sports:'badminton',hobbies:'swiming'}]},

    { _id: 7, employe: "clark", storyPoints: [ 10, 5, 10 ,20,30], taskPoints: [ 10, 8 ], extraCredit: 0, howersExtra: [0,0,0,0,3,10],skills:{sports:'tennis',hobbies:'painting'} },
    { _id: 8, employe: "tom", storyPoints: [ 10, 9, 10 ,20,30], taskPoints: [ 10, 2,3 ], extraCredit: 1, howersExtra: [0,0,0,10,8,10],skills:{sports:'cricket',hobbies:'drawing'}},

 ];


router.get("/trash", async (req, res) => {
 
        //----------------------------------------
        //GBEMS :inventory
        let mungourl = 'mongodb+srv://kdpvk_db_user:mOtWSRqQsrsc3dLI@kpvk.npdza.mongodb.net/KDPVK?retryWrites=true&w=majority';
        try {
                let mClient =  await MongoClient.connect(mungourl,{useNewUrlParser: true, useUnifiedTopology: true}); // 1) MongoClient
                const db = mClient.db("GBEMS");    //Db
             
                //const result = await db.collection("emp").find({"employe" :{$in:['Scott','frank']}}).toArray(); 
                // const result = await db.collection("emp").find({"skills.sports" :'tennis'}).toArray(); 
              
 

                // story poring greater than 20 and less than 23               
                //const result = await db.collection("emp").find( {  taskPoints:{ $elemMatch: { $gt: 18, $lt: 23 } } } ).toArray(); 

                //The $elemMatch operator matches documents that contain an array field with at least one element that matches all the specified query criteria.
                // const result = await db.collection("emp").find({skills:{$elemMatch:{hobbies:'photography'} } } ).toArray(); 
                
                
                const result = await db.collection("emp").find({"skills.sports" :'tennis'}).toArray();
                console.log(result);                            
                res.render('mongo',{insertResult:result})
           
            } catch (error) {
                console.log('----------ERROR: -----------');
                          console.log(JSON.parse(JSON.stringify(error)))
                          console.log(error)
                console.log('----------#ERROR: -----------');

                res.status(500).send(error); 
          
             }
        //---------------------------------------- res.sendStatus
 });//#end get



 router.get("/insertmany", async (req, res) => {
     //----------------------------------------
    //GBEMS :inventory
    let mungourl = 'mongodb+srv://kdpvk_db_user:mOtWSRqQsrsc3dLI@kpvk.npdza.mongodb.net/KDPVK?retryWrites=true&w=majority';
    try {
            let mClient =  await MongoClient.connect(mungourl,{useNewUrlParser: true, useUnifiedTopology: true}); // 1) MongoClient
            const db = mClient.db("GBEMS");    //Db
            const mongoResult = await db.collection("emp").insertMany( testData  , { ordered: true } ); 
                    if(mongoResult.result.ok){
                        res.json(mongoResult.result); 
                }else{
                    throw new error("something went wrong during insertion");
                }
        } catch (error) {
            console.log('----------ERROR: -----------');
                    // console.log(JSON.parse(JSON.stringify(error)))
                    console.log(error)
            console.log('----------#ERROR: -----------');
            res.status(500).send(error); 
    
        }
    //---------------------------------------- res.sendStatus
});//#end get





router.get("/teacher-create", async (req, res) => {
    //----------------------------------------
   //GBEMS :inventory
   let mungourl = 'mongodb+srv://kdpvk_db_user:mOtWSRqQsrsc3dLI@kpvk.npdza.mongodb.net/KDPVK?retryWrites=true&w=majority';
   try {
           let mClient =  await MongoClient.connect(mungourl,{useNewUrlParser: true, useUnifiedTopology: true}); // 1) MongoClient
           const db = mClient.db("GBEMS");    //Db
            
           const DropResult = await db.collection("teacher").drop();
           console.log("=================");
           console.log(DropResult);
           console.log("=================");
           
           const mongoResult = await db.collection("teacher").insertMany( teacher  , { ordered: true } ); 
                if(mongoResult.result.ok){
                       res.json(mongoResult.result); 
               }else{
                   throw new error("something went wrong during insertion");
               }
       } catch (error) {
           console.log('----------ERROR: -----------');
                   // console.log(JSON.parse(JSON.stringify(error)))
                   console.log(error)
           console.log('----------#ERROR: -----------');
           res.status(500).send(error); 
   
       }
   //---------------------------------------- res.sendStatus
});//#end get



router.get("/teacher", async (req, res) => {
 
    //----------------------------------------
    //GBEMS :inventory
    let mungourl = 'mongodb+srv://kdpvk_db_user:mOtWSRqQsrsc3dLI@kpvk.npdza.mongodb.net/KDPVK?retryWrites=true&w=majority';
    try {
            let mClient =  await MongoClient.connect(mungourl,{useNewUrlParser: true, useUnifiedTopology: true}); // 1) MongoClient
            const db = mClient.db("GBEMS");    //Db
            
            // increment remove field
            let mongoResults=[];
           //  let result = await db.collection("teacher").find({}).toArray(); 
           let result = await db.collection("teacher").find({"Name" :{$in:['smith','allen']}}).toArray(); 
         
            // console.log("===========================");
            // console.log(result);
            // console.log("===========================");
        
            //  mongoResults = await db.collection("teacher").remove({"_id": "1"});
            // const result = await db.collection("teacher").find({$where: function() {
            //     return this.name ="Ana"
            // }}).toArray(); 

    // in array
            //const result = await db.collection("teacher").find({interests:'Running'}).toArray(); 
            //const result = await db.collection("teacher").find({interests:{ $all: ["Running"] } }).toArray(); 
            //const result = await db.collection("teacher").find({interests:{ $all: ["Running","yoga"] } }).toArray(); 
            // const result = await db.collection("teacher").find({interests: { $size: 3 } }).toArray(); 

    // array Of objects
            //const result = await db.collection("teacher").find({extraHowers:{ $elemMatch: { $gte: 10, $lt: 20 } } }).toArray(); 

   // child documents quering
            //const result = await db.collection("teacher").find({"address.zipcode" :'92998-3874'}).toArray(); 
            //const result = await db.collection("teacher").find({"address.geo.lat" :'-68.6102'}).toArray(); 
              
       
            res.render('mongo',{
             //insertResult:insertResult ,
                insertResult:mongoResults ,
                userData:result
            })
       
        } catch (error) {
            console.log('----------ERROR: -----------');
                      console.log(JSON.parse(JSON.stringify(error)))
                      console.log(error)
            console.log('----------#ERROR: -----------');

            res.status(500).send(error); 
      
         }
    //---------------------------------------- res.sendStatus
});//#end get



module.exports = router;