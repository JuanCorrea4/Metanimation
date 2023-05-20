const Jwt =  require('jsonwebtoken')
const conexion = require('../config/mysql.config')
const bcrypt = require('bcrypt');


require('dotenv').config()

// Mostrar Todos
function GetAll(req, res) {
    try {
        let sql = 'select * from Company';

        conexion.query(sql, (err, rows, fields) => {
          if (err)
            throw err;
          else {
            res.json(rows);
          }
        });
    } catch (error) {
        return res.status(500).json({error});
    }
 
}

// Leer Usuario
function Get(req,res){
    try { 
        const {id} = req.params
        let sql = 'select * from Company where Id_Company  = ?'
        conexion.query(sql,[id],(err,rows,fields)=>{
            if(err) throw err;
            else{
                res.json(rows)
            }
        })
    } catch (error) {
        return res.status(500).json({error});
    }
   
};

// Agregar Usuario
async function SignUp(req,res,next){
  try {

    const {NameCompany, PhoneCompany, EmailCompany , Addres,PasswordCompany,RankMem} = req.body

    let sqlEmail = `select Id_Company ,NameCompany,EmailCompany from Company where EmailCompany = ?`;
    let sqlType = `select Id from Type where Descripction= ?` 

    conexion.query(sqlType,[RankMem],(err,rows,fields)=>{
       
        const Id_Membreys= rows[0].Id;

        if(rows[0]==undefined){
            res.status(400).json({message:"Rank of Membreys is Unvalid"})
        }
        else{  
            conexion.query(sqlEmail,EmailCompany, async(err,rows,fields)=>{
            
                if(err) throw err;
                if(rows[0]=== undefined){
                  const BcryptPassword = await bcrypt.hash(PasswordCompany,10)
                      
                  let sql = `insert into Company (NameCompany, PhoneCompany, EmailCompany,Addres,PasswordCompany,Id_Membreys ) values ('${NameCompany}','${PhoneCompany}', '${EmailCompany}', '${Addres}','${BcryptPassword}','${Id_Membreys}')`
                 
                  conexion.query(sql,(err,rows,fiels)=>{
                   
                    if(err) throw err;

                    else{
                        res.status(200).json({message:'Compañia Agregada'})
                        
                    }
                  })
                }
                else if(rows[0].email=EmailCompany){
                  res.status(400).json({Mesage: 'Company/email registered'});
                }
            })   
        }    
  })
 } catch (error) {
    return res.status(400).json({error})
  } 
};

// Eliminar Usuario
function DeleteCompany (req,res){
    try {
        
    const {id} = req.params
    let sql = `delete from Company where Id_Company = '${id}'`
    conexion.query(sql,(err,rows,fields)=>{
        if(err) throw err;
        else{
            res.json({status: 'Usuario Eliminado'})
        }
    })
    } catch (error) {
        return res.status(500).json({error})
    }
};


// Modify Company
async function ModifyCompany(req,res){
    try {
        
        const {id} = req.params
        const {NameCompany, PhoneCompany, EmailCompany , Addres,PasswordCompany,RankMem} = req.body

        let sqlPassword = `select PasswordCompany from Company where Id_Company=?`;
        let SqlSearchEmail = `select EmailCompany from company where EmailCompany =  ?`
        let SqlSearchConfirmed=`select EmailCompany from Company where Id_Company = ${req.params.id}`

        conexion.query(SqlSearchConfirmed,(err,rows,fields)=>{

            if(err)throw err;
    
            const SearchConfirmed = rows[0].email;
    
            conexion.query(SqlSearchEmail,[EmailCompany],(err,rows,fields)=>{
    
                if(err)throw err;
    
                const SearchEmail =rows[0];
    
                if(SearchEmail==undefined){       
                    
            conexion.query(sqlPassword,[id],(err,rows,fields)=>{

            if(err ) throw err;
    
    
            const BcryptPassword= rows[0].PasswordCompany;
            
            bcrypt.compare(PasswordCompany,BcryptPassword,async(err,hash)=>{
    
                if(err) throw err;  
                if(hash){
    
                    let sqlType = `select Id from Type where Descripction= ?` 
    
                    conexion.query(sqlType,[RankMem],(err,rows,fields)=>{
                        const Id_Membreys= rows[0].Id;
                        
                        if(rows[0]==undefined){
                            res.status(400).json({message:"Rank of Membreys is Unvalid"})
                        }
                        else{
                            let sqlId =   `update Company set NameCompany ='${NameCompany}',PhoneCompany = '${PhoneCompany}', EmailCompany = '${EmailCompany}',addres= '${Addres}',Id_Membreys='${Id_Membreys}' where Id_Company = '${id}'`
                            conexion.query(sqlId,(err,rows,fields)=>{
                                if(err) throw err;
                                
                                res.status(201).json({message:"User modify in successful"})
                            })
                        }
                    })
                    
                }else{
                    console.log("Password Incorrect");
                    res.status(401).json({message:"Password Incorrect"})
                }
            })
        })
    }
        else if(SearchConfirmed==req.body.EmailCompany){
                    
        conexion.query(sqlPassword,[id],(err,rows,fields)=>{

            if(err ) throw err;
    
    
            const BcryptPassword= rows[0].PasswordCompany;
            
            bcrypt.compare(PasswordCompany,BcryptPassword,async(err,hash)=>{
    
                if(err) throw err;  
                if(hash){
    
                    let sqlType = `select Id from Type where Descripction= ?` 
    
                    conexion.query(sqlType,[RankMem],(err,rows,fields)=>{
                        const Id_Membreys= rows[0].Id;
                        
                        if(rows[0]==undefined){
                            res.status(400).json({message:"Rank of Membreys is Unvalid"})
                        }
                        else{
                            let sqlId =   `update Company set NameCompany ='${NameCompany}',PhoneCompany = '${PhoneCompany}', EmailCompany = '${EmailCompany}',addres= '${Addres}',Id_Membreys='${Id_Membreys}' where Id_Company = '${id}'`
                            conexion.query(sqlId,(err,rows,fields)=>{
                                if(err) throw err;
                                
                                res.status(201).json({message:"User modify in successful"})
                            })
                        }
                    })
                    
                }else{
                    console.log("Password Incorrect");
                    res.status(401).json({message:"Password Incorrect"})
                }
            })
        
        })
                }else if(SearchEmail!=SearchConfirmed){
    
                    res.status(400).json({message:"Email Unvalid changed"})
                    
                }
            })
        })
    } catch (error) {
        return res.status(400).json({error})
    }
};

// Modify Password
async function ModifyPassword(req,res,next){
    try {
        
        const {id} = req.params
    
        const{NewPassword}= req.body
    
        let sqlPassword = `select PasswordCompany from Company where Id_Company=${req.params.id}`;
    
        conexion.query(sqlPassword,[id],(err,rows,fields)=>{
        
        if(err ) throw err;

            const BcryptPassword= rows[0].PasswordCompany;
            
            bcrypt.compare(req.body.PasswordCompany,BcryptPassword,async(err,hash)=>{

                const PasswordEncrypted = await bcrypt.hash(NewPassword,10)

                let sqlId =   `update Company set PasswordCompany = '${PasswordEncrypted}'where Id_Company = '${id}'`

                if(err) throw err;  
                
                if(hash){
                    conexion.query(sqlId,(err,rows,fields)=>{
                        if(err) throw err;
                        
                        res.status(201).json({message:"Password modify in successful"})
                
                    })
                }else{
                
                    console.log("Password Incorrect");
                
                    res.status(401).json({message:"Password Incorrect"})
                }
            })
        
    })   
    } catch (error) {
        return res.status(400).json({error})
    }
};


// Login
async function SignIn(req,res,next){
    try {   
    
    const EmailCompany = req.body.EmailCompany

    let sql = 'select NameCompany, Id_Company from Company where EmailCompany =  ?'
    let sqlP = 'select PasswordCompany from Company where EmailCompany =  ?'
    
    conexion.query(sql,[EmailCompany],(err, rows,fields) => {
        
        if(err) throw err;
        if(rows.length == 1){
            console.log("authorized");
            conexion.query(sqlP,[EmailCompany],(err,rows)=>{
                const PasswordCompany = rows[0].PasswordCompany
        
                bcrypt.compare(req.body.PasswordCompany,PasswordCompany,(err,hash)=>{
                    if(err) throw err;  
                    if(hash){
                        const Token = Jwt.sign({EmailCompany},process.env.SecretJWT,{
                            expiresIn:3600
                        })
                        console.log("Sign in successful");
                        res.status(201).json({message:"Sign in successful",Token:Token})
                        next()
                    }else{
                        console.log("Password Incorrect");
                        res.status(401).json({message:"Password Incorrect"})
                    }
                })
            })
        }else{
            res.status(401).json({response:"User does not exist"})

        }
    })
    } catch (error) {
        return res.status(400).json({error})
    }
};

module.exports = {
    Get,
    GetAll,
    ModifyPassword,
    SignIn,
    SignUp,
    ModifyCompany,
    DeleteCompany
}