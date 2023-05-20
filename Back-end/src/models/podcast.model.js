const mongoose= require("mongoose");

const PodCastSchema = new mongoose.Schema({
  Name:{
    type:String
  },
  Duration:{
    type:String
  },
  URL:{
    type:String
  },
  Image:{
    type:String
  }
})

module.exports=mongoose.model('PodsCast',PodCastSchema)