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


let Genre = bookshelf.model('Genre', {
  tableName: 'genre',
  ebook() {
    return this.hasMany('Ebook');
  }
});


let Edition = bookshelf.model('Edition', {
  tableName: 'editions',
  ebook: function() {
    return this.belongsTo('Ebook'); 
  }
});

let Chapter = bookshelf.model('Chapter', {
  tableName: 'chapters',
  ebook: function() {
    return this.belongsTo('Ebook');
  }
});

let Ebook = bookshelf.model('Ebook', {
  tableName: 'ebook',
   editions: function() {
    return this.hasMany('Edition');
  },
  chapters: function() {
    return this.hasMany('Chapter');
  },
  genre: function() {
    return this.belongsTo('Genre');
  }
});

// restricted data usage create new model with hidden filds
let Ebookmobi = bookshelf.model('Ebookmobi', {
  tableName: 'ebook',
  hidden: ['genre_id'],
  //visible: ['title:', 'description:'],
  editions: function() {
    return this.hasMany('Edition');
  },
  chapters: function() {
    return this.hasMany('Chapter');
  },
  genre: function() {
    return this.belongsTo('Genre');
  }
});

  
/* GET home page. */
router.get('/', async function(req, res, next) {
 
  // all generous
  /* 
  try {
    let  allGere = await Genre.fetchAll({debug:true,require: true});  //debug=false
   // console.log(allGere);//CollectionBase
    // allGere.forEach(e=>console.log(e));//ModelBase
    allGere.forEach(e=>console.log(e.toJSON()))
  } catch (error) {
    
  }
 */

 /*
//2) fetching single record  
try {
  let ebook1 = await Ebook.where({id: 1}).fetch();
  console.log(ebook1.toJSON());
} catch (error) {
  
}
*/
/*
//3)

  try {
    let ebook1 = await new Ebookmobi({id:2}).fetch({withRelated: ['genre']} );
    console.log(ebook1.toJSON());
  } catch (error) {
    console.log(error);
  }
*/
/*
//4) fetching data form three tables
try {
  let ebook1 = await new Ebookmobi({id:2}).fetch({withRelated: ['genre','editions','chapters']} );
  console.log(ebook1.toJSON());
} catch (error) {
  console.log(error);
}
  
  res.render('index', { title: 'Express' });
});
*/



try {
  let ebook1 = await new Ebookmobi({id:1})
                    .fetch({
                      withRelated: ['genre',
                      { editions: (query)=>query.orderBy('id','DESC')},
                      { chapters: (query)=>query.orderBy('id','DESC')}
                    ]
                    } );
  console.log(ebook1.toJSON());
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


