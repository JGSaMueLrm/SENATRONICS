const express = require('express');
const router = express.Router();
const almacenController = require('../controllers/almacen.controller');

// GET - Obtener todos los almacenes
router.get('/', almacenController.getAllAlmacenes);

// GET - Obtener un almacén por ID
router.get('/:id', almacenController.getAlmacenById);

// POST - Crear un nuevo almacén
router.post('/', almacenController.createAlmacen);

// PUT - Actualizar un almacén
router.put('/:id', almacenController.updateAlmacen);

// DELETE - Eliminar un almacén
router.delete('/:id', almacenController.deleteAlmacen);

module.exports = router;
