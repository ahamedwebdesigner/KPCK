var express = require('express');
var router = express.Router();
const PDFDocument = require('pdfkit');
var Promise = require('bluebird');
const Joi = require('joi');

const knex = require('knex')({
  client: 'mysql',
  connection: {
      host: '127.0.0.1',
      user: 'apptwo',
      password: '123456789',
      database: 'apptwo'
  }});
const bookshelf = require('bookshelf')(knex);
bookshelf.plugin(require('bookshelf-joi'), {
  joi: {  abortEarly: false},
});

//npm uninstall bookshelf-joi-validator
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
  idAttribute : 'officeCodeid',
  emp() {
    return this.hasMany('Emp','officeCode','officeCodeid')
  }
});



let Customer = bookshelf.model('Customer', {
  tableName: 'customers',
  idAttribute : 'customerNumber',
  emp() {
    return this.belongsTo('Emp','salesRepEmployeeNumber','employeeNumber')
  }
});




module.exports = bookshelf.model('Author', {
  tableName: 'authors',


  book() {
    return this.hasMany('Book')
  },


  buildValidation(model, attrs, options) {
    return {
      authorName: Joi.string().required(),
      email:Joi.string().required(),
      password: Joi.string().optional(),
    };
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
router.get('/', async function(req, res, next) {



  try {
    let authodData = {
      authorName: '',
      email:'',
      password:'arshiya@12'
    }
    var AuthorModal = await Author.forge(authodData).save().then();
   } catch (error) {
     res.json(error.details)

  }


  //res.send("working with bookshelf ");
});




router.get('/connection-test', function(req, res, next) {
  connection.query('Select 1+1 as result', function (err, result) {  
    if (err) {
      res.send("Data base not connected: ");
    };  
   
    res.send("Data base  connected: OK") 
  });  
});





router.get('/gen-pdf', function(req, res, next) {
  const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in suscipit purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus nec hendrerit felis. Morbi aliquam facilisis risus eu lacinia. Sed eu leo in turpis fringilla hendrerit. Ut nec accumsan nisl. Suspendisse rhoncus nisl posuere tortor tempus et dapibus elit porta. Cras leo neque, elementum a rhoncus ut, vestibulum non nibh. Phasellus pretium justo turpis. Etiam vulputate, odio vitae tincidunt ultricies, eros odio dapibus nisi, ut tincidunt lacus arcu eu elit. Aenean velit erat, vehicula eget lacinia ut, dignissim non tellus. Aliquam nec lacus mi, sed vestibulum nunc. Suspendisse potenti. Curabitur vitae sem turpis. Vestibulum sed neque eget dolor dapibus porttitor at sit amet sem. Fusce a turpis lorem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;';



  //var myDoc = new PDFDocument({bufferPages: true,userPassword :'123456'});
  var myDoc = new PDFDocument({bufferPages: true});
  let buffers = [];
  myDoc.on('data', buffers.push.bind(buffers));
  myDoc.on('end', () => {
      let pdfData = Buffer.concat(buffers);
      res.writeHead(200, {
      'Content-Length': Buffer.byteLength(pdfData),
      'Content-Type': 'application/pdf',
      'Content-disposition': 'attachment;filename=test.pdf',})
      .end(pdfData);
  });

  myDoc.font('Times-Roman')
  .fontSize(12)
  .text(`this is a test text`);
  myDoc.text('Hello world!', 100, 100)
  myDoc.moveTo(0, 20)                               // set the current point
   .lineTo(100, 160)                            // draw a line
   .quadraticCurveTo(130, 200, 150, 120)        // draw a quadratic curve
   .bezierCurveTo(190, -40, 200, 200, 300, 150) // draw a bezier curve
   .lineTo(400, 90)                             // draw another line
   .stroke();   

   myDoc.text(lorem, {
    columns: 3,
    columnGap: 15,
    height: 100,
    width: 465,
    align: 'justify'
  });
  
  myDoc.image('D:/_teachingBox/arshiya/KPVK/app_two/docs/bookschema.png', 10, 200, {fit: [600, 300]})
   
  myDoc.end();


});


module.exports = router;

