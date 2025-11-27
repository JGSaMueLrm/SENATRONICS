const Categoria = require('../models/categoria');

// Obtener todas las categorías
const getAllCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.findAll();
        res.json(categorias);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener categorías", error: error.message });
    }
};

// Obtener una categoría por ID
const getCategoriaById = async (req, res) => {
    try {
        const categoria = await Categoria.findByPk(req.params.id);
        if (!categoria) {
            return res.status(404).json({ mensaje: "Categoría no encontrada" });
        }
        res.json(categoria);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener categoría", error: error.message });
    }
};

// Crear una nueva categoría
const createCategoria = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        const nuevaCategoria = await Categoria.create({ nombre, descripcion });
        res.status(201).json(nuevaCategoria);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear categoría", error: error.message });
    }
};

// Actualizar una categoría
const updateCategoria = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        const categoria = await Categoria.findByPk(req.params.id);

        if (!categoria) {
            return res.status(404).json({ mensaje: "Categoría no encontrada" });
        }

        await categoria.update({ nombre, descripcion });
        res.json(categoria);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar categoría", error: error.message });
    }
};

// Eliminar una categoría
const deleteCategoria = async (req, res) => {
    try {
        const categoria = await Categoria.findByPk(req.params.id);

        if (!categoria) {
            return res.status(404).json({ mensaje: "Categoría no encontrada" });
        }

        await categoria.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar categoría", error: error.message });
    }
};

module.exports = {
    getAllCategorias,
    getCategoriaById,
    createCategoria,
    updateCategoria,
    deleteCategoria
};
