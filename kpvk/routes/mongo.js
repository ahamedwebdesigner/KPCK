var express = require('express');
var router = express.Router();

let MongoClient = require('mongodb').MongoClient;


let Server = require('mongodb').Server;
let ObjectID = require('mongodb').ObjectID;



router.get("/", async (req, res) => {
 

        //----------------------------------------
        //GBEMS :inventory
        let mungourl = 'mongodb+srv://kdpvk_db_user:mOtWSRqQsrsc3dLI@kpvk.npdza.mongodb.net/KDPVK?retryWrites=true&w=majority';
        //let mungourl = 'Qsrsc3dLI@kpvk.npdza.mongodb.net/KDPVK?retryWrites=true&w=majority';

        try {
            const Mongoclt = await MongoClient.connect(mungourl,{ useUnifiedTopology: true });
            const db = Mongoclt.db("GBEMS");
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

        //----------------------------------------
 });//#end get






module.exports = router;