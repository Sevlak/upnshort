const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
    name: String,
    file_id: String
})
const UpFile = mongoose.model('UpFile', fileSchema)

module.exports = UpFile