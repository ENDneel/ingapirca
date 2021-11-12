const mongoose = require('mongoose');
const {Schema} = mongoose;

const ReservaUsuarioSchema = new Schema({
    fecha: { type: String, required: true},
    hora: { type: String, required: true},
    nombre: { type: String, required: true},
    cedula: { type: String, required: true}
});

module.exports = mongoose.model('ReservaUsuario', ReservaUsuarioSchema);