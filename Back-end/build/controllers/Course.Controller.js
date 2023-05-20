"use strict";

var conexion = require('../config/conexion');
var GetCourseAll = function GetCourseAll(req, res) {
  try {
    var sql = "call GetAllCourse();";
    conexion.query(sql, function (err, rows, fields) {
      if (err) throw err;else {
        res.json(rows[0]);
      }
    });
  } catch (error) {
    return res.status(500).json({
      error: error
    });
  }
};
var GetCourseElement = function GetCourseElement(req, res) {
  try {
    var id = req.params.id.id;
    var sql = "call GetCourseElement(?);";
    conexion.query(sql, [id], function (err, rows, fields) {
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
var AddCourse = function AddCourse(req, res) {
  try {
    var _req$body = req.body,
      NameCourse = _req$body.NameCourse,
      DescriptionCurso = _req$body.DescriptionCurso,
      Duration = _req$body.Duration,
      IdTeacher = _req$body.IdTeacher,
      Lenguaje = _req$body.Lenguaje,
      Url = _req$body.Url,
      NameCategory = _req$body.NameCategory;
    var sql = "call CreateCourse('".concat(NameCourse, "','").concat(DescriptionCurso, "','").concat(Duration, "','").concat(IdTeacher, "','").concat(Lenguaje, "','").concat(Url, "','").concat(NameCategory, "')");
    conexion.query(sql, function (err, rows, fields) {
      if (err) throw err;else {
        return res.status(200).json({
          message: "Curso creado perfectamente"
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      error: error
    });
  }
};
var UpdateCourse = function UpdateCourse(req, res) {
  try {
    var id = req.params.id;
    var _req$body2 = req.body,
      NameCourse = _req$body2.NameCourse,
      DescriptionCurso = _req$body2.DescriptionCurso,
      Duration = _req$body2.Duration,
      IdTeacher = _req$body2.IdTeacher,
      Lenguaje = _req$body2.Lenguaje,
      Url = _req$body2.Url,
      NameCategory = _req$body2.NameCategory;
    var SearchCourseId = "select * from  AllCourse where Id=".concat(id);
    conexion.query(SearchCourseId, function (err, rows, fields) {
      if (err) throw err;else {
        res.status(200).json(rows[0]);
      }
    });
  } catch (error) {}
};
module.exports = {
  GetCourseAll: GetCourseAll,
  GetCourseElement: GetCourseElement,
  AddCourse: AddCourse,
  UpdateCourse: UpdateCourse
};