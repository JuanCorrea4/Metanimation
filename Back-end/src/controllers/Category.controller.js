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

const GetCategoryName = (req,res)=>{
    try {
        let sql = `select * from category where NameCategory = '${req.params.name}'`
        conexion.query(sql,(err,rows,fields)=>{
            if(err)throw err;
            else{
                return res.status(200).json(rows)
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
        return res.status(500).json({error})
    }
}

const AddCategory = (req,res) =>{
    try {
        const {Name,Description} = req.body
        let sql = `call CreateCategory(?,?)`
        let SearchNamesql = `select NameCategory from Category where NameCategory = '${Name}'`
        conexion.query(SearchNamesql,(err,rows,fields)=>{
            let FoundCategory = rows
            if(err) throw err;
            for(let i=0; i<=rows.length; i++){
                if(!FoundCategory[i]){
                    conexion.query(sql,[Name,Description],(err,rows,fields)=>{
                        if(err)throw err;
                        else{
                            res.status(200).json({message:"Categoria Creada"})
                        }
                    })
                }
                else if(FoundCategory[i].NameCategory==Name){
                    return res.status(409).json({message:'Esta categoria ya se existe'})
                }
            }
        })
    } catch (error) {
        return res.status(500).json({error})
    }
}

const updateCategory = (req,res)=>{
    try {
        const {id} = req.params;
        const {}= req.body;
    } catch (error) {
        return res.status(500).json(error)
    }
}


module.exports = {
    AddCategory,
    GetCategoryAll,
    GetCagoryId,
    GetCategoryName
}