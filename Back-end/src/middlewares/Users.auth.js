const Jwt = require('jsonwebtoken');
const conexion = require('../config/mysql.config')
require('dotenv').config();

const verifyTokenEmail = async (req,res,next)=>{
  try {
    
    const token = req.headers['x-access-token'];
    const tokenRol = req.headers['x-access-token-rol']
    
    if(!token) return res.status(401).json({message: 'No token provided'})

    const decode = Jwt.verify(token,process.env.SecretJWT)

    let sql2 = `select Email from person where id = ${req.params.id}`

    let sqlEmail = `select email from person where email = ?`

    let FoundEmail = conexion.query(sql2,[decode.email],(err,rows)=>{

      const validateEmail = conexion.query(sqlEmail,[decode.email])

      if(validateEmail.values[0]!=FoundEmail.values[0]){

        return res.status(401).json({message:"Email validation failed"})

      }
        return next()
    })
    
  } catch (error) {
    console.log(error);
    return res.status(400).json({message:"Unathorized"})
  }
}

const verifyTokenPassword = async (req,res,next)=>{
  try {
    
    const token = req.headers['x-access-token'];
    
    if(!token) return res.status(401).json({message: 'No token provided'})

    const decode = Jwt.verify(token,process.env.SecretJWT)

    let sql2 = `select email from person where id = ${req.params.id}`

    let sqlEmail = `select email from person where email = ?`

    await conexion.query(sql2,[decode.email],async (err,rows)=>{
      
      const validateEmail = await conexion.query(sqlEmail,[decode.email])

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

/*Perfil: Compañia, portafolio, Roles Membresia*/ 

const verifyTokenAdministrador = async (req,res,next)=>{
  try {

    const tokenRol = req.headers['x-access-token']
    
    if(!tokenRol) return res.status(401).json({message: 'No token provided'})

    const decode = Jwt.verify(tokenRol,process.env.SecretJWT)
    
    if(decode.RolAd=='Administrador'){
      console.log('Administrador');
      next()
    }else if(decode.RolAd=='Moderator'){
      console.log('Moderator');
      next()
    }
    else{
      return res.status(401).json({message:"Unathorized User"})
    }
  } catch (error) {
    return res.status(401).json({message:"Unathorized"})
  }
}

module.exports={
  verifyTokenEmail,
  verifyTokenPassword,
  verifyTokenAdministrador
}