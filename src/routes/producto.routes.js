const express = require('express');
const router = express.Router();
const productoController = require('../controllers/producto.controller');

// GET - Obtener todos los productos
router.get('/', productoController.getAllProductos);

// GET - Obtener productos con stock bajo
router.get('/bajo-stock', productoController.getProductosBajoStock);

// GET - Obtener un producto por ID
router.get('/:id', productoController.getProductoById);

// POST - Crear un nuevo producto
router.post('/', productoController.createProducto);

// PUT - Actualizar un producto
router.put('/:id', productoController.updateProducto);

// DELETE - Eliminar un producto
router.delete('/:id', productoController.deleteProducto);

module.exports = router;
