# CREATE DATABASE <name>;

/*
RDBMS: relational database management system

DDL  - 
DQL
DML
TCL - transaction control language



*/

# all the tables 
show databases;

#create database learningSQL;
create database if not exists learningSQL;

use learningSQL;

show tables;


drop table if exists  users;
# create table
#@ CREATE TABLE if not exists users(
#CREATE TABLE users(
CREATE TABLE if not exists users(
   id INT AUTO_INCREMENT,
   first_name VARCHAR(100),
   last_name VARCHAR(100),
   email VARCHAR(50) unique,
   password VARCHAR(20),
   location VARCHAR(100) ,
   dept VARCHAR(100),
   is_admin TINYINT(1),
   register_date DATETIME,
   PRIMARY KEY(id)
);



INSERT INTO users 
			(first_name,last_name,  email,   password, location,  dept,  is_admin, register_date)
				values
            ('shaik', 'Arshiya', 'arshiya@gmail.com', '32563256',"Kamalanagar", 'Meanstack', 0, now()),
			('shaik', 'Shabana', 'shabana@pvkk.com', '899890934',"Ashoke Nagar", 'Mba', 1, now()),
			('syed', 'Mustaq', 'syed@amazon.com', '123456789',"Anantapur", 'development', 1, now()),
			('sheerun', 'banu', 'sheerun@amd.com', '124568215',"Marathalli", 'development', 1, now());


SELECT * FROM learningsql.users;
SELECT first_name, last_name ,email FROM users;
SELECT * FROM users WHERE location='Kamalanagar';
SELECT * FROM users WHERE id =2;
SELECT * FROM users WHERE is_admin = 1;
SELECT * FROM users WHERE is_admin <> 1;
SELECT * FROM users WHERE is_admin < 1;

SELECT * FROM users WHERE location like 'Kamal%';  #--% ,%-- %--%
SELECT * FROM users WHERE location like '%apur'; 
SELECT * FROM users WHERE location like '%ratha%'; 

SELECT * FROM users WHERE location NOT LIKE '%ratha%'; 



INSERT INTO users 
			(first_name,last_name,  email,   password, location,  dept,  is_admin, register_date)
				values
            ('tim', 'blis', 'blis@gmail.com', '213213225',"rayadurg", 'ssc', 0, now()),
			('tom', 'blake', 'blake@pvkk.com', '32135421',"Dharmavaram", 'Btec', 1, now());



SELECT 
    first_name, 
    last_name, 
    email
FROM
    users
WHERE
    first_name LIKE 'T_m';
    
    
SELECT 
    first_name, 
    last_name, 
    email
FROM
    users
WHERE
		location = 'rayadurg' 
     AND 
		password = '213213225';
     
     
SELECT 
	id,
    first_name, 
    last_name, 
    email
FROM
    users
WHERE
		location = 'rayadurg' 
	OR 
		location = 'Dharmavaram'
#ORDER BY id desc ;
ORDER BY id asc ;


