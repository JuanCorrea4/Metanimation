const axios = require('axios')
const conexion = require('../config/mysql.config')
require('dotenv').config()

const GetNoticie =(req,res)=>{
    try {
        let SearchSql=`select * from Noticies`
        conexion.query(SearchSql,(err,rows,fields)=>{
            if(err) throw err;
            else{
                res.status(200).json(rows[0])
            }
        })
    } catch (error) {
        return res.status(500).json({error})
    }
}

const AddNoticie =(req,res)=>{
    try {
        const {Content,Fountain}= req.body;
        let AddNoticie = `insert into Noticies (Content,Fountain) values (?,?)`
        conexion.query(AddNoticie,[Content,Fountain],(err,rows,fields)=>{
            if(err)throw err;
            else{
                res.status(200).json(rows[0])
            }
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    GetNoticie,
    AddNoticie
}