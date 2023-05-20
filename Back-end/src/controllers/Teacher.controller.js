const conexion = require('../config/mysql.config')

const GetAllTeacher = (req,res)=>{
    try {
        let sql = `call GetTeacherAll()`
        conexion.query(sql,(err,rows,fields)=>{
            if(err) throw err
            else {
                res.status(200).json(rows[0])
            }
        })
    } catch (error) {
        return res.status(500).json({error})
    }
}   

const GetIdTeacher = (req,res)=>{
    try {
        const id = req.params.id
        let sql = `call GetTeacherId(?)`
        conexion.query(sql,[id],(err,rows,fields)=>{
            if(err) throw err
            else {
                res.status(200).json(rows[0])
            }
        })
    } catch (error) {
        return res.status(500).json({error})
    }
}

const AddTeacher = (req,res)=>{
    try {
        const {Experiencia,Estudios,PersonId} = req.body
        let sql = `call AddTeacher(?,?,?)`
        conexion.query(sql,[PersonId,Experiencia,Estudios],(err,rows,fields)=>{
            if(err)throw err
            else{
                res.status(200).json(rows)
            }
        })
    } catch (error) {
        return res.status(500).json({error})
    }
}

const UpdateTeacher = (req,res)=>{
    try {
        const {id} = req.params
        const {Experiencia,Estudio} = req.body
        console.log(Experiencia,Estudio,id);
        let sql = `call UpdateTeacher(${id},${Experiencia},'${Estudio}')`
        conexion.query(sql,(err,rows,fields)=>{
            if(err)throw err
            else{
                res.status(200).json({Message:"Success Update Teacher"})
            }
        })
    } catch (error) {
        return res.status(500).json({error})
    }
}

const DeleteTeacher = (req,res)=>{
    try {
        const {id} = req.params
        let sql = `call DeleteTeacher('${id}')`
        conexion.query(sql,(err,rows,fields)=>{
            if(err)throw err
            else{
                res.status(200).json({Message:"Success Delete Teacher"})
            }
        })
    } catch (error) {
        
    }
}

module.exports={
    GetAllTeacher,
    AddTeacher,
    GetIdTeacher,
    UpdateTeacher,
    DeleteTeacher
}