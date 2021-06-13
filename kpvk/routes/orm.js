var express = require('express');
var router = express.Router();

//-----------------------------------------------------
//1) importing mongoose obj
const mongoose = require('mongoose');
let mungourl = 'mongodb+srv://kdpvk_db_user:mOtWSRqQsrsc3dLI@kpvk.npdza.mongodb.net/KDPVK?retryWrites=true&w=majority';
//2) connection mongse
mongoose.connect(mungourl, {useNewUrlParser:true,useUnifiedTopology: true });
//3) getting database object
const db = mongoose.connection;
//4) displaying states on success and error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("---------------------------");
  console.log("connection open success|");
  console.log("---------------------------");
});

// 5 ) creating schema defination
var BookSchema = mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number
});
//6) creating modal
var Book = mongoose.model('Book', BookSchema, "Books");



//-----------------------------------------------------

router.get('/', function(req, res) {  

  var book1 = new Book({ name: 'Introduction to Mongoose by mustaq ', price: 1000, quantity: 100 });
   book1.save(function(err, data) {
    if(err) {  console.log(error);  }
  });


    res.status(200).send('Hellow orm|'); 

  }); 




  const FoodSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    calories: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) throw new Error("Negative calories aren't real.");
      },
    },
  });
  const Food = mongoose.model("Food", FoodSchema);


  
router.get('/food', async function(req, res) {  

  /* 
  // Note: vaidation rules my apply while savingg data 
  var food1 = new Food({ name: 'piZZa non-vez CHICKEn', calories: 1000 });

  try {
    let f1= await food1.save();
    console.log(f1);
    res.status(200).send('food saved by orm|'); 
  } catch (error) {
    //response.status(500).send(error);
  }
   */

/* 
// validation errors will though if enterd data is not appropriate
  var food1 = new Food({ name: 'piZZa non-vez CHICKEn', calories: -1000 });

  try {
    let f1= await food1.save();
    console.log(f1);
    res.status(200).send('food saved by orm|'); 
  } catch (error) {
    res.status(500).send(error);
  }
*/
 

  }); 



  router.get("/all-foods", async (request, response) => {

    /* to get all the stored foods in mongodb */
    const foods = await Food.find({});
  
    try {
      response.send(foods);
    } catch (error) {
      response.status(500).send(error);
    }
  });


//http://localhost:3000/orm/food-name/pizza%20non-vez
 // router.get("/food-search/:name/:cal", async (request, response) => {
   // router.get("/food-search/:cal", async (request, response) => {
    router.get("/food-search", async (request, response) => {
    /**/
    // const foods = await Food.find({name:request.params.name,calories:request.params.cal});
     //const foods = await Food.find({calories:request.params.cal});
    

     

    //const foods = await Food.find({calories:'300'});
    //const foods = await Food.find({calories:'300',..........}); // 
    try {

      
      if (mongoose.Types.ObjectId.isValid('60c5c4cffdffa31b38d5ba24')){    
      
        const foods = await Food.findById('60c5c4cffdffa31b38d5ba24');
      }else{
        console.log("Invalied user id");
      }
      response.send(foods);
    } catch (error) {
      response.status(500).send(error);
    }

  });

  


module.exports = router;
