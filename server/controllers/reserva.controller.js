const Reserva = require('../models/reserva');
const ReservaAdministrador = require('../models/reservaAdministrador');

const reservaCtrl = {};

reservaCtrl.getReservas = async (req, res) => {
    const reservas = await Reserva.find({ 'confirmado':{ $eq: 'no' } });
    res.json(reservas);
};

reservaCtrl.recuperarUltimaReserva = async(req, res) => {
    const reservaU = await Reserva.findOne().sort({'fechaCreacion':-1}).select('nombre cantidad fecha horario');
    console.log(reservaU);
    res.json(reservaU);
}

reservaCtrl.createReserva = async (req, res) => {
    const reserva = new Reserva(req.body);
    await reserva.save();
    res.json({
        'status': 'Reserva guardada'
    });
};


reservaCtrl.createReservaPorLista = async (req, res) => {
    let lsItdReservas = req.body.map(reserva => reserva.idReservaAdministrador);
    console.log(lsItdReservas);
    let lstReservasAdministrador = await ReservaAdministrador.find({ '_id': { $in: lsItdReservas } });
    console.log(lstReservasAdministrador);
    let resultado = true;
    let mensajeError = "";
    for (let objReserva of req.body) {
        let reservaAdminitrador = lstReservasAdministrador.find(resAdmin => resAdmin._id == objReserva.idReservaAdministrador);
        if (!reservaAdminitrador) {
            resultado = false;
            mensajeError = "No se encuentra el horario a reservar"
            break;
        }
        let disponiblesReserva = reservaAdminitrador.cantidad - reservaAdminitrador.ocupados;
        if (disponiblesReserva < 1) {
            resultado = false;
            mensajeError = "No existen cupos disponibles para el día: " + reservaAdminitrador.fecha + ", en el horario: " + reservaAdminitrador.horario;
            break;
        }

        if (objReserva.cantidad > disponiblesReserva) {
            resultado = false;
            mensajeError = "No se puede reservar" + objReserva.cantidad, ", solo hay disponibles: " + " " + disponiblesReserva + ", en el día" + reservaAdminitrador.fecha + ", en el horario: " + reservaAdminitrador.horario;
            break;
        }
    }

    if (resultado) {
        for (let objReserva of req.body) {
            let reservaAdminitrador = lstReservasAdministrador.find(resAdmin => resAdmin._id == objReserva.idReservaAdministrador);
            reservaAdminitrador.ocupados = reservaAdminitrador.ocupados + objReserva.cantidad;
            const reserva = new Reserva(objReserva);
            await reserva.save();
            await reservaAdminitrador.save();
        }
    }
    let codigo = resultado ? "OK" : "ERROR";
    let mensaje = resultado ? "Reservas almacenadas" : mensajeError;
    res.json({
        'codigo': codigo,
        'mensaje': mensaje
    });
};

reservaCtrl.editReserva = async (req, res) => {
    const { id } = req.params;
    const reserva = {
        confirmado: req.body.confirmado
    };
    await Reserva.findByIdAndUpdate(id, { $set: reserva }, { new: true });
    res.json({ status: 'Reserva actualizada' });
};

reservaCtrl.deleteReserva = async (req, res) => {
    await Reserva.findByIdAndRemove(req.params.id);
    res.json({ status: 'Reserva Eliminada' });
};

module.exports = reservaCtrl;
