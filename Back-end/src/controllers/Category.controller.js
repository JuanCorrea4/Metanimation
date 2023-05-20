const conexion = require('../config/mysql.config')

const GetCategoryAll = (req,res)=>{
    try {
        let sql = 'select * from category'
        conexion.query(sql,(err,rows,fields)=>{
            if(err)throw err
            else{
                res.status(200).json(rows)
            }
        })

    } catch (error) {
        return res.status(500).json({error})
    }
}

const GetCagoryId = (req,res)=>{
    try {
        let sql = `select * from category where Id_Category = ${req.params.id}`
        conexion.query(sql,(err,rows,fields)=>{
            if(err)throw err
            else{
                res.status(200).json(rows)
            }
        })
    } catch (error) {
        
    }
}

const AddCategory = (req,res) =>{
    try {
        const {Name,Description} = req.body
        let sql = `call CreateCategory(?,?)`

        conexion.query(sql,[Name,Description],(err,rows,fields)=>{
            console.log(rows);
            if(err)throw err;
            else{
                res.status(200).json({message:"Categoria Creada"})
            }
        })

    } catch (error) {
        return res.status(500).json({error})
    }
}


module.exports = {
    AddCategory,
    GetCategoryAll,
    GetCagoryId
}