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
  console.log( queryData);
  console.log( "----------------------------------------" );
});

  
let Emp = bookshelf.model('Emp', {
  tableName: 'employees',
  offiece() {
    return this.belongsTo('Offiece','officeCode','officeCode');  //regester model , //Foreign key in this model // Column in the `Target` model's table which `foreignKey`

  }
});
  

let Offiece = bookshelf.model('Offiece', {
  tableName: 'offices',
  emp() {
    return this.hasMany('Emp')
  }
});


/* GET home page. */
router.get('/', async function(req, res, next) {
 
  try {
    let  allEMp = await new Emp({ employeeNumber: 1621}).fetch(
      {withRelated: ['offiece']}
    );
    console.log(allEMp.toJSON())
  } catch (error) {
      console.log(error);
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


