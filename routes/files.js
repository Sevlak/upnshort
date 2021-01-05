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
    //salva o arquivo no banco de dados
    let newFile = new UpFile({name: req.file.originalname, file_id: req.file.id})
    newFile.save()

    //cria o timeout de 5 minutos
    setTimeout(() => {
        //deleta da database
        UpFile.remove({name: req.file.originalname}, (err) => {
            console.log(err)
        })

        //deleta a stream de dados do arquivo
        const file_id = req.file.id.toString()
        gfs.delete(file_id, (err) => {
            console.log(err)
        })
    }, 300000)


    res.status(200).send(`Seu link é <a href="http://localhost:3030/down/${req.file.id}">esse</a>. Boa sorte.`)
})

//baixar o arquivo
//todo: arrumar como fica o nome do arquivo
fileRouter.get('/down/:id', (req, res) => {
    UpFile.findOne({file_id: req.params.id}, (err, document) => {
        gfs.openDownloadStreamByName(document.name).pipe(res)  
    })
})

module.exports = fileRouter