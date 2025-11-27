const MovimientoInventario = require('../models/movimiento-inventario');
const Producto = require('../models/producto');

// Obtener todos los movimientos
const getAllMovimientos = async (req, res) => {
    try {
        const movimientos = await MovimientoInventario.findAll({
            include: [{ model: Producto, as: 'producto' }],
            order: [['fecha', 'DESC']]
        });
        res.json(movimientos);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener movimientos", error: error.message });
    }
};

// Obtener un movimiento por ID
const getMovimientoById = async (req, res) => {
    try {
        const movimiento = await MovimientoInventario.findByPk(req.params.id, {
            include: [{ model: Producto, as: 'producto' }]
        });

        if (!movimiento) {
            return res.status(404).json({ mensaje: "Movimiento no encontrado" });
        }
        res.json(movimiento);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener movimiento", error: error.message });
    }
};

// Obtener movimientos por producto
const getMovimientosByProducto = async (req, res) => {
    try {
        const movimientos = await MovimientoInventario.findAll({
            where: { id_producto: req.params.id_producto },
            include: [{ model: Producto, as: 'producto' }],
            order: [['fecha', 'DESC']]
        });
        res.json(movimientos);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener movimientos del producto", error: error.message });
    }
};

// Crear un nuevo movimiento (y actualizar stock)
const createMovimiento = async (req, res) => {
    try {
        const { id_producto, tipo_movimiento, cantidad, usuario_responsable, motivo } = req.body;

        // Buscar el producto
        const producto = await Producto.findByPk(id_producto);
        if (!producto) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }

        // Calcular nuevo stock según tipo de movimiento
        let nuevoStock = producto.stock_actual;

        if (tipo_movimiento === 'entrada') {
            nuevoStock += cantidad;
        } else if (tipo_movimiento === 'salida') {
            nuevoStock -= cantidad;
            if (nuevoStock < 0) {
                return res.status(400).json({ mensaje: "Stock insuficiente para la salida" });
            }
        } else if (tipo_movimiento === 'ajuste') {
            nuevoStock = cantidad; // El ajuste establece el stock exacto
        }

        // Actualizar el stock del producto
        await producto.update({ stock_actual: nuevoStock });

        // Crear el movimiento
        const nuevoMovimiento = await MovimientoInventario.create({
            id_producto,
            tipo_movimiento,
            cantidad,
            fecha: new Date(),
            usuario_responsable,
            motivo
        });

        res.status(201).json({
            movimiento: nuevoMovimiento,
            stock_anterior: producto.stock_actual,
            stock_nuevo: nuevoStock
        });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear movimiento", error: error.message });
    }
};

module.exports = {
    getAllMovimientos,
    getMovimientoById,
    getMovimientosByProducto,
    createMovimiento
};
