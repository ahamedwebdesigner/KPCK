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


  const bookshelf = require('bookshelf')(knex);

  var User = bookshelf.Model.extend({
    tableName: 'users'
  });


/* GET home page. */
router.get('/', function(req, res, next) {
 /*
  new User()
    .fetchAll()
		.then(function (users) {
			res.json(users);
    })
    .catch(function (error) {
			console.log(error);
			res.send('An error occured');
    });
*/

    new User().where('id', 1)
		.destroy()
		.catch(function (error) {
			console.log(error);
			res.send('An error occured');
		});
    
  // console.log("==========================#knex======================");
  // console.log(bookshelf);
  // console.log("==========================#knex======================");
  //res.render('index', { title: 'Express' });
});



router.get('/user-create', function(req, res, next) {

  new User({
		username: "mustaq",
		email:'mustaq@gmail.com',
		name:"mushy",
		age: '32',
		location: 'Anantapur'
  }).save()
    .then(function (user) {
      res.json(user);
    }).catch(function (error) {
      console.log(error);
      res.send('An error occured');
    });
 
  // res.render('index', { title: 'Express' });
});



/* GET home page. */
router.get('/user-delet', function(req, res, next) {


     new User().where('id', 3)
     .destroy()
     .then((data)=>{
      res.send('user removed ');
     })
     .catch(function (error) {
       console.log(error);
       res.send('An error occured');
     });
     

 });
 

/* GET home page. */
router.get('/user-details', function(req, res, next) {


  new User().where('id', 4)
  .fetch()
  .then(function (user) {
    res.json(user);
  }).catch(function (error) {
    console.log(error);
    res.send('An error occured');
  });
 
  

});


/* GET home page. */
router.get('/user-update', function(req, res, next) {


  new User().where('id', 4).save('username', 'John Smith',{
    method: 'update',
    patch: true
}).then((model) => {
    res.json(user);
  }).catch(function (error) {
    console.log(error);
    res.send('An error occured');
  });
  

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
