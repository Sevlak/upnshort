const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
const mongoose = require('mongoose')

function generateId(){ //gera ids aleatorios
    return '_' + Math.random().toString(36).substr(2, 9);
}

//conecta o mongoose com o db
const url = 'mongodb://localhost:27017/files'
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})

//define como os arquivos vão ser salvos
const storage = new GridFsStorage({ 
    url: 'mongodb://localhost:27017/files',
    file: (req, file) => {
        return {
            filename: file.originalname,
            id: generateId(),
            bucketName: 'uploads'
        }
    }
})

const upload = multer({storage}) //cria a instancia do multer com as configs predeterminadas

module.exports = {
    upload, 
    url
}