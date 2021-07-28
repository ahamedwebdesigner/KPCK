var express = require('express');
var router = express.Router();
var _ = require('underscore');




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
  // let dbres = knex.select().from('employees').orderByRaw('ISNULL(reportsTo), reportsTo ASC');
 
  // let dbres = knex.column('employeeNumber','lastName').select().from(function(){
  //         this.from('employees').groupBy('jobTitle').as('t1')
  // });

  // knex.avg('sum_column1').from(function() {
  //   this.sum('column1 as sum_column1').from('t1').groupBy('column1').as('t1')
  // }).as('ignored_alias')

  // let dbres = knex('employees').whereNot({
  //   employeeNumber: '1088',
  //   reportsTo:  '1102'
  // }).select('reportsTo')


  // let dbres =knex('users')
  // .join('contacts', 'users.id', '=', 'contacts.user_id')
  // .select('users.id', 'contacts.phone') 


  let dbres = knex('employees')
  .join('offices', 'employees.officeCode', '=', 'offices.officeCode')
  .whereNot({
      employeeNumber: '1002',
    })
  .select('employees.employeeNumber', 'employees.lastName', 'offices.city' )


  
  dbres.then(data=>{
    let optionData= _.object(_.pluck(data,'employeeNumber'),_.pluck(data,'lastName')) ;

      res.json(optionData);
  })
  // res.json(JSON.stringify(dbres));

  console.log("==========================#knex======================");
  console.log(dbres.toSQL());
  console.log("==========================#knex======================");
  //res.render('index', { title: 'working with kenex' });
});




module.exports = router;
