const Jwt = require('jsonwebtoken');
const conexion = require('../config/mysql.config')
require('dotenv').config();

const verifyTokenEmailModifyCouser = async (req,res,next)=>{
  try {
    
    const token = req.headers['x-access-token'];
    
    if(!token) return res.status(401).json({message:'No token provided'})

    const decode = Jwt.verify(token,process.env.SecretJWT)

    if(decode.Rol=='Profesor'){
      
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({message:"Unathorized"})
  }
}

module.exports={
  verifyTokenEmailModifyCouser
}