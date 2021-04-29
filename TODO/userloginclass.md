1) understanding about bccript 
2) what is middle ware and how it is used


crate file database.js
--------------------------------------

const mysql = require('mysql2');
const dbConnection = mysql.createPool({
    host     : 'localhost', // MYSQL HOST NAME
    user     : 'root',        // MYSQL USERNAME
    password : '',    // MYSQL PASSWORD
    database : 'nodejs_login'      // MYSQL DB NAME
}).promise();
module.exports = dbConnection;

requred libraries
---------------------------------------------
const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const bcrypt = require('bcryptjs');
const dbConnection = require('./database');
const { body, validationResult } = require('express-validator');



https://github.com/chandantudu/nodejs-login-registration/blob/master/index.js