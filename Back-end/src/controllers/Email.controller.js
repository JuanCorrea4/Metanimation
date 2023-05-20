const conexion = require('../config/mysql.config')
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')
require('dotenv').config()


const PostEmailToken = async(req,res)=>{
    try{
        
        function token(){
            min = Math.ceil(000000);
            max = Math.floor(999999);
            return Math.floor(Math.random() * (max - min) + min)
        }
        
        const Token =token()
        const {email} = req.body;
        let sqlName = `select Name from Person where Email="${email}"`
        let sqlTokenSave = `update EmailToken set Token = ${Token} where Email='${email}'`
        
        let identificadorTiempoDeEspera;

        function temporizadorDeRetraso() {
            identificadorTiempoDeEspera = setTimeout(TimeValidateToken, 900000);
        }
        const TimeValidateToken=(Token)=>{
            let sqlTokenTime= `call EmailTokenElminated('${email}')`
            conexion.query(sqlTokenTime,(err,rows,fieds)=>{
                if(err) throw err
                else{
                    console.log(rows[0],"Token Eliminated")
                }
            })
        }
        temporizadorDeRetraso()
        conexion.query(sqlName,async(err,rows,fields)=>{
            
            if(rows[0]==undefined){
                return res.status(404).json({Message:"User not found"})
            }
            const resultName = rows[0].Name
            conexion.query(sqlTokenSave,async(err,rows,fields)=>{
                
                if(err) throw err;

                const transporter = nodemailer.createTransport({
                    host: 'smtp-mail.outlook.com',
                    port: 587,
                    auth: {
                        user: 'MetAnimation@hotmail.com',
                        pass: 'bdfikmwwopfqilqk'
                    }
                });

                let info = await transporter.sendMail({
                    from:"metanimation@hotmail.com",
                    to:email,
                    subject:"Recuperar Contraseña de tu cuenta de MetAnimation",
                    text:"Has solicitado para recuperar tu contraseña de tu cuenta de MetAnimation",
                    html:`
                    <div>
                        <p>Hola ${resultName}</p>
                        <p>El token para restaurar tu contraseña es ${Token}</p>
                        <p>Recuerda que tienes una hora para poder cambiar tu contraseña</p>
                        <p>Tienes 15 minutos para recuperar la contraseña</p>
                    </div>`
                })
                console.log("Message sent: %s", info.messageId);

                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

                res.json({message:"Revisa tu correo electronico"})
            })
        })
  } catch (err) {
        res.status(500).json(err)
    }
}

const ChangePasswordToken=(req,res)=>{
    try {
        const {email,token}=req.body;
        let SearchTokenEmailSQL = `select Token from EmailToken where Email='${email}' `
        let SearchEmailTokenSql = `select Email from EmailToken where Token=${token}`
        conexion.query(SearchTokenEmailSQL,(err,rows,fields)=>{
            console.log(rows[0].Token)
            if(token==rows[0].Token){
                conexion.query(SearchEmailTokenSql,async (err,rows,fields)=>{
                    const{NewPassword,ConfirmPassword}= req.body
                    if(NewPassword==ConfirmPassword){
                        let EmailConfirm = rows[0].Email;
                        const NewPasswordBcrypt = await bcrypt.hash(NewPassword,10)
                        let ChangePassword=`update Person set Password = '${NewPasswordBcrypt}' where Email='${EmailConfirm}'`
                        conexion.query(ChangePassword,(err,rows,fields)=>{
                            if(err) throw err;
                            res.status(200).json(rows[0])
                        })
                    }else{
                        res.status(400).json({message:"password different"})
                    }
                })
        }else{
            res.status(401).json({message:"Token invalido"})
        }
    })
    } catch (error) {
        res.status(400).json({error})
    }
}

module.exports={
    PostEmailToken,
    ChangePasswordToken
}