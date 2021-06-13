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




module.exports = router;
