const express = require('express');
const router = express.Router();

const reservaAdministradorController = require('../controllers/reservaAdministrador.controller')

router.get('/', reservaAdministradorController.getReservasAdministrador);
router.post('/', reservaAdministradorController.createReservaAdministrador);
router.post('/crearPorLista', reservaAdministradorController.createPorListaReservaAdministrador);
router.get('/buscarPorId/:id', reservaAdministradorController.getReservaAdministrador);
router.get('/recuperarFechasReservadas/:fechaInicio', reservaAdministradorController.getFechasReservadas);
router.get('/recuperarHorariosDisponibles/:fecha', reservaAdministradorController.getHorariosDisponiblesPorFecha);
router.get('/recuperarFechasReservaCuposDisponibles/:fechaInicio', reservaAdministradorController.recuperarFechasReservaCuposDisponibles);
router.put('/:id', reservaAdministradorController.editReservaAdministrador);
router.delete('/:id', reservaAdministradorController.deleteReservaAdministrador);

module.exports = router;
