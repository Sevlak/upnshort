const express = require('express')
const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
const path = require('path')
const mongoose = require('mongoose')
const router = require('./routes/files')

const app = express()


app.set('views', path.join(__dirname, 'views')) //seta a pasta onde as views estão pra facilitar a chamada depois (na verdade isso aqui era pra ser static)
app.use('/', router.fileRouter)


