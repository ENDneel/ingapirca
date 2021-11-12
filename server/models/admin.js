const mongoose = require('mongoose');
const {Schema} = mongoose;

const AdminSchema = new Schema({
    password: { type: String, required: true},
    vigente: { type: String, required: true},
    fecha: { type: Date, required: true}
});

module.exports = mongoose.model('Admin', AdminSchema);