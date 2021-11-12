const mongoose = require('mongoose');
const {Schema} = mongoose;

const ReservaAdministradorSchema = new Schema({
    dia: { type: Date, required: true},
    horario: { type: String, required: true},
    cantidad: { type: Number, required: true},
    ocupados: { type: Number, required: true},
});

module.exports = mongoose.model('ReservaAdministrador', ReservaAdministradorSchema);
