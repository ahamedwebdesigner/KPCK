var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');


router.get('/', function(req, res) {

    

  // create databases requered for running this application

  var create_user_table_sql = `
  CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
	  user_password VARCHAR(255) NOT NULL,
    mobile_number VARCHAR(255) NOT NULL,
    gender SET('male','female','other'),
    address VARCHAR(255) NOT NULL,
    village VARCHAR(255) NOT NULL,
    user_status BOOLEAN,
     doj DATETIME,
     NoOfCatels INT null,
     NoOfLiters INT null,
     
     UserType  VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
)  ENGINE=INNODB;`;

var drop_user_table_sql =`drop table IF  EXISTS user`;


var insertinto_user_table_sql =`INSERT INTO user(user_name,user_password,mobile_number,gender,address,village,user_status,doj,NoOfCatels,NoOfLiters,UserType)VALUES ?`;
var insertinto_user_values=[
  ['admin','$2a$12$50.MTQBw3XtEaR/Rigb0/epgV0CL5GusRIuY/2HSsYBDFShmH7unS','9966244689','male','marrama temple street ','Kalyandurgam',true,'now()',5,50,'ADMIN'],
  ['PomAdmin','$2a$12$50.MTQBw3XtEaR/Rigb0/epgV0CL5GusRIuY/2HSsYBDFShmH7unS','9538666004','male','marrama temple street ','Kalyandurgam',true,'now()',10,100,'POM'],
]



  
db.query(drop_user_table_sql, function (err, result) {  
  if (err) throw err;  
      console.log("==========================#sql:query excuited======================");
      console.log(drop_user_table_sql);
      console.log("==========================#sql:query excuited======================");
});  


db.query(create_user_table_sql, function (err, result) {  
  if (err) throw err;  
        console.log("==========================#sql:query excuited======================");
        console.log(create_user_table_sql);
        console.log("==========================#sql:====================================");
});  

db.query(insertinto_user_table_sql, [insertinto_user_values],function (err, result) {  
  if (err) throw err;  
        console.log("==========================#sql:query excuited======================");
        console.log("Number of records inserted: " + result.affectedRows);
        console.log("==========================#sql:====================================");
});  
  
    res.send("setup done !");

 });


module.exports = router;