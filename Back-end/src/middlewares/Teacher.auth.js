const Jwt = require('jsonwebtoken');
const conexion = require('../config/mysql.config')
require('dotenv').config();

const verifyTokenEmail = async (req,res,next)=>{
  try {
    // Peticion del token y se guarda el token una constante
    const token = req.headers['x-access-token'];
    if(!token) return res.status(401).json({message: 'No token provided'})
    const decode = Jwt.verify(token,process.env.SecretJWT)
    //Cadena sql para encontrar el correo en el token
    let sql2 = `select Person.Email from Teacher inner join Person where Teacher.Id_Teacher = ${req.params.id}`
    let sqlEmail = `select Person.Email,Teacher.Id_Teacher from Teacher inner join person where Person.email = ?`
    
    // Se encuentra el correo y lo almacena en una variable temporal
    let FoundEmail = conexion.query(sql2,[decode.email],(err,rows)=>{
      //validacion del correo 
      const validateEmail = conexion.query(sqlEmail,[decode.email])

      if(validateEmail.values[0]!=FoundEmail.values[0]){
        // Return si el correo no es valido
        return res.status(401).json({message:"Email validation failed"})

      }
        // si no hay error, se le permite proceder 
        return next()
    })
    
  } catch (error) {
    console.log(error);
    return res.status(400).json({message:"Unathorized"})
  }
}

const verifyTokenAdministrador = async (req,res,next)=>{
  try {
    // validacion del token 
    const tokenRol = req.headers['x-access-token']
    
    if(!tokenRol) return res.status(401).json({message: 'No token provided'})
    // se almacena el token verificado en una constante
    const decode = Jwt.verify(tokenRol,process.env.SecretJWT)
    // se verifica que se un rol administrativo para seguir
    if(decode.RolAd=='Administrador'){
      console.log('Administrador');
      next()
    }else if(decode.RolAd=='Moderator'){
      console.log('Moderator');
      next()
    }
    else{
      // si no es un rol administrativo se le cancela el acceso
      return res.status(401).json({message:"Unathorized User"})
    }
  } catch (error) {
    return res.status(401).json({message:"Unathorized"})
  }
}

//Exportacion de las funciones de verificacion
module.exports={
  verifyTokenEmail,
  verifyTokenAdministrador
}