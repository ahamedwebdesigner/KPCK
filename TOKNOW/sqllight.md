# requirement 
    npm install sqlite3;
    
# usage
    var sqlite3 = require('sqlite3').verbose();

# how  to work with db
    - db.sqlite is a database file name where the database is stored


# creating database
    
    let db = new sqlite3.Database('<<db.sqlite>>', (err) => {});

# creating tab
    - db.run is only way to excuite sql queries of all type

         db.run("<<create table sql query>>",(err)=>{});

    - for quering we have to use db.all 

            // db.all(sql, params, (err, rows) => {
            //     console.log(rows);
            // });

   #example:
            
            var sql = "select id,name from user where id!=?"; 
            var params = [2];

            // db.all(sql, params, (err, rows) => {
            //     console.log(rows);
            // });

## example 


let db = new sqlite3.Database('<<db.sqlite>>', (err) => {
    if (err) {
      console.error(err.message)
      throw err
    }else{
       
       // creating initial data to work with 
        db.run(`CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            email text UNIQUE, 
            password text, 
            CONSTRAINT email_unique UNIQUE (email)
            )`,
        (err) => {
            if (err) {
                // Table already created
                console.log('--      ----------->database created');
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'
                db.run(insert, ["admin","admin@example.com",md5("admin123456")])
                db.run(insert, ["user","user@example.com",md5("user123456")])
            }
        });  
    }
});


## exporting moduel 
module.exports = db

## importing module
var db = require("../DB.js")

## note:
javascript modules two types
    1) globally avalable : decalred as global module 

    2) modulerly avalable : exported in mlodule export


