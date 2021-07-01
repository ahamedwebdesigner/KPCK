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
        "interests": ["drawing","pastels"],
       
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




router.get("/", async (req, res) => {
    let mungourl = 'mongodb+srv://kdpvk_db_user:mOtWSRqQsrsc3dLI@kpvk.npdza.mongodb.net/KDPVK?retryWrites=true&w=majority';

    try {
        let mClient =  await MongoClient.connect(mungourl,{useNewUrlParser: true, useUnifiedTopology: true}); // 1) MongoClient
        const db = mClient.db("MGBS");    //Db
        
        // increment remove field
        let mongoResults=[];
         const result = await db.collection("TeachersDB").find({}).toArray(); 
         res.render('nosql',{userData:result })

    }catch(error){

    }

});//#end get

router.get("/reset-data", async (req, res) => {
    let mungourl = 'mongodb+srv://kdpvk_db_user:mOtWSRqQsrsc3dLI@kpvk.npdza.mongodb.net/KDPVK?retryWrites=true&w=majority';
    try {
        let mClient =  await MongoClient.connect(mungourl,{useNewUrlParser: true, useUnifiedTopology: true}); // 1) MongoClient
        const db = mClient.db("MGBS");    //Db
         

        const DropResult = await db.collection("TeachersDB").drop();
        console.log("=================");
        console.log(DropResult);
        console.log("=================");


        const mongoResult = await db.collection("TeachersDB").insertMany( teacher  , { ordered: true } ); 
            
        
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

});//#end get

   

module.exports = router;