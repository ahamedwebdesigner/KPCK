# events

 knex.on( 'query', function( queryData ) {
  console.log( "--------------Query data--------------------" );
  console.log( queryData.sql);
  console.log( "----------------------------------------" );
});

# count


// try {
//   let author = await new Author({authorName:'mustaq',email:'mustaq@gmail.com',password:"123456"}).save();
//   console.log(author.toJSON())
// } catch (error) {
//     console.log("ERROR:"+error)
// }


  try {
    let  allGere = await Book.count();
    // allGere.forEach(e=>console.log(e.toJSON()))
    console.log(allGere);
  } catch (error) {
    
  }



# sectsion 2:
# create table to work  with models

<pre>
  use apptwo;

  
  CREATE TABLE`genre` (
	`id`  INT NOT NULL AUTO_INCREMENT,
    `category` VARCHAR( 20 )  ,
    `description` TEXT  ,
    PRIMARY KEY ( `id` )
 )  ENGINE=INNODB;
insert  into `genre`(`id`,`category`,`description`) values 
('1','basic','This book is for advance learner'),
('2','intermediat','for intermediat ');


CREATE TABLE`ebook` (
	`id`  INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR( 20 )  ,
    `description` TEXT ,
     `genre_id`   INT NOT NULL,
         PRIMARY KEY ( `id` ),
		KEY `genre_id` (`genre_id`),
		CONSTRAINT `edition_ibfk_genere` FOREIGN KEY (`genre_id`) REFERENCES `genre`(`id`)
)  ENGINE=INNODB;
 
insert  into `ebook`(`id`,`title`,`description`,`genre_id`) values 
('1','working with java','Learn java programin',1),
('2','learn c++','programin in c++',1);


CREATE TABLE`editions` (
	`id`  INT NOT NULL AUTO_INCREMENT,
     `changes` TEXT  ,
   `ebook_id` INT NOT NULL ,
   PRIMARY KEY ( `id` ),
 	CONSTRAINT `edition_ibfk_user_two` FOREIGN KEY (`ebook_id`) REFERENCES `ebook`(`id`)
	
 )  ENGINE=INNODB;
 

insert  into `editions`(`id`,`changes`,`ebook_id`) values 
('1','added closers in to the book','1'),
('2','added mataprogramin in chapter two','1');

CREATE TABLE`chapters` (
	`id`  INT NOT NULL AUTO_INCREMENT,
	`details` TEXT  ,
   `ebook_id`  INT NOT NULL ,
    KEY `ebook_id` (`ebook_id`),
	CONSTRAINT `edition_ibfk_user_fke` FOREIGN KEY (`ebook_id`) REFERENCES `ebook` (`id`),
	PRIMARY KEY ( `id` )
 )  ENGINE=INNODB;
 
insert  into `chapters`(`id`,`details`,`ebook_id`) values 
('1','introduction to java','1'),
('2','about Jvm ','1'),
('3','what is c','2'),
('4','diferance between c and c++','2'),
('5','first c program','2'),
('6','control statements ','2');

</pre>




# working with multiple tables code


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
  