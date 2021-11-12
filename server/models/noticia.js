const mongoose = require('mongoose');
const {Schema} = mongoose;

const NoticiaSchema = new Schema({
    titulo: { type: String, required: true},
    cuerpo: { type: String, required: true},
    link: { type: String, required: true},
    fecha: { type: Date, required: true}
});

module.exports = mongoose.model('Noticia', NoticiaSchema);