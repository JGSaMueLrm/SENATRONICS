const express = require('express');
const router = express.Router();
const movimientoController = require('../controllers/movimiento.controller');

// GET - Obtener todos los movimientos
router.get('/', movimientoController.getAllMovimientos);

// GET - Obtener un movimiento por ID
router.get('/:id', movimientoController.getMovimientoById);

// GET - Obtener movimientos por producto
router.get('/producto/:id_producto', movimientoController.getMovimientosByProducto);

// POST - Crear un nuevo movimiento (y actualizar stock)
router.post('/', movimientoController.createMovimiento);

module.exports = router;
