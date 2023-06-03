const conexion = require('../config/mysql.config')
const Noticie = require('../models/Noticies.model')
require('dotenv').config()

const GetNoticie =async (req,res)=>{
    try {
        const NoticieGetAll =await Noticie.find()
        res.status(200).json({message:NoticieGetAll})
    } catch (error) {
        return res.status(500).json({error})
    }
}

const AddNoticie =async (req,res)=>{
    try {

        const NewNoticie = new Noticie({
            Title: req.body.Title,
            Description: req.body.Description,
            Category: req.body.Category,
            Author: req.body.Author,
            PublicationDate: req.body.PublicationDate,
            videoURL:req.body.VideoURL,
            ImagenURL:req.body.ImagenURL,
            PodCast:req.body.podcastURl
        })

        const NoticieSave = await NewNoticie.save()

        res.status(201).send(NoticieSave)

    } catch (error) {
        res.status(500).json(error)
    }
}

const DeleteNoticie =async (req,res)=>{
    try {
        await Noticie.findByIdAndDelete(req.params.id)
        res.status(200).json({message:'Noticia Elminada'})
    } catch (error) {
        res.status(500).json(error)
    }
}

const GetNoticieID =async (req,res)=>{
    try {
        const NoticieFound = await Noticie.findById(req.params.id)
        return res.status(200).json(NoticieFound)
    } catch (error) {
        res.status(500).json(error)
    }
}

const UpdateNoticie=(req,res)=>{
    try {
        const {id} = req.params
        const {Title,Description,Category,Author,videoURL,podcastURl}= req.body;
        let SearchNoticieId= `Select * from Noticies where Id=${id}`;
        let UpdateNoticie=  `Update Noticies set Title='${Title}',Description='${Description}',Category='${Category}',Author='${Author}',VideoURL='${videoURL}',podcastURl='${podcastURl}' where Id=${id}`;
        conexion.query(SearchNoticieId,(err,rows,fields)=>{
            if(err)throw err;
            else if(rows[0]==undefined){
                res.status(404).json({message:"Noticie not found"})
            }
            else if(rows){
                conexion.query(UpdateNoticie,(err,rows,fields)=>{
                    if(err)throw err;
                    else{
                        res.status(200).json({message:"Noticie updated"})
                    }
                })
            }
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    GetNoticie,
    AddNoticie,
    DeleteNoticie,
    UpdateNoticie,
    GetNoticieID
}