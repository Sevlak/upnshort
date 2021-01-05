const express = require('express')
const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
const fileRouter = require('./routes/files')

const app = express()

app.use('/', fileRouter) //todas os requests vao ser direcionados pra esse router

app.listen(3030, () => {
    console.log("Escutando em http://localhost:3030")
})

