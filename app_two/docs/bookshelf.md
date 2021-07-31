# create documnet

 let mustaqData = {
    authorName: 'mystaq Ahamed',
    email:'mustaq@gmail.com',
    password:'arshiya@12'
  }

  var AuthorModal = Author.forge(mustaqData).save().then(
    function(savedModel) {
      console.log(savedModel);
    }).catch(function (error) {
			  console.log(error);
	 });



# added books to table

  var bookModel = Book.forge({title:'html 360',description:"comprehensive spring",author_id:2}).save()
  .then(function(savedModel) {
    console.log("==========================#bookshelf======================");
    console.log(savedModel.toJSON());
    console.log("==========================#bookshelf======================");
  
  }).catch(function (error) {
    console.log("==========================#error======================");
    console.log(error);
    console.log("==========================#error======================");
  });



    var bookModel = Book.forge({title:'html 360',description:"comprehensive spring",author_id:2})
                      .save()
                      .then(function(savedModel) {console.log(savedModel.toJSON())})
                      .catch(function (error) { console.log(error)});


# updating data 


  var bookModel = Book.forge({id:3})
                      .fetch()
                      .then((dbModel) =>{
                        dbModel.save(
                          {description:'comprehensive HTML'},
                          {patch: true, method: 'update'}
                        ).then(savedModle=> console.log(savedModle.toJSON()))
                       })
                      .catch(function (error) { console.log(error)});
# storing both pk and fk record


    Author.forge(formData)
    .save()
    .then((savedAuthor) =>{
              Book.forge({
                  title:'How to win in 10 minits',
                  description:"winning boxing match",
                  author_id:savedAuthor.get('id')})
              .save()
              .then(function(savedModel) {console.log(savedModel.toJSON())})
              .catch(function (error) { console.log(error)});
          })
    .catch(function (error) {
              console.log(error);
    });


# creating Forign key table record
    Author.forge({id:3})
    .fetch()
    .then((savedAuthor) =>{
              Book.forge({
                  title:'PVKK MBA guide',
                  description:"comprehensive spring",
                  author_id:savedAuthor.get('id')})
              .save()
              .then(function(savedModel) {console.log(savedModel.toJSON())})
              .catch(function (error) { console.log(error)});
          })
    .catch(function (error) {
              console.log(error);
    });

# creating Forign key table record

  // Author.forge({id:1})
  //     .fetch({ withRelated:['book']})
  //     .then((data)=>{
  //         console.log(data.get('authorName'));
  //         console.log(JSON.stringify(data));
         
  //       })
  //       .catch(function (error) {
  //         console.log(error);
         
  //       });




  
# fetching author(pk) along with book (fk)
Author.forge({id:1})
      .fetch({ withRelated:['book']})
      .then((data)=>{
          console.log(data.get('authorName'));
          console.log(JSON.stringify(data));
         })
      .catch(function (error) {
        console.log(error);
      });
Note: withrelated give modal name in small letters

# fetching book (fk) along with author(pk) 
  Book.forge({id:1})
      .fetch({ withRelated:['author']})
      .then((data)=>{console.log(JSON.stringify(data)) })
      .catch(function (error) { console.log(error) });


  