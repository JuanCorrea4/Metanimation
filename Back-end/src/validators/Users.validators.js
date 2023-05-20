const Joi = require('joi')

const SignUpValidate=async(req,res,next)=>{
  try {
    const SignUpSchema = Joi.object({
      Cedula:Joi.string().min(10).max(10).required(),
      Nombre:Joi.string().min(2).max(50).required(),
      Apellido:Joi.string().min(2).max(50).required(),
      Celular:Joi.number().min(8).required(),
      Email:Joi.string().lowercase().email().required(),
      Password:Joi.string().min(8).required(),
      Rol:Joi.string().min(2),
      RolAd:Joi.string()
    })
    await SignUpSchema.validateAsync(req.body)

    next()
  } catch (error) {
    return res.status(422).json({error})
  } 
}

const SigninValidate=async(req,res,next)=>{
  try {
    const SignInSchema = Joi.object({
      email:Joi.string().lowercase().email().required(),
      Password:Joi.string().min(8).required()
    })

    await SignInSchema.validateAsync(req.body)
    next()
  } catch (error) {
    return res.status(422).json({error})
  }
}
const ModifyPasswordValidate=async(req,res,next)=>{
  try {
    ModifyPasswordSchema= Joi.object({
      Password:Joi.string().min(8).required(),
      NewPassword:Joi.string().min(8).required()
    })

    await ModifyPasswordSchema.validateAsync(req.body)
    next()
  } catch (error) {
    return res.status(422).json({error})
  }

}
const ModifyUserValidate=async(req,res,next)=>{
try {
  ModifyUserSchema =Joi.object({
    Name:Joi.string().min(2).max(50).required(),
    lastname:Joi.string().min(2).max(50).required(),
    phone:Joi.number().min(8).required(),
    email:Joi.string().lowercase().email().required(),
    Password:Joi.string().min(8).required(),
    Rol:Joi.string().min(2)
  })

  await ModifyUserSchema.validateAsync(req.body)
  next()
} catch(error) {
    return res.status(422).json({error})
}
}

module.exports = {
  SignUpValidate,
  SigninValidate,
  ModifyPasswordValidate,
  ModifyUserValidate
}