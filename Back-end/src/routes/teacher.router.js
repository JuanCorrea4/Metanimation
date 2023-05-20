const Router = require('express').Router();
const TeacCtrl = require('../controllers/Teacher.controller')
const {verifyTokenAdministrador,verifyTokenEmail}=require('../middlewares/Teacher.auth')
const TeacherValidator = require('../validators/Teacher.validators')
const UserAuth=require('../middlewares/Users.auth')

Router.get('/',TeacCtrl.GetAllTeacher)
Router.get('/:id',TeacCtrl.GetIdTeacher)
Router.post('/Add',TeacherValidator.AddTeacher,TeacCtrl.AddTeacher)
Router.put('/Update/:id',UserAuth.verifyTokenEmail,TeacherValidator.UpdateTeacher,TeacCtrl.UpdateTeacher)
Router.delete('/Delete/:id',UserAuth.verifyTokenEmail,TeacCtrl.DeleteTeacher)
Router.put('/Update/Admin/:id',UserAuth.verifyTokenAdministrador,TeacherValidator.UpdateTeacher,TeacCtrl.UpdateTeacher)
Router.delete('/Delete/Admin/:id',UserAuth.verifyTokenAdministrador,TeacCtrl.DeleteTeacher)

module.exports = Router