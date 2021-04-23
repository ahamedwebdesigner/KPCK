memory, not meant for production
a database like MySQL or Mongo
a memory cache like Redis or Memcached

# Example 1:
-------------
npm install --save express-session
var session = require('express-session');
app.use(session({secret: "Shh, its a secret!"}));


if(req.session.page_views){
      req.session.page_views++;
      res.send("You visited this page " + req.session.page_views + " times");
   } else {
      req.session.page_views = 1;
      res.send("Welcome to this page for the first time!");
   }



# Example 1:
-------------
const express = require('express')
const session = require('express-session')

const app = express()
app.use(session({
  'secret': '343ji43j4n3jn4jk3n'
}))


# Example 2:
-------------

req.session.name = 'Flavio'
console.log(req.session.name) // 'Flavio'



//ORM
----------
///https://sequelize.org/
