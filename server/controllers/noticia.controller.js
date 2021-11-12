const Noticia = require('../models/noticia');

const noticiaCtrl = {};

noticiaCtrl.getNoticias = async (req, res) => {
    const noticias = await Noticia.find().sort({ 'fecha': -1 });
    res.json(noticias);
};

noticiaCtrl.obtenerUltimasNoticias = async (req, res) => {
    const ultimaNoticia = await Noticia.find().sort({ 'fecha': -1 });
    console.log(ultimaNoticia)
    res.json(ultimaNoticia);
}
/*
reservaCtrl.recuperarUltimaReserva = async(req, res) => {
    const reservaU = await Reserva.findOne().sort({'fechaCreacion':-1}).select('nombre cantidad fecha horario');
    console.log(reservaU);
    res.json(reservaU);
} */

noticiaCtrl.createNoticia = async (req, res) => {
    const noticia = new Noticia({
        titulo: req.body.titulo,
        cuerpo: req.body.cuerpo,
        link: req.body.link,
        fecha: req.body.fecha
    });
    await noticia.save();
    res.json({
        'status': 'Noticia guardada'
    });
};

noticiaCtrl.getNoticia = async (req, res) => {
    const noticia = await Noticia.findById(req.params.id);
    res.json(noticia);
};

noticiaCtrl.editNoticia = async (req, res) => {
    const { id } = req.params;
    const noticia = {
        titulo: req.body.titulo,
        cuerpo: req.body.cuerpo,
        link: req.body.link
    };
    await Noticia.findByIdAndUpdate(id, { $set: noticia }, { new: true });
    res.json({ status: 'Noticia actualizada' })
};

noticiaCtrl.deleteNoticia = async (req, res) => {
    await Noticia.findByIdAndRemove(req.params.id);
    res.json({ status: 'Noticia Eliminada' });
};

module.exports = noticiaCtrl;