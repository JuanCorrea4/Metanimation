const mysql = require('mysql');
require('dotenv').config()

const conexion = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'MetAnimation'
});

conexion.connect((err)=>{
    if(err){
        console.log('Ha ocurrido un error' + err)
    }
    else{
        console.log('La base de datos mysql se conecto')
    }
});

module.exports=conexion;