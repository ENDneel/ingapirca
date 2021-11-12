const express = require('express');
const router = express.Router();

const usuarioControlador = require('../controllers/usuario.controller');

router.get('/', usuarioControlador.getUsuarios);
router.post('/', usuarioControlador.createUsuario);
router.get('/:id', usuarioControlador.getUsuario);
router.put('/:id', usuarioControlador.editUsuario);
router.delete('/:id', usuarioControlador.deleteUsuario);

module.exports = router;