const Jwt = require('jsonwebtoken');
const conexion = require('../config/mysql.config')
require('dotenv').config();

const verifyTokenEmailCompany = async (req,res,next)=>{
  try {
    
    const token = req.headers['x-access-token'];
    
    if(!token) return res.status(401).json({message: 'No token provided'})

    const decode = Jwt.verify(token,process.env.SecretJWT)

    let sql2 = `select EmailCompany from Company where Id_Company = ${req.params.id}`

    let sqlEmail = `select EmailCompany from Company where EmailCompany = ?`

    let FoundEmail = await conexion.query(sql2,[decode.EmailCompany],async (err,rows)=>{
      
      const validateEmail = await conexion.query(sqlEmail,[decode.EmailCompany])

      if(validateEmail.values!=rows[0].EmailCompany){
  
        return res.status(401).json({message:"Email validation failed"})
  
      }
      else{
        next()
      }
    })
    
  } catch (error) {
    return res.status(400).json({message:"Unathorized"})
  }
}

const verifyTokenPasswordCompany = async (req,res,next)=>{
  try {
    
    const token = req.headers['x-access-token'];
    
    if(!token) return res.status(401).json({message: 'No token provided'})

    const decode = Jwt.verify(token,process.env.SecretJWT)

    let sql2 = `select EmailCompany from Company where Id_Company = ${req.params.id}`

    let sqlEmail = `select EmailCompany from Company where EmailCompany = ?`

    let FoundEmail = await conexion.query(sql2,[decode.EmailCompany],async (err,rows)=>{
      
      const validateEmail = await conexion.query(sqlEmail,[decode.EmailCompany])

      if(validateEmail.values!=rows[0].email){
  
        return res.status(401).json({message:"Profile validation failed"})
  
      }
      else{
        next()
      }
    })
    
  } catch (error) {
    return res.status(400).json({message:"Unathorized"})
  }
}



module.exports={
  verifyTokenEmailCompany,
  verifyTokenPasswordCompany
}