var express = require('express');
var router = express.Router();

let MongoClient = require('mongodb').MongoClient;
let Server = require('mongodb').Server;
let ObjectID = require('mongodb').ObjectID;


let teacher = [
    { 
        _id: 1, 
        Name: "Scott", 
        subject:['english','telugu'],
        "interests": ["Running","Darts"],
        address : "2030 Martian Way", 
        zipCode : "90698345"  
    },
    { 
        _id: 2, 
        Name: "Scott", 
        subject:['english','telugu'],
        "interests": ["Running","Darts"],
        address : "2030 Martian Way", 
        zipCode : 43339374 
    },
    { 
        _id: 3, 
        Name: "Scott", 
        subject:['english','telugu'],
        "interests": ["Running","Darts"],
        address : "2030 Martian Way", 
        zipCode: ['995588214']
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


router.get("/", async (req, res) => {
 
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
                res.render('mongo',{userData:result})
           
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






module.exports = router;