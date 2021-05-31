# working with mysql
Working with my SQL 

-   First we need my SQL web server installed in our system 
-   We need credentions for  remote server 

# Dependencies 

- Install MySQL dependencies for expressjs 
- There are two frameworks mysql and mysql2 
- Most of the time we are using mySQL2 to in production



# usage

    var options ={
    host     : '<<host>>',
    user     :"<<user>>" ,
    password :"<<password>>" ,
    database : "<<database>>"
    };


    var mysql      = require('mysql');
    var connection = mysql.createConnection(options);
    connection.connect();

# check the database connection successeful

    // db.query('SELECT 1 + 1 AS result', function (error, results, fields) {
    //   if (error) throw error;
    //   console.log(results[0].result);

# to make connecton object globally avalable
 global.db = connection;


 # examples


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

db.query(create_user_table_sql, function (err, result) {  
  if (err) throw err;  
        console.log("==========================#sql:query excuited======================");
        console.log(create_user_table_sql);
        console.log("==========================#sql:====================================");
});  


var drop_user_table_sql =`drop table IF  EXISTS user`;
db.query(drop_user_table_sql, function (err, result) {  
  if (err) throw err;  
      console.log("==========================#sql:query excuited======================");
      console.log(drop_user_table_sql);
      console.log("==========================#sql:query excuited======================");
});  

var insertinto_user_table_sql =`INSERT INTO user(user_name,user_password,mobile_number,gender,address,village,user_status,doj,NoOfCatels,NoOfLiters,UserType)VALUES ?`;

var insertinto_user_values=[
  ['admin','$2a$12$50.MTQBw3XtEaR/Rigb0/epgV0CL5GusRIuY/2HSsYBDFShmH7unS','9966244689','male','marrama temple street ','Kalyandurgam',true,'now()',5,50,'ADMIN'],
  ['PomAdmin','$2a$12$50.MTQBw3XtEaR/Rigb0/epgV0CL5GusRIuY/2HSsYBDFShmH7unS','9538666004','male','marrama temple street ','Kalyandurgam',true,'now()',10,100,'POM'],
]


db.query(insertinto_user_table_sql, [insertinto_user_values],function (err, result) {  
  if (err) throw err;  
        console.log("==========================#sql:query excuited======================");
        console.log("Number of records inserted: " + result.affectedRows);
        console.log("==========================#sql:====================================");
});  
  


 var sql ='INSERT INTO user (user_name,user_password,mobile_number,gender,address,village,user_status,doj,NoOfCatels,NoOfLiters,UserType) VALUES (?,?,?,?,?,?,?,?,?,?,?)';
var params =[req.body.user_name,hash_pass,req.body.mobile_number,req.body.gender,req.body.Address, req.body.village,1,'now()',req.body.NoOfCatels,req.body.NoOfLiters,req.body.UserType];

// db.query(sql, params,(err, result) =>{
//   if (err){
//     // res.status(400).json({"error": err.message})
//     res.send('Error occured : '+ err.message);
//     return;
//   }
//   res.send('user data submited with successefully');
//   });
// })





# selection data

    var sql = "select * from user where user_name = ?"
    let values =[req.body.user_name];

    db.query(sql,values, function (err, result) {  
        if (err) throw err;  
    }    
  
