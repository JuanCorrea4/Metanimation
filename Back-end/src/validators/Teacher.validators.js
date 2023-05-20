const Joi = require('joi')
//Experiencia,Estudio,PersonId
const AddTeacher=async(req,res,next)=>{
  try {
    
    const AddTeacherSchema = Joi.object({
      Experiencia:Joi.string().required(),
      Estudios:Joi.string().required(),
      PersonId:Joi.number().required()
    })

    await AddTeacherSchema.validateAsync(req.body)
    next()
  } catch (error) {
    return res.status(422).json({error})
  } 
}

const UpdateTeacher=async(req,res,next)=>{
  try {
    const UpdateTeacherSchema=Joi.object({
      Experiencia:Joi.string().required(),
      Estudio:Joi.string().required()
    })
    await UpdateTeacherSchema.validateAsync(req.body)
    next()
  } catch (error) {
    return res.status(422).json({error})
  }
}


module.exports={
  AddTeacher,
  UpdateTeacher
}