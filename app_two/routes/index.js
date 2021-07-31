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

 knex.on( 'query', function( queryData ) {
  console.log( "--------------Query data--------------------" );
  console.log( queryData.sql);
  console.log( "----------------------------------------" );
});


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
const Author = bookshelf.model('Author')
const Book = bookshelf.model('Book')


  
/* GET home page. */
router.get('/', async function(req, res, next) {
 



  try {
    let  allGere = await Book.count();
    // allGere.forEach(e=>console.log(e.toJSON()))
    console.log(allGere);
  } catch (error) {
    
  }
    
  
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


