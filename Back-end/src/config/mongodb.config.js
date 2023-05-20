const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://Cohnante:3113408016@cluster0.elf78qi.mongodb.net/MetAnimation',{
    useNewUrlParser: true,
    UseUnifiedTopology: true,
}).then(db=>console.log(`la base de datos mongodb se conecto`))
    .catch(err => console.error(err));