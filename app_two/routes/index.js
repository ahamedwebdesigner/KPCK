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
    tableName: 'author',
    hasTimestamps: true,
    // hidden: ['password','created_at'],
    // visible: ['username', 'created_at'],
    // idAttribute: 'AuthorID',
    books() {
      return this.hasMany('Books')
    }
  });

  module.exports = bookshelf.model('Books', {
    tableName: 'books',
    author() {
        return this.belongsTo(Author);
    }
  });




// Retrieving a previously registered model
const Author = bookshelf.model('Author')
const Book = bookshelf.model('Books')

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


