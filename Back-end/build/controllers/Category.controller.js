"use strict";

var conexion = require('../config/conexion');
var GetCategoryAll = function GetCategoryAll(req, res) {
  try {
    var sql = 'select * from category';
    conexion.query(sql, function (err, rows, fields) {
      if (err) throw err;else {
        res.status(200).json(rows);
      }
    });
  } catch (error) {
    return res.status(500).json({
      error: error
    });
  }
};
var GetCagoryId = function GetCagoryId(req, res) {
  try {
    var sql = "select * from category where Id_Category = ".concat(req.params.id);
    conexion.query(sql, function (err, rows, fields) {
      if (err) throw err;else {
        res.status(200).json(rows);
      }
    });
  } catch (error) {}
};
var AddCategory = function AddCategory(req, res) {
  try {
    var _req$body = req.body,
      Name = _req$body.Name,
      Description = _req$body.Description;
    var sql = "call CreateCategory(?,?)";
    conexion.query(sql, [Name, Description], function (err, rows, fields) {
      console.log(rows);
      if (err) throw err;else {
        res.status(200).json({
          message: "Categoria Creada"
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      error: error
    });
  }
};
module.exports = {
  AddCategory: AddCategory,
  GetCategoryAll: GetCategoryAll,
  GetCagoryId: GetCagoryId
};