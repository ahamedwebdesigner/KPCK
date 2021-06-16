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
           
  
           const mongoResult = await db.collection("bookhouse").insertMany( 
            [
                { item: "journal", qty: 25, tags: ["blank", "red"], dim_cm: [ 14, 21 ] },
                { item: "notebook", qty: 50, tags: ["red", "blank"], dim_cm: [ 14, 21 ] },
                { item: "paper", qty: 100, tags: ["red", "blank", "plain"], dim_cm: [ 14, 21 ] },
                { item: "planner", qty: 75, tags: ["blank", "red"], dim_cm: [ 22.85, 30 ] },
                { item: "postcard", qty: 45, tags: ["blue"], dim_cm: [ 10, 15.25 ] }
             ] ,
              { ordered: true } 
            ); 

            if(mongoResult.result.ok){
                res.json(mongoResult.result); 
            }else{
                throw new error("something went wrong during insertion");
            }
                    
            } catch (error) {
                res.status(500).send(error); 
            }
        //----------------------------------------
 });//#end get






module.exports = router;