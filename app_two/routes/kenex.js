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

  // var User = bookshelf.Model.extend({
  //   tableName: 'users'
  // });


/* GET home page. */
router.get('/', function(req, res, next) {
 

  // let dbres = knex.select().from('employees');
  //let dbres = knex.select('employeeNumber','lastName').from('employees');
  // let dbres = knex.select('employeeNumber','lastName').from('employees').first();
  // let dbres = knex.select('employeeNumber','lastName').from('employees');
  // let dbres = knex.column('employeeNumber','lastName').select().from('employees');
  // let dbres =   knex.raw('select * from employees');


  // let dbres = knex.select().from('employees').orderBy('employeeNumber', 'asc');
  //let dbres = knex.select().from('employees').orderByRaw('ISNULL(reportsTo), reportsTo ASC');
 
  // let dbres = knex.column('employeeNumber','lastName').select().from(function(){
  //         this.from('employees').groupBy('jobTitle').as('t1')
  // });



  knex.avg('sum_column1').from(function() {
    this.sum('column1 as sum_column1').from('t1').groupBy('column1').as('t1')
  }).as('ignored_alias')


  dbres.then(data=>{
      res.json(data);
  })
  //  res.json(JSON.stringify(dbres));

  console.log("==========================#knex======================");
  console.log(dbres.toSQL());
  console.log("==========================#knex======================");
  //res.render('index', { title: 'working with kenex' });
});




module.exports = router;
