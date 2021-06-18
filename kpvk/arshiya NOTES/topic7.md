
# Updating existing element
> ## db.collection.updateOne()
Syntax: db.collection.updateOne(filter, update, options)

- we can update any elements singl documnet or many docutments values using updateOne() and updateMany()
- updateOne updates one document , if may document are matched then first occurance of the docuent is modefied

- **syntax :    db.collection.updateMany(filter, update, options)**
      - filter  -> The selection criteria for the update. The same query selectors as in the find() method are available.
      - update  -> document or pipeline The modifications to apply 
      - options -> 

>## example :
<pre>
        //GBEMS :inventory
        let mungourl = 'mongodb+srv://kdpvk_db_user:mOtWSRqQsrsc3dLI@kpvk.npdza.mongodb.net/KDPVK?retryWrites=true&w=majority';
        try {
                let mClient =  await MongoClient.connect(mungourl,{useNewUrlParser: true, useUnifiedTopology: true}); // 1) MongoClient
                const db = mClient.db("GBEMS");    //Db
                let mongoResults = await db.collection('bookhouse')
                                           .updateOne({ item:"postcard"}, 
                                                      { 
                                                        $set: {  item:"NEW postcard" } ,    
                                                        $inc: { "violations" : 3}
                                                      });
          
                console.log('----------Begin-----------');
                console.log(mongoResults.result);
                console.log('----------END-----------');
                res.send(mongoResults.result);

            } catch (error) {
                            console.log('----------ERROR: -----------');
                            console.log(JSON.parse(JSON.stringify(error)))
                            console.log('----------#ERROR: -----------');
                res.status(500).send(error); 
        }
</pre>

### updating options
- db.collection.updateOne() method can accept an aggregation pipeline [ stage1, stage2, ... ] 
    that specifies the modifications to perform.

The pipeline can consist of the following stages:

- $addFields and its alias $set
- $project and its alias $unset
- $replaceRoot and its alias $replaceWith.

### $set
- $set appends new fields to existing documents. You can include one $set stages in an aggregation operation.

<pre>
    /*-------------------------------------------------------------  */  
    let mongoResults = await db.collection('emp')
                                .updateOne({ employe: "Scott jonson"},  
                                            { 
                                            $set: {  
                                                employe: "Scott Neal Jonson",
                                                item:"postcard item two",   // modifying exist item
                                                itemType:"offiece starinery" // inserting new item
                                            } 
                                
                                            });
    /*-------------------------------------------------------------  */  
</pre>

>## $inc used to include new values to the document 

<pre>
    /*-------------------------------------------------------------  */  
    let mongoResults = await db.collection('emp')
                                .updateOne({ employe: "Jobkins black"},  
                                            { 
                                            $set: {  
                                                employe: "Jobkins black robin",
                                                item2:"printer one +",                      // modifying exist item
                                                itemType2:"electronic starinery advanse"    // inserting new item
                                            } ,
                                                $inc: { vots : 3}    // new one 
                                            });
    /*-------------------------------------------------------------  */  
</pre>

### upsert: when upsert option 

- when upsert option is used then data if the matching recard is not present then
  new recard is created 
- note: if there is similar kin in set and filter object $set value will takes the preferance and
    overides

<pre>
             let mongoResults = await db.collection('emp')
                                           .updateOne({ employe: "Mustaq Ahmaed"},  
                                                      { 
                                                        $set: {  
                                                            employe: "syed Mustaq Ahmaed",
                                                            item2:"printer one +",            // modifying exist item
                                                            itemType2:"electronic starinery advanse" // inserting new item
                                                        } ,
                                                         $inc: { vots : 100}    // new one 
                                                      },
                                                      { upsert: true }
                                            );
</pre>

# differance between updateOne and updateMany
- updateMany will update all the matching documents 
- updateOne will update only first occurance of the matching docuements

<pre>
 /*-------------------------------------------------------------  */  
let mongoResults = await db.collection('emp')
                            .updateMany({ employe: "Scott"},  
                                        { 
                                        $set: {  
                                                item2:"printer one +",            // modifying exist item
                                                itemType2:"electronic starinery advanse" // inserting new item
                                        } ,
                                            $inc: { vots : 100}                // new one 
                                        }
                                        
                            );
/*-------------------------------------------------------------  */ 
</pre>


## Changing structure of document
- $unset removers the fields
- <<$fielNmae>> we can select data and we can rearrange structure

<pre>
    /*-------------------------------------------------------------  */  
    let mongoResults = await db.collection('emp')
                            .updateMany({},  
                                        [
                                            {$set: {empPoints:[{story:"$storyPoints"},{task:"$taskPoints"}]}},
                                            {$unset: [ "storyPoints", "taskPoints" ] }
                                        ]
                                );
    /*-------------------------------------------------------------  */  
</pre>

