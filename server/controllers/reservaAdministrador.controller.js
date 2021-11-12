const ReservaAdministrador = require('../models/reservaAdministrador');

const reservaAdministradorController = {};

Date.prototype.yyyymmdd = function () {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();

    return [this.getFullYear(),
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd
    ].join('-');
};

if (!Date.prototype.toISODate) {
    Date.prototype.toISODate = function() {
      return this.getFullYear() + '-' +
             ('0'+ (this.getMonth()+1)).slice(-2) + '-' +
             ('0'+ this.getDate()).slice(-2);
    }
  }

reservaAdministradorController.getReservasAdministrador = async (req, res) => {
    const reservasAdministrador = await ReservaAdministrador.find();
    res.json(reservasAdministrador);
};

reservaAdministradorController.createReservaAdministrador = async (req, res) => {
    const reservaAdministrador = new ReservaAdministrador(req.body);
    await reservaAdministrador.save();
    res.json({
        'status': 'Reserva del Administrador guardada'
    });
};

reservaAdministradorController.createPorListaReservaAdministrador = async (req, res) => {
    let reservasGuardar = [];
    let resultado = true;
    let mensajeError = "";
    for (let objReserva of req.body) {
        const reservaAdministrador = new ReservaAdministrador(objReserva);
        reservasGuardar.push(reservaAdministrador.dia);
        console.log('FECHAS reserva', reservasGuardar)
        for(let diaGuardar of reservasGuardar){
            console.log(diaGuardar,'diaF');
            const reservaAdmin = await ReservaAdministrador.find( { dia: {$eq: diaGuardar}} ).count();
            if(reservaAdmin > 0){
                resultado = false;
                mensajeError = "Fecha no disponible"
                break;
            }
            console.log('horarios', reservaAdmin);
        }
    }
    if (resultado) {
        for (let objReserva of req.body) {
            const reservaA = new ReservaAdministrador(objReserva);
            await reservaA.save();
        }
    }
    let codigo = resultado ? "OK" : "ERROR";
    let mensaje = resultado ? "Reservas almacenadas" : mensajeError;
    res.json({
        'codigo': codigo,
        'mensaje': mensaje
    });
};

reservaAdministradorController.getFechasReservadas = async (req, res) => {
    console.log(new Date(req.params.fechaInicio))
    const reservasAdministrador = await ReservaAdministrador.find({ dia: { $gte: new Date(req.params.fechaInicio) } })
        .select("dia -_id").distinct("dia");
    res.json(reservasAdministrador);
}

reservaAdministradorController.recuperarFechasReservaCuposDisponibles = async (req, res) => {
    let fechasReservadasRespuesta = [];
    let fechaActual = new Date().toISODate();
    const reservasAdministrador = await ReservaAdministrador.find({ dia: { $gte: new Date(req.params.fechaInicio) } });
    if (reservasAdministrador && reservasAdministrador.length) {
        let diasReserva = new Set(reservasAdministrador.map(rs=> new Date(rs.dia).yyyymmdd()));
        for (let dia of diasReserva){
            let horariosDia  = reservasAdministrador.filter(rs => new Date(rs.dia).yyyymmdd() == dia);
            //Verificar si la fecha de reserva es la fecha actual
            if(dia == fechaActual){
                let minutes = new Date().getMinutes();
                let hour = new Date().getHours();
                console.log(minutes,'minutos');
                console.log(hour,'horas')
                let horaActual = (hour+':'+minutes);
                horariosDia = horariosDia.filter(hd => hd.horario.split(":")[0]> hour );
                console.log('horarios disponible', horariosDia);
            }
            //Recuperas la hora actual
            //Filtarar las horas de atencion mayores a la hora actual
            //
            horariosDisponibles = horariosDia.filter(hd => (hd.cantidad - hd.ocupados)>0);
            let existeHorariosDisponibles = horariosDisponibles && horariosDisponibles.length>0;
            fechasReservadasRespuesta.push({ dia: dia, existeDisponible: existeHorariosDisponibles })
        }
        console.log(fechasReservadasRespuesta)
    }
    res.json(fechasReservadasRespuesta);
}

reservaAdministradorController.getHorariosDisponiblesPorFecha = async (req, res) => {
    
    let fechaActual = new Date().toISODate();
    let fechaRecibida = req.params.fecha;
    console.log(fechaActual, )
    //console.log('conversion', req.params.fecha = moment(req.params.fecha).format('YYYT-MM-DDT05:00:00.000Z'))
    //const reservasAdministrador = await ReservaAdministrador.find({ dia : { $regex: '.*' + (req.params.fecha) + '.*' }, $expr: {$gt:["$cantidad", "$ocupados"]}})
    req.params.fecha = (req.params.fecha + 'T05:00:00.000Z')
    let reservasAdministrador = await ReservaAdministrador.find({ dia: { $eq: new Date(req.params.fecha)}, $expr: { $gt: ["$cantidad", "$ocupados"] } })
        .select("horario cantidad ocupados");


        if (reservasAdministrador && reservasAdministrador.length && fechaRecibida == fechaActual) {
            let fecha = new Date()
            let minutes = fecha.getMinutes();
            let hour = fecha.getHours();
            console.log(minutes,'minutos');
            console.log(hour,'horas')
            let horaActual = (hour+':'+minutes);
            reservasAdministrador = reservasAdministrador.filter(hd => (hd.horario.split(":")[0] > hour));
            console.log('horarios disponible', reservasAdministrador);
        }
    res.json(reservasAdministrador);
}

reservaAdministradorController.getReservaAdministrador = async (req, res) => {
    const reservaAdministrador = await ReservaAdministrador.findById(req.params.id);
    res.json(reservaAdministrador);
};

reservaAdministradorController.editReservaAdministrador = async (req, res) => {
    const { id } = req.params;
    const reservaAdministrador = {
        dia: req.body.dia,
        horario: req.body.horario,
        cantidad: req.body.cantidad,
        ocupados: req.body.ocupados
    };
    await ReservaAdministrador.findByIdAndUpdate(id, { $set: reservaAdministrador }, { new: true });
    res.json({ status: 'Reserva administrador actualizada' });
};

reservaAdministradorController.editReservaAdministradorCupos = async (req, res) => {
    const { id } = req.params;
    const reservaAdministrador = {
        ocupados: req.body.ocupados
    };
    await ReservaAdministrador.findByIdAndUpdate(id, { $set: reservaAdministrador }, { new: true });
    res.json({ status: 'Actualizada' });
};

reservaAdministradorController.deleteReservaAdministrador = async (req, res) => {
    await ReservaAdministrador.findByIdAndRemove(req.params.id);
    res.json({ status: 'Reserva administrador Eliminada' });
};



module.exports = reservaAdministradorController;
