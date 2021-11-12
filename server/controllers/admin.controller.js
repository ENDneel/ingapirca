const Admin = require('../models/admin');

const adminCtrl = {};

crearContrasenaNueva = function (passNuevo, res) {
    let admin = new Admin();
    admin.password = passNuevo;
    admin.vigente = "SI";
    admin.fecha = new Date();
    res.json({
        'code': 'OK',
        'mensaje': 'Contrasena cambiada correctamente'
    })
}

adminCtrl.consultarPorId = async (req, res) => {
    console.log(req.params.id)
    const adminResultado = await Admin.find({ 'password': { $eq: req.params.id }, vigente: { $eq: "SI" } });
    res.json(adminResultado);
};

adminCtrl.actualizar = async (req, res) => {
    const passNuevo = req.params.nuevo;
    const passAntiguo = req.params.antiguo;
    let listContrasenas = await Admin.find({ vigente: { $eq: "SI" } });

    if (listContrasenas && listContrasenas.length) {
        let existeContrasenaIgual = listContrasenas.some(p => p.password == passAntiguo)
        console.log(existeContrasenaIgual)
        if (existeContrasenaIgual) {
            for (let pass of listContrasenas) {
                pass.vigente = "NO";
                pass.save();
            }

            let admin = new Admin();
            admin.password = passNuevo;
            admin.vigente = "SI";
            admin.fecha = new Date();
            admin.save();
            res.json({
                'code': 'OK',
                'mensaje': 'Contrasena cambiada correctamente'
            })


        } else {
            res.json({
                'code': 'ERROR',
                'mensaje': 'La contrasena antigua es incorrecta'
            })
        }
    } else {
        let admin = new Admin();
        admin.password = passNuevo;
        admin.vigente = "SI";
        admin.fecha = new Date();
        admin.save();
        res.json({
            'code': 'OK',
            'mensaje': 'Contrasena cambiada correctamente'
        })
    }
}

module.exports = adminCtrl;