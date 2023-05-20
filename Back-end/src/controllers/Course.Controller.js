const conexion = require('../config/mysql.config')


const GetCourseAll = (req,res) =>{
    try {
        let sql = `call GetAllCourse();`
        conexion.query(sql, (err, rows, fields) => {
            if (err)
              throw err;
            else {
              res.json(rows[0]);
            }
          });
    } catch (error) {
        return res.status(500).json({error});
    }
}

const GetCourseElement = (req,res)=>{
    try {
        const {id} = req.params.id
        let sql = `call GetCourseElement(?);`
        conexion.query(sql,[id], (err, rows, fields) => {
            if (err)
              throw err;
            else {
              res.status(200).json(rows);
            }
          });
    } catch (error) {
        return res.status(500).json({error});
    }
}

const AddCourse=(req,res)=>{
    try {
        const {NameCourse,DescriptionCurso,Duration,IdTeacher,Lenguaje,Url,NameCategory} =req.body
        let sql = `call CreateCourse('${NameCourse}','${DescriptionCurso}','${Duration}','${IdTeacher}','${Lenguaje}','${Url}','${NameCategory}')`
        conexion.query(sql,(err,rows,fields)=>{
          if(err) throw err
          else{
            return res.status(200).json({message:"Curso creado perfectamente"})
          }
        })
    } catch (error) {
        return res.status(500).json({error});
    }
}

const UpdateCourse=(req,res)=>{
  try {
    const {id} = req.params
    const {NameCourse,DescriptionCurso,Duration,IdTeacher,Lenguaje,Url,NameCategory} =req.body
    let SearchCourseId=`select * from  AllCourse where Id=${id}`
    conexion.query(SearchCourseId,(err,rows,fields)=>{
      if(err)throw err;
      else{
        res.status(200).json(rows[0])
      }
    })
  } catch (error) {
    
  }
}

module.exports ={
    GetCourseAll,
    GetCourseElement,
    AddCourse,
    UpdateCourse
}