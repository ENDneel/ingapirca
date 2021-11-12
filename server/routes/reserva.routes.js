const express = require('express');
const router = express.Router();

const reservaCtrl = require('../controllers/reserva.controller')

router.get('/listar', reservaCtrl.getReservas);
router.get('/listarUltimo', reservaCtrl.recuperarUltimaReserva);
router.post('/crearReserva', reservaCtrl.createReserva);
router.post('/crearReservaPorLista', reservaCtrl.createReservaPorLista);
router.delete('eliminar/:id', reservaCtrl.deleteReserva);
router.put("/:id", reservaCtrl.editReserva);

module.exports = router;
