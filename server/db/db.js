var mysql = require('mysql');
var config = require('../dbconfig');
var connection = mysql.createConnection(config);

connection.connect();

module.exports = connection; 