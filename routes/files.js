const express = require('express')
const fileRouter = express.Router()
const mongoose = require('mongoose')
const upload = require('../multer_config')

fileRouter.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/static/index.html')
})

fileRouter.post('/up', upload.single('arquivo'), (req, res) =>{
    console.log(req.file.id)
})

module.exports = fileRouter