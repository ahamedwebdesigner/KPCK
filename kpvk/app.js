var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const session = require('express-session');
var bodyParser = require('body-parser')
var MySQLStore = require('express-mysql-session')(session);

var logger = require('morgan');

var config = require('./config.json');
global.config = config;

const { host, port, user, password, database } = config.database_test;

var options ={
  host     : host,
  user     : user,
  password : password,
  database : database
};


var mysql      = require('mysql');
var connection = mysql.createConnection(options);
connection.connect();
global.db = connection;

var sessionStore = new MySQLStore(options);



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 



// app.use(session({
//   'secret': '343ji43j4n3jn4jk3n'
// }));

app.use(session({
	key: 'KPVK_SID',
	secret: 'session_cookie_secret',
	store: sessionStore,
	resave: false,
	saveUninitialized: false
}));


app.use(express.static(path.join(__dirname, 'public')));






app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
