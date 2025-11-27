const express = require('express');
const router = express.Router();
const proveedorController = require('../controllers/proveedor.controller');

// GET - Obtener todos los proveedores
router.get('/', proveedorController.getAllProveedores);

// GET - Obtener un proveedor por ID
router.get('/:id', proveedorController.getProveedorById);

// POST - Crear un nuevo proveedor
router.post('/', proveedorController.createProveedor);

// PUT - Actualizar un proveedor
router.put('/:id', proveedorController.updateProveedor);

// DELETE - Eliminar un proveedor
router.delete('/:id', proveedorController.deleteProveedor);

module.exports = router;
