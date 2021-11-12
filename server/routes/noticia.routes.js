const express = require('express');
const router = express.Router();

const noticiaControlador = require('../controllers/noticia.controller');

router.get('/', noticiaControlador.getNoticias);
router.get('/listarUltimasNoticias', noticiaControlador.obtenerUltimasNoticias);
router.post('/', noticiaControlador.createNoticia);
router.get('/:id', noticiaControlador.getNoticia);
router.put('/:id', noticiaControlador.editNoticia);
router.delete('/:id', noticiaControlador.deleteNoticia);

module.exports = router;