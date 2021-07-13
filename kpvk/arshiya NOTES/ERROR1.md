// Express v4.16.0 and higher
// --------------------------
const express = require('express');

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// For Express version less than 4.16.0
// ------------------------------------
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));