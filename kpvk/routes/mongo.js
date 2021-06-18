var express = require('express');
var router = express.Router();

let MongoClient = require('mongodb').MongoClient;
let Server = require('mongodb').Server;
let ObjectID = require('mongodb').ObjectID;



router.get("/", async (req, res) => {
 

        //----------------------------------------
        //GBEMS :inventory
        let mungourl = 'mongodb+srv://kdpvk_db_user:mOtWSRqQsrsc3dLI@kpvk.npdza.mongodb.net/KDPVK?retryWrites=true&w=majority';
        try {
                let mClient =  await MongoClient.connect(mungourl,{useNewUrlParser: true, useUnifiedTopology: true}); // 1) MongoClient
                const db = mClient.db("GBEMS");    //Db
                /*-------------------------------------------------------------  */  
                let mongoResults = await db.collection('emp')
                                           .updateMany({},  
                                                      [
                                                        {$set: {empPoints:[{story:"$storyPoints"},{task:"$taskPoints"}]}},
                                                        {$unset: [ "storyPoints", "taskPoints" ] }
                                                      ]
                                            );
                /*-------------------------------------------------------------  */  
                console.log('----------Begin-----------');
               // console.log(mongoResults.result);
                console.log('----------END-----------');

                res.send(mongoResults.result); 
                // NOTE:  check for n :1, nModefied : 1, ok :1
                
                    
            } catch (error) {
                console.log('----------ERROR: -----------');
                          console.log(JSON.parse(JSON.stringify(error)))
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
            const mongoResult = await db.collection("emp").insertMany( 
                [
                    { _id: 1, employe: "Scott", storyPoints: [ 10, 5, 10 ,20,30], taskPoints: [ 10, 8 ], extraCredit: 0, howersExtra: [0,0,0,0,3,10]},
                    { _id: 2, employe: "Jobkins", storyPoints: [ 10, 9, 10 ,20,30], taskPoints: [ 10, 2,3 ], extraCredit: 1, howersExtra: [0,0,0,0,8,10]},
                    { _id: 3, employe: "Blis", storyPoints: [ 10, 5, 10 ,20,30], taskPoints: [ 10, 8 ], extraCredit: 0, howersExtra: [0,0,0,0,7,10]},
                 ] ,
                  { ordered: true } 
                ); 
                    if(mongoResult.result.ok){
                        res.json(mongoResult.result); 
                }else{
                    throw new error("something went wrong during insertion");
                }
        } catch (error) {
            console.log('----------ERROR: -----------');
                    console.log(JSON.parse(JSON.stringify(error)))
            console.log('----------#ERROR: -----------');
            res.status(500).send(error); 
    
        }
    //---------------------------------------- res.sendStatus
});//#end get




module.exports = router;