// librerias
const Jwt =  require('jsonwebtoken')
const conexion = require('../config/mysql.config')
const bcrypt = require('bcrypt');

// declaracion del .env 
require('dotenv').config()

// Mostrar Todos los usuarios
function GetAll(req, res) {
    try {
        // cadena del procedimiento Sql para obtener todos los usuarios
        let sql = 'call GetAllUsers()';
        // Ejecución de la cadena SQl
        conexion.query(sql, (err, rows, fields) => {
            // Si hubo un error no se envia nada y se le pasa el codigo de status 404(not found)
            if(err) res.status(404).json({message:"no se encuentra ningun usuario registrado"});
            // si se encuentra algo se le pasa con el status 200
            else {
                res.json(rows[0]);
            }
        });
    } catch (error) {
        // Si hay un error por parte del servidor se le dira el error
        return res.status(500).json({error});
    }
 
}

// Obtener usuario por su CC
function Get(req,res){
    try { 
        // Declaracion de la Id que se la pasa a la cadena de SQl
        const id = req.params.id
        // Cadena del procedimiento SQL para obtener un usuario por su id
        let sql = 'call GetIdUser(?)'
        // Ejecucion de la cadena con la constante Id para buscar al usuario
        conexion.query(sql,[id],(err,rows,fields)=>{
            // Si hubo un error no se envia nada y se le pasa el codigo de status 404(not found)
            if(err) res.status(404).json({message:"Usuario no encontrado"});
            // si se encuentra algo se le pasa con el status 200
            else{
                res.status(200).json(rows[0])
            }
        })
    } catch (error) {
        // Si hay un error por parte del servidor se le dira el error
        return res.status(500).json({error});
    }
   
};

// Agregar Usuario
async function SignUp(req,res,next){
  try {
    //Declaracion de las variables que se la pasaran a la cadena de SQL
    const {Cedula,Nombre,Apellido,Celular,Email,Password,Rol,RolAd} = req.body
    // Cadena Sql para verificar que el email no sea repetido
    let sqlEmail = `call GetEmailUser(?)`;
    //ejecución de la cadena sql con la constante de Email
    conexion.query(sqlEmail,[Email], async(err,rows,fields)=>{
        // si hay un error se cancela el procedimiento
        if(err) res.status(400).json({message:err});
        //Si no hay un email igual se ejecuta las siguientes cadenas
        if(rows[0]==''){
            //constante para guardar la encryptacion de la contraseña pasada por el usuario
            const BcryptPassword = await bcrypt.hash(Password,10)

            if(Rol==null){
            let RolNull = 'User'
            //Cadena de sql para Guardar 
            let sql = `call SavePerson(?,?,?,?,?,?,?,?)`
            // Cadena Sql para verificar la CC no este repetida
            let sqlId = `call GetIdValidacionUser(?)`
            //Ejecucion de la cadena de verificacion de CC con la constante Cedula
            conexion.query(sqlId,[Cedula],(err,rows,fields)=>{
                // Guardando el resultado de la ejecucion de la cadena
                const idTemp = rows[0]
                const Id = idTemp[0]
                // si hay un error se cancela el procedimiento
                if(err)  res.status(400).json({message:err});
                    //
                    let SqlEmailToken = `insert into EmailToken(email) values ('${Email}')`
                    conexion.query(SqlEmailToken,(err,rows,fields)=>{
                        if(err) throw err;
                        // Verificacion si no existe ninguna CC 
                        if(Id==undefined){
                            // Ejecucion de la cadena para guardar con los valores pasados por el usuario
                            conexion.query(sql,[Cedula,Nombre, Apellido, Celular, Email, BcryptPassword,RolNull,RolAd], (err,rows,fields)=>{
                                // si hay un error se cancela el procedimiento
                                if(err)  res.status(400).json({message:err});
                                else{
                                    // si no hubo un error se le manda el mensaje con exito
                                    res.status(201).json({status: 'Usuario Agregado'})
                                    next()
                                }
                            })
                        }
                    // si existe una CC ya existente,se le manda un error 400 
                    else if(Id.id == Cedula) res.status(400).json({message:"Cedula actualmente registrada"})
                })
            })
            }
            else if(Rol=="User"){
                //Cadena de sql para Guardar 
            let sql = `call SavePerson(?,?,?,?,?,?,?,?)`
            // Cadena Sql para verificar la CC no este repetida
            let sqlId = `call GetIdValidacionUser(?)`
            //Ejecucion de la cadena de verificacion de CC con la constante Cedula
            conexion.query(sqlId,[Cedula],(err,rows,fields)=>{
                // Guardando el resultado de la ejecucion de la cadena
                const idTemp = rows[0]
                const Id = idTemp[0]
                // si hay un error se cancela el procedimiento
                if(err)  res.status(400).json({message:err});
                    //
                    let SqlEmailToken = `insert into EmailToken(email) values ('${Email}')`
                    conexion.query(SqlEmailToken,(err,rows,fields)=>{
                        if(err) throw err;
                        // Verificacion si no existe ninguna CC 
                        if(Id==undefined){
                            // Ejecucion de la cadena para guardar con los valores pasados por el usuario
                            conexion.query(sql,[Cedula,Nombre, Apellido, Celular, Email, BcryptPassword,Rol,RolAd], (err,rows,fields)=>{
                                // si hay un error se cancela el procedimiento
                                if(err)  res.status(400).json({message:err});
                                else{
                                    // si no hubo un error se le manda el mensaje con exito
                                    res.status(201).json({status: 'Usuario Agregado'})
                                    next()
                                }
                            })
                        }
                    // si existe una CC ya existente,se le manda un error 400 
                    else if(Id.id == Cedula) res.status(400).json({message:"Cedula actualmente registrada"})
                })
            })
            }
            else if(RolAd=='Administrador'|| RolAd=='Moderador'){
            //Cadena de sql para Guardar 
            let sql = `call SavePerson(?,?,?,?,?,?,?,?)`
            // Cadena Sql para verificar la CC no este repetida
            let sqlId = `call GetIdValidacionUser(?)`
            //Ejecucion de la cadena de verificacion de CC con la constante Cedula
            conexion.query(sqlId,[Cedula],(err,rows,fields)=>{
                // Guardando el resultado de la ejecucion de la cadena
                const idTemp = rows[0]
                const Id = idTemp[0]
                // si hay un error se cancela el procedimiento
                if(err)  res.status(400).json({message:err});
                //
                let SqlEmailToken = `insert into EmailToken(email) values ('${Email}')`
                conexion.query(SqlEmailToken,(err,rows,fields)=>{
                    if(err) throw err;
                    // Verificacion si no existe ninguna CC 
                    if(Id==undefined){
                        // Ejecucion de la cadena para guardar con los valores pasados por el usuario
                        conexion.query(sql,[Cedula,Nombre, Apellido, Celular, Email, BcryptPassword,Rol,RolAd], (err,rows,fields)=>{
                            // si hay un error se cancela el procedimiento
                            if(err)  res.status(400).json({message:err});
                            else{
                                // si no hubo un error se le manda el mensaje con exito
                                res.status(201).json({status: 'Usuario Agregado'})
                                next()
                            }
                        })
                    }
                    // si existe una CC ya existente,se le manda un error 400 
                    else if(Id.id == Cedula) res.status(400).json({message:"Cedula actualmente registrada"})
                })
            })
            }
        }
        else if(rows[0].email=Email){
        //si existe un Email ya existente,se le manda un error 400 
        res.status(400).json({Mesage: 'email registered'});
      }
  })
}catch (error) {
    // Si ocurrio un error por parte del servidor
    return res.status(500).json({error})
  } 
};

// Eliminar Usuario
function DeleteUser (req,res,next){
    try {
        // Declaracion de la id pasada por el usuario
        const {id} = req.params
        // Cadena del procedimiento Sql para borrar el usuario por su id
        let sql = `delete from Person where id = '${id}'`
        // Ejecucion de la cadena con el parametro id
        conexion.query(sql,(err,rows,fields)=>{
            // si hay un error se cancela el procedimiento
            if(err)  res.status(400).json({message:err});
            //si no hubo un error prosigue para finalizar el cadena
            else{
                res.status(200).json({message: 'Usuario Eliminado'})
                next()
            }
        })
    } catch (error) {
        // Si ocurrio un error por parte del servidor
        return res.status(500).json({error})
    }
};

// Modificar usuario 
async function ModifyUser(req,res,next){
    try {
        //Declaracion del parametro pasado por el usuario
        const {id} = req.params
        // Declaracion de los varoles pasados para modificar por el usuario
        const{Name, lastname, phone, email,Rol}= req.body
        // Cadena Sql para encontrar la contraseña
        let sqlPassword = `select Password from Person where id=${req.params.id}`;
        // Cadena Sql para verificar el email no se encuentre registrado por si el usuario modifica el correo
        let SqlSearchEmail = `select email from person where email =  ?`
        // Cadena para encontrar el email por medio de la id ingresada
        let SqlSearchConfirmed=`select email from person where id = ${req.params.id}`
        //Ejecucion de la cadena para encontrar el email por medio del id
        conexion.query(SqlSearchConfirmed,(err,rows,fields)=>{
        // si hay un error se cancela el procedimiento 
        if(err)  res.status(400).json({message:err});
        // Se guarda el email encontrado en una constante
        const SearchConfirmed = rows[0].email;
        // Ejecucion de la cadena para encontrar el email por medio de la email guardada anteriormente
        conexion.query(SqlSearchEmail,[email],(err,rows,fields)=>{
            // si hay un error se cancela el procedimiento 
            if(err)  res.status(400).json({message:err});
            // Se guarda el email encontrado en una constante
            const SearchEmail =rows[0];
            // Si no se encontro el email puede proceder para cambiar el email 
            if(SearchEmail==undefined){       
                // Ejecucion de la cadena para encontrar la contraseña por medio de la id pasada por el usuario
                conexion.query(sqlPassword,[id],(err,rows,fields)=>{
                    // si hay un error se cancela el procedimiento 
                    if(err) res.status(400).json({message:err});
                    // Cuando se haya la contraseña se guarda en una constante para luego validar
                    const BcryptPassword= rows[0].Password;
                    // Se compara las contraseñas, una pasada por el usuario y la otra que se encontro por medio de la id
                    bcrypt.compare(req.body.Password,BcryptPassword,async(err,hash)=>{
                        // Cadena Sql para actualizar el usuario
                        let sqlId =   `update Person set Name ='${Name}',lastname = '${lastname}',phone = '${phone}', email = '${email}',Rol='${Rol}' where id = '${id}'`
                        // si hay un error se cancela el procedimiento 
                        if(err)  res.status(400).json({message:err});
                        // Si son iguales la contraseña prosigue
                        if(hash){
                            // Ejecucion de la cadena para actualizar el usuario
                            conexion.query(sqlId,(err,rows,fields)=>{
                                // si hay un error se cancela el procedimiento 
                                if(err)  res.status(401).json({message:err});
                                // Si todo esta bien se le envia con exito al usuario 
                                res.status(201).json({message:"User modify in successful"})
                                next()
                            })
                        }else{
                            // Si la contraseña no son iguales se le manda un error 401
                            res.status(401).json({message:"Password Incorrect"})
                        }
                    })
                })
            }
            // Si son iguales el correo ingresado y el que se encontro por medio del procedimiento 
            else if(SearchConfirmed==req.body.email){
                // Ejecucion de la cadena para encontrar la contraseña por medio de la id
                conexion.query(sqlPassword,[id],(err,rows,fields)=>{
                    // Si hay un error se cancela el procedimiento y se le envia cual fue
                    if(err ) res.status(400).json({message:err});;
                    // Cuando se haya la contraseña se guarda en una constante para luego validar
                    const BcryptPassword= rows[0].Password;
                    // Se compara las contraseñas, una pasada por el usuario y la otra que se encontro por medio de la id
                    bcrypt.compare(req.body.Password,BcryptPassword,async(err,hash)=>{
                        // Cadena Sql para actualizar el usuario
                        let sqlId =   `update Person set Name ='${Name}',lastname = '${lastname}',phone = '${phone}', email = '${email}',Rol='${Rol}' where id = '${id}'`
                        // Si hay un error se cancela el procedimiento y se le envia cual fue
                        if(err ) res.status(400).json({message:err});;
                        // Si son iguales la contraseña prosigue
                        if(hash){
                            // Ejecucion de la cadena para actualizar el usuario
                            conexion.query(sqlId,(err,rows,fields)=>{
                                // si hay un error se cancela el procedimiento 
                                if(err)  res.status(401).json({message:err});
                                // Si todo esta bien se le envia con exito al usuario 
                                res.status(201).json({message:"User modify in successful"})
                                next()
                            })
                        }else{
                            // Si la contraseña no son iguales se le manda un error 401
                            res.status(401).json({message:"Password Incorrect"})
                        }
                    })
                })
            // Si se encontro otro email se le niega el acceso para actualizar 
            }else if(SearchEmail!=SearchConfirmed){
                // Se le envia el mensaje que es invalido el cambio de email
                res.status(400).json({message:"Email Unvalid changed"})
            }
        })
    })
}// Si ocurrio un error por parte del servidor
catch (error) {
        return res.status(500).json({error})
    }
};

// Modify Password
async function ModifyPassword(req,res,next){
    try {
        //Declaracion del parametro pasado por el usuario
        const {id} = req.params
        //Se guarda el valor de la nueva Contraseña pasada por el usuario
        const{NewPassword}= req.body
        //Cadena para encontrar la contraseña por medio de la id
        let sqlPassword = `select Password from Person where id=?`;
        //Ejecucion de la cadena con el parametro id
        conexion.query(sqlPassword,[id],(err,rows,fields)=>{
        // si hay un error se cancela el procedimiento 
        if(err)  res.status(401).json({message:err});
        //se guarda la contraseña encontrada
        const BcryptPassword= rows[0].Password;
            //se compara la contraseña pasada por el usuario con la que se encontro 
            bcrypt.compare(req.body.Password,BcryptPassword,async(err,hash)=>{
                //se guarda la contraseña si es verdadera con el metodo async
                const PasswordEncrypted = await bcrypt.hash(NewPassword,10)
                //cadena para poder actualizar la contraseña con el parametro de id
                let sqlId =   `update Person set Password = '${PasswordEncrypted}'where id = '${id}'`
                // si hay un error se cancela el procedimiento 
                if(err)  res.status(401).json({message:err});
                //si son igual la contrasela prosigue
                if(hash){
                    //Ejecucion de la cadena para actualizar la contraseña
                    conexion.query(sqlId,(err,rows,fields)=>{
                        // si hay un error se cancela el procedimiento 
                        if(err)  res.status(401).json({message:err});
                        //si todo salio con exito se le manda un status 201 con el siguiente mensaje
                        res.status(201).json({message:"Password modify in successful"})
                        next()
                    })
                    //si las contraseñas no son iguales se le niega el acceso
                }else{
                    res.status(401).json({message:"Password Incorrect"})
                }
            })
        
    })//Si hay un error del servidor se manda el mensaje 500
    } catch (error) {
        return res.status(500).json({error})
    }
};


// Login
async function SignIn(req,res,next){
    try {
    // Se guarda en una constante el email pasado por el usuario    
    const email = req.body.email
    // cadena Sql para encontrar los roles del usuario(Puede ser un usuario normal o un profesor)
    let sqlRol = `select Rol,RolAd from Person where Email = '${email}'`
    let sqlId = `Select Id from Person where Email = ?`
    // Ejecucion de la cadena para encontrar los roles del usuario
    conexion.query(sqlRol,(err,rows,fields)=>{
        // si hay un error se cancela el procedimiento 
        if(err)  res.status(401).json({message:err});
        // Se guarda el rol Administrativo del usuario (Puede ser un moderador o un administrador)
        const RolAd = rows[0].RolAd;
        const Rol = rows[0].Rol;
        // Cadena para encontrar el nombre y la CC por medio del email ingresado
        let sql = 'select Name, id from Person where Email =  ?'
        // Cadena para encontrar la contraseña por medio del email
        let sqlP = 'select Password from Person where Email =  ?'
        conexion.query(sqlId,[email],(err,rows,fields)=>{
        const IdTeacherSearch = rows[0].Id;
        // Ejecucion de la cadena para encontrar el nombre y la CC por el medio del parametro email
        conexion.query(sql,[email],(err, rows,fields) => {
            // si hay un error se cancela el procedimiento 
            if(err)  res.status(401).json({message:err});
            // Si es verdadero accede 
            if(rows.length == 1){
                // Ejecucion de la cadena para encontrar la contraseña con el parametro email
                conexion.query(sqlP,[email],(err,rows)=>{
                    // Se guarda la contraseña encontrada por el email de la cuenta
                    const Password = rows[0].Password
                    // Se compara la contraseña encontrada y la ingresada por el usuario
                    bcrypt.compare(req.body.Password,Password,(err,hash)=>{
                        // si hay un error se cancela el procedimiento 
                        if(err)  res.status(401).json({message:err}); 
                        // Si las contraseña son iguales se le deja iniciar sesiòn 
                        if(hash){
                            // Generacion del token por medio del email (Usuario normal)
                            const TokenEmail = Jwt.sign({email},process.env.SecretJWT,{
                                expiresIn:3600
                            })
                            // Generacion del token por medio del Rol Administrativo (Moderador, Administrador)
                            const TokenRol = Jwt.sign({RolAd},process.env.SecretJWT,{
                                expiresIn:3600
                            })
                            const TokenTeacher= Jwt.sign({Rol:Rol,IdTeacher:IdTeacherSearch},process.env.SecretJWT,{
                                expiresIn:3600
                            })
                            // Si el rol Administrativo es Administrador pasa por aca y se le manda en un json el siguiente mensaje con el token
                            if(RolAd=='Administrador'){
                                return res.status(200).json({message:"Sign in successful Administrador",Token:TokenRol})
                            }
                            // Si el rol Administrativo es Moderador pasa por aca y se le manda en un json el siguiente mensaje con el token
                            if(RolAd=='Moderator'){
                                return res.status(200).json({message:"Sign in successful Moderator",Token:TokenRol})
                            }
                            if(Rol=='Profesor'){
                                return res.status(200).json({message:"Sign in successful Profesor",Token:TokenTeacher})
                            }
                            // Si no tiene ningun rol Administrativo el usuario pasa por aca y se le pasa el token normal 
                            else{
                                res.json({message:"Sign in successful",token:TokenEmail})
                                next()
                            }
                            // Si la contraseña no son iguales se le cancela el ingreso
                        }else{
                            res.status(401).json({message:"Password Incorrect"})
                        }
                    })
                })
            }else{
                // Si el email pasado no se encuentra se le dira y se le sugiere registrarse en el sistema 
                res.status(401).json({response:"User does not exist",Message:"Por favor registrese en el sistema"})
            }
        })
    })
})//Si hay un error del servidor se manda el mensaje 500
} catch (error) {
            return res.status(500).json({error})
    }
};
// Exportacion de las funciones
module.exports = {
    Get,
    GetAll,
    ModifyPassword,
    SignIn,
    SignUp,
    ModifyUser,
    DeleteUser
}