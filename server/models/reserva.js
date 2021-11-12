const mongoose = require('mongoose');
const {Schema} = mongoose;

const ReservaSchema = new Schema({
    nombre: { type: String, required: true},
    telefono: { type: String, required: true},
    cantidad: { type: Number, required: true},
    fecha: { type: Date, required: true},
    horario: { type: String, required: true},
    idReservaAdministrador: { type: String, required: true},
    fechaCreacion: { type: Date, required: true},
    confirmado: { type: String, required: true}
});

module.exports = mongoose.model('Reserva', ReservaSchema);