// Archivo central para definir todas las relaciones entre modelos
const Usuario = require('./user');
const Categoria = require('./categoria');
const Proveedor = require('./proveedor');
const Almacen = require('./almacen');
const Producto = require('./producto');
const MovimientoInventario = require('./movimiento-inventario');

// Definir relaciones

// Proveedor -> Producto (Un proveedor puede tener muchos productos)
Proveedor.hasMany(Producto, {
    foreignKey: 'id_proveedor',
    as: 'productos'
});
Producto.belongsTo(Proveedor, {
    foreignKey: 'id_proveedor',
    as: 'proveedor'
});

// Almacen -> Producto (Un almacén puede tener muchos productos)
Almacen.hasMany(Producto, {
    foreignKey: 'id_almacen',
    as: 'productos'
});
Producto.belongsTo(Almacen, {
    foreignKey: 'id_almacen',
    as: 'almacen'
});

// Producto -> MovimientoInventario (Un producto puede tener muchos movimientos)
Producto.hasMany(MovimientoInventario, {
    foreignKey: 'id_producto',
    as: 'movimientos'
});
MovimientoInventario.belongsTo(Producto, {
    foreignKey: 'id_producto',
    as: 'producto'
});

module.exports = {
    Usuario,
    Categoria,
    Proveedor,
    Almacen,
    Producto,
    MovimientoInventario
};
