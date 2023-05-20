const mongoose= require("mongoose");

const AdvertisementSchema = new mongoose.Schema({
  Name:{
    type:String
  },
  Image:{
    type:String
  },
  Company:{
    type:String
  },
  AdvertisementURL:{
    type:String
  }
})

module.exports=mongoose.model('Advertisement',AdvertisementSchema)