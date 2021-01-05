const express = require('express')
const fileRouter = express.Router()
const { upload } = require('../multer_config') 
const { url } = require('../multer_config') 
const UpFile = require('../models/files')
const mongoose = require('mongoose') 

const streamCon = mongoose.createConnection(url, { useNewUrlParser: true, useUnifiedTopology: true })
let gfs; //variavel usada pra armazenar a stream

streamCon.once('open', () =>{ //cria uma stream caso a conexao com o db for feita
    gfs = new mongoose.mongo.GridFSBucket(streamCon.db, {
        bucketName: "uploads"
    })
    console.log('gfs feito')
})


fileRouter.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/static/index.html')
})

fileRouter.post('/up', upload.single('arquivo'), (req, res) =>{
    console.log(req.file)
    let newFile = new UpFile({name: req.file.originalname, file_id: req.file.id})
    newFile.save()

    setTimeout(() => {
        //deleta do database
        UpFile.remove({name: req.file.originalname}, (err) => {
            console.log(err)
        })

        //deleta a stream de dados do arquivo
        const file_id = req.file.id.toString()
        gfs.delete(file_id, (err) => {
            console.log(err)
        })
    }, 5000)
})

module.exports = fileRouter