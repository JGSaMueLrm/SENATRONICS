const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoria.controller');

// GET - Obtener todas las categorías
router.get('/', categoriaController.getAllCategorias);

// GET - Obtener una categoría por ID
router.get('/:id', categoriaController.getCategoriaById);

// POST - Crear una nueva categoría
router.post('/', categoriaController.createCategoria);

// PUT - Actualizar una categoría
router.put('/:id', categoriaController.updateCategoria);

// DELETE - Eliminar una categoría
router.delete('/:id', categoriaController.deleteCategoria);

module.exports = router;
