const Joi = require('joi');

const AddCourse=async(req,res,next)=>{
  try {
    const AddCourseSchema = Joi.object({
      NameCourse:Joi.string().min(2).max(255).required(),
      DescriptionCurso:Joi.string().max(255).required(),
      Duration:Joi.number().min(1).max(4).required(),
      IdTeacher:Joi.number().min(9).required(),
      Lenguaje:Joi.string().min(1).required(),
      Url:Joi.string().max(2000).required(),
      NameCategory:Joi.string().min(4).required()
    })
    await AddCourseSchema.validateAsync(req.body)
    next()
  } catch (error) {
    return res.status(422).json({error})
  } 
  
}

module.exports ={
  AddCourse
}