const Proveedor = require('../models/proveedor');

// Obtener todos los proveedores
const getAllProveedores = async (req, res) => {
    try {
        const proveedores = await Proveedor.findAll();
        res.json(proveedores);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener proveedores", error: error.message });
    }
};

// Obtener un proveedor por ID
const getProveedorById = async (req, res) => {
    try {
        const proveedor = await Proveedor.findByPk(req.params.id);
        if (!proveedor) {
            return res.status(404).json({ mensaje: "Proveedor no encontrado" });
        }
        res.json(proveedor);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener proveedor", error: error.message });
    }
};

// Crear un nuevo proveedor
const createProveedor = async (req, res) => {
    try {
        const { nombre, telefono, correo, direccion } = req.body;
        const nuevoProveedor = await Proveedor.create({ nombre, telefono, correo, direccion });
        res.status(201).json(nuevoProveedor);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear proveedor", error: error.message });
    }
};

// Actualizar un proveedor
const updateProveedor = async (req, res) => {
    try {
        const { nombre, telefono, correo, direccion } = req.body;
        const proveedor = await Proveedor.findByPk(req.params.id);

        if (!proveedor) {
            return res.status(404).json({ mensaje: "Proveedor no encontrado" });
        }

        await proveedor.update({ nombre, telefono, correo, direccion });
        res.json(proveedor);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar proveedor", error: error.message });
    }
};

// Eliminar un proveedor
const deleteProveedor = async (req, res) => {
    try {
        const proveedor = await Proveedor.findByPk(req.params.id);

        if (!proveedor) {
            return res.status(404).json({ mensaje: "Proveedor no encontrado" });
        }

        await proveedor.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar proveedor", error: error.message });
    }
};

module.exports = {
    getAllProveedores,
    getProveedorById,
    createProveedor,
    updateProveedor,
    deleteProveedor
};
