var express = require('express');
var router = express.Router();



let options = {
  "host": "localhost",
  "port": 3306,
  "user":"apptwo",
  "password": "123456789",
  "database": "app_two"
}
var mysql      = require('mysql');
var connection = mysql.createConnection(options);
connection.connect();


const knex = require('knex')({
  client: 'mysql',
  connection: {
      host: '127.0.0.1',
      user: 'apptwo',
      password: '123456789',
      database: 'app_two'
  }});


/* GET home page. */
router.get('/', function(req, res, next) {
 
  console.log("==========================#knex======================");
  console.log(knex);
  console.log("==========================#knex======================");
  res.render('index', { title: 'Express' });
});



router.get('/connection-test', function(req, res, next) {
  connection.query('Select 1+1 as result', function (err, result) {  
    if (err) {
      res.send("Data base not connected: ");
    };  
   
    res.send("Data base  connected: OK") 
  });  
});



module.exports = router;
