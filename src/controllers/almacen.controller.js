const Almacen = require('../models/almacen');

// Obtener todos los almacenes
const getAllAlmacenes = async (req, res) => {
    try {
        const almacenes = await Almacen.findAll();
        res.json(almacenes);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener almacenes", error: error.message });
    }
};

// Obtener un almacén por ID
const getAlmacenById = async (req, res) => {
    try {
        const almacen = await Almacen.findByPk(req.params.id);
        if (!almacen) {
            return res.status(404).json({ mensaje: "Almacén no encontrado" });
        }
        res.json(almacen);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener almacén", error: error.message });
    }
};

// Crear un nuevo almacén
const createAlmacen = async (req, res) => {
    try {
        const { nombre, ubicacion } = req.body;
        const nuevoAlmacen = await Almacen.create({ nombre, ubicacion });
        res.status(201).json(nuevoAlmacen);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear almacén", error: error.message });
    }
};

// Actualizar un almacén
const updateAlmacen = async (req, res) => {
    try {
        const { nombre, ubicacion } = req.body;
        const almacen = await Almacen.findByPk(req.params.id);

        if (!almacen) {
            return res.status(404).json({ mensaje: "Almacén no encontrado" });
        }

        await almacen.update({ nombre, ubicacion });
        res.json(almacen);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar almacén", error: error.message });
    }
};

// Eliminar un almacén
const deleteAlmacen = async (req, res) => {
    try {
        const almacen = await Almacen.findByPk(req.params.id);

        if (!almacen) {
            return res.status(404).json({ mensaje: "Almacén no encontrado" });
        }

        await almacen.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar almacén", error: error.message });
    }
};

module.exports = {
    getAllAlmacenes,
    getAlmacenById,
    createAlmacen,
    updateAlmacen,
    deleteAlmacen
};
