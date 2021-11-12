const Usuario = require('../models/usuario');

const usuarioCtrl = {};

usuarioCtrl.getUsuarios = async (req, res) => {
    const usuarios =  await Usuario.find();
    res.json(usuarios);
};

usuarioCtrl.createUsuario = async (req, res) => {
    const usuario = new Usuario(req.body);
    await usuario.save();
    res.json({
        'status': 'Usuario guardado'
    });
};

usuarioCtrl.getUsuario = async (req, res) => {
    const usuario = await Usuario.findById(req.params.id);
    res.json(usuario);
};

usuarioCtrl.editUsuario = async (req, res) => {
    const { id } = req.params;
    const usuario = {
        cedula: req.body.cedula,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        correo: req.body.correo,
        clave: req.body.clave,
        rol: req.body.rol
    };
    await Usuario.findByIdAndUpdate(id, {$set: usuario}, {new: true});
    res.json({status: 'Usuario actualizado'})
};

usuarioCtrl.deleteUsuario = async (req, res) => {
    await Usuario.findByIdAndRemove(req.params.id);
    res.json({ status: 'Usuario Eliminado' });
};

module.exports = usuarioCtrl;