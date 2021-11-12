const express = require('express');
const router = express.Router();

const reservaUsuarioControlador = require('../controllers/reservaUsuario.controller');

router.get('/', reservaUsuarioControlador.getReservaUsuarios);
router.post('/', reservaUsuarioControlador.createReservaUsuario);
router.get('/:id', reservaUsuarioControlador.getReservaUsuario);
router.put('/:id', reservaUsuarioControlador.editReservaUsuario);
router.delete('/:id', reservaUsuarioControlador.deleteReservaUsuario);

module.exports = router;