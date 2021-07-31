var express = require('express');
var router = express.Router();


const knex = require('knex')({
  client: 'mysql',
  connection: {
      host: '127.0.0.1',
      user: 'apptwo',
      password: '123456789',
      database: 'apptwo'
  }});
  const bookshelf = require('bookshelf')(knex);


  module.exports = bookshelf.model('Author', {
    tableName: 'authors',
    book() {
      return this.hasMany('Book')
    }
  });

  module.exports = bookshelf.model('Book', {
    tableName: 'books',
    author() {
        return this.belongsTo("Author");
    }
  });

// Retrieving a previously registered model
const Author = bookshelf.model('Author')
const Book = bookshelf.model('Book')



/* GET home page. */
router.get('/', function(req, res, next) {





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


