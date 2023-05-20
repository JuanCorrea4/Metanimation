const morgan = require('morgan')
const express = require('express');
const db = require('./config/mongodb.config')
const cors = require('cors');
require('dotenv').config()

const port = process.env.port || 3000 ;

// Express
const app = express();
app.use(cors());

// Morgan
app.use(morgan('dev'))

//Admitir Json
app.use(express.json());

//Configuracion del puerto
app.set('port',port);

// Rutas
app.use('/api/Users',require('./routes/Users.router'))
app.use('/api/Company',require('./routes/Company.router'))
app.use('/api/Noticie',require('./routes/Noticies.router'))
app.use('/api/Course',require('./routes/Course.router'))
app.use('/api/Category',require('./routes/Category.router'))
app.use('/api/Teacher',require('./routes/teacher.router'))
app.use('/api/PodCast',require('./routes/podcast.router'))

//Iniciar express
app.listen(app.get('port'),(error)=>{
    if(error){
        console.log('Error al iniciar servidor' +error)
    }
    else{
        console.log('Servidor iniciado en el puerto: ' + port)
    }
})