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
  console.log( queryData.bindings);
  console.log( queryData.sql);
  console.log( "----------------------------------------" );
});

// note offieces table contain officeCodeid  
  // officeCodeid (pk )is present in offiece table officeCode (FK)
let Emp = bookshelf.model('Emp', {
  tableName: 'employees',
  offiece() {
    return this.belongsTo('Offiece','officeCode','officeCodeid');  //regester model , //Foreign key in this model // Column in the `Target` model's table which `foreignKey`

  },
  initialize() {
    this.on('fetched:collection', (collection) => {
        console.log( "--------------On events--------------------" );
        console.log(`fetched employess`)
        console.log( "--------------On events--------------------" );
    });
    this.on('fetching:collection', (collection) => {
      console.log( "--------------On events--------------------" );
      console.log(`fetching employess`)
      console.log( "--------------On events--------------------" );
  });

    
  }
});
  

//note:  hasMany(Target, foreignKey, foreignKeyTarget) {
  // officeCodeid is present in offiece table 
let Offiece = bookshelf.model('Offiece', {
  tableName: 'offices',
  idAttribute : 'Offiece_id',
  emp() {
    return this.hasMany('Emp','officeCode','officeCodeid')
  }
});



let Customer = bookshelf.model('Customer', {
  tableName: 'customers',
  emp() {
    return this.belongsTo('Emp','salesRepEmployeeNumber','employeeNumber')
  }
});


/* GET home page. */
router.get('/', async function(req, res, next) {

  try {
    

    let  allData = await Customer.collection().fetch();
    // let  allData = await new  Customer().fetchAll();
    // let  allData = await new  Customer().fetch();  // get single modle
    allData.forEach(e=>console.log(e.get('customerName')));

//  console.log(allData.toJSON())
  } catch (error) {
    console.log('---------------error-----------------')
    console.log(error)
    console.log('---------------error-----------------')
  }

  res.send("working with bookshelf ");
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

