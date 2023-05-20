const mongoose =require('mongoose')


const CommentSchema = new mongoose.Schema({
  Comment:{
    type: String
  },
  CCUser:{
    type: Number
  },
  Noticie:{
    type: Number
  }
})


module.exports = mongoose.model('Comment', CommentSchema)