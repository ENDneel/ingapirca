const ReservaUsuario = require('../models/reservaUsuario');

const reservaUsuarioCtrl = {};

reservaUsuarioCtrl.getReservaUsuarios = async (req, res) => {
    const reservaUsuarios =  await ReservaUsuario.find();
    res.json(reservaUsuarios);
};

reservaUsuarioCtrl.createReservaUsuario = async (req, res) => {
    const reservaUsuario = new ReservaUsuario(req.body);
    await reservaUsuario.save();
    res.json({
        'status': 'reserva Usuario guardada'
    });
};

reservaUsuarioCtrl.getReservaUsuario = async (req, res) => {
    const reservaUsuario = await ReservaUsuario.findById(req.params.id);
    res.json(reservaUsuario);
};

reservaUsuarioCtrl.editReservaUsuario = async (req, res) => {
    const { id } = req.params;
    const reservaUsuario = {
        fecha: req.body.fecha,
        hora: req.body.hora,
        nombre: req.body.nombre,
        cedula: req.body.cedula
    };
    await ReservaUsuario.findByIdAndUpdate(id, {$set: reservaUsuario}, {new: true});
    res.json({status: 'ReservaUsuario actualizada'})
};

reservaUsuarioCtrl.deleteReservaUsuario = async (req, res) => {
    await ReservaUsuario.findByIdAndRemove(req.params.id);
    res.json({ status: 'ReservaUsuario Eliminada' });
};

module.exports = reservaUsuarioCtrl;