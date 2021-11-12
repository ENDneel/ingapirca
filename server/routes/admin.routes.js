const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin.controller');
router.get('/consultarPorId/:id', adminController.consultarPorId);
router.get('/actualizar/:antiguo/:nuevo', adminController.actualizar);
module.exports = router;
