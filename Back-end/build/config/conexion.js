"use strict";

var mysql = require('mysql');
require('dotenv').config();
var conexion = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'MetAnimation'
});
conexion.connect(function (err) {
  if (err) {
    console.log('Ha ocurrido un error' + err);
  } else {
    console.log('La base de datos se conecto');
  }
});
module.exports = conexion;