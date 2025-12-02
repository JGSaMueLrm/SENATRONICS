const express = require('express');
const router = express.Router();
const productoController = require('../controllers/producto.controller');
const authMiddleware = require('../middleware/authentification');

// GET - Obtener todos los productos
router.get('/', authMiddleware, productoController.getAllProductos);

// GET - Obtener productos con stock bajo
router.get('/bajo-stock', authMiddleware, productoController.getProductosBajoStock);

// GET - Obtener un producto por ID
router.get('/:id', productoController.getProductoById);

// POST - Crear un nuevo producto
router.post('/', authMiddleware, productoController.createProducto);

// PUT - Actualizar un producto
router.put('/:id', authMiddleware, productoController.updateProducto);

// DELETE - Eliminar un producto
router.delete('/:id', authMiddleware, productoController.deleteProducto);

module.exports = router;
