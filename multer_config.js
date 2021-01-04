const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')

function generateId(){
    return '_' + Math.random().toString(36).substr(2, 9);
}

const storage = new GridFsStorage({ //define como os arquivos vão ser salvos
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

module.exports = upload