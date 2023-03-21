const express = require('express')
const bodyParser = require('body-parser')
const routs = require('../routes/routs')
const app = express()



// parsers
app.use(bodyParser.text())
app.use(bodyParser.json())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// api
app.use('/', routs)


module.exports = app