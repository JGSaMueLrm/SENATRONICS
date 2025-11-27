const Producto = require('../models/producto');
const Proveedor = require('../models/proveedor');
const Almacen = require('../models/almacen');

// Obtener todos los productos
const getAllProductos = async (req, res) => {
    try {
        const productos = await Producto.findAll({
            include: [
                { model: Proveedor, as: 'proveedor' },
                { model: Almacen, as: 'almacen' }
            ]
        });
        res.json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener productos", error: error.message });
    }
};

// Obtener un producto por ID
const getProductoById = async (req, res) => {
    try {
        const producto = await Producto.findByPk(req.params.id, {
            include: [
                { model: Proveedor, as: 'proveedor' },
                { model: Almacen, as: 'almacen' }
            ]
        });

        if (!producto) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }
        res.json(producto);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener producto", error: error.message });
    }
};

// Crear un nuevo producto
const createProducto = async (req, res) => {
    try {
        const {
            nombre, marca, modelo, categoria, descripcion,
            precio_compra, precio_venta, stock_actual, stock_minimo,
            id_proveedor, id_almacen
        } = req.body;

        const nuevoProducto = await Producto.create({
            nombre, marca, modelo, categoria, descripcion,
            precio_compra, precio_venta, stock_actual, stock_minimo,
            id_proveedor, id_almacen
        });

        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear producto", error: error.message });
    }
};

// Actualizar un producto
const updateProducto = async (req, res) => {
    try {
        const producto = await Producto.findByPk(req.params.id);

        if (!producto) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }

        await producto.update(req.body);
        res.json(producto);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar producto", error: error.message });
    }
};

// Eliminar un producto
const deleteProducto = async (req, res) => {
    try {
        const producto = await Producto.findByPk(req.params.id);

        if (!producto) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }

        await producto.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar producto", error: error.message });
    }
};

// Obtener productos con stock bajo
const getProductosBajoStock = async (req, res) => {
    try {
        const productos = await Producto.findAll({
            where: {
                stock_actual: {
                    [require('sequelize').Op.lte]: require('sequelize').col('stock_minimo')
                }
            },
            include: [
                { model: Proveedor, as: 'proveedor' },
                { model: Almacen, as: 'almacen' }
            ]
        });
        res.json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener productos bajo stock", error: error.message });
    }
};

module.exports = {
    getAllProductos,
    getProductoById,
    createProducto,
    updateProducto,
    deleteProducto,
    getProductosBajoStock
};
