const express = require("express");
const sequelize = require("./settings/db");
const authMiddleware = require("./middleware/authentification");

// Importar las asociaciones de modelos
require("./models");

// ROUTES
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const categoriaRoutes = require("./routes/categoria.routes");
const proveedorRoutes = require("./routes/proveedor.routes");
const almacenRoutes = require("./routes/almacen.routes");
const productoRoutes = require("./routes/producto.routes");
const movimientoRoutes = require("./routes/movimiento.routes");

const app = express();
app.use(express.json());

// RUTAS PÚBLICAS
app.use("/auth", authRoutes);

// RUTAS PROTEGIDAS
app.use("/u", authMiddleware, userRoutes);
app.use("/categorias", authMiddleware, categoriaRoutes);
app.use("/proveedores", authMiddleware, proveedorRoutes);
app.use("/almacenes", authMiddleware, almacenRoutes);
app.use("/productos", authMiddleware, productoRoutes);
app.use("/movimientos", authMiddleware, movimientoRoutes);

// CONEXIÓN Y SINCRONIZACIÓN DE BASE DE DATOS
sequelize.authenticate()
    .then(() => {
        console.log("✓ Conectado a la base de datos");
        // Sincronizar modelos (crear/actualizar tablas)
        return sequelize.sync({ alter: true });
    })
    .then(() => {
        console.log("✓ Tablas sincronizadas correctamente");
    })
    .catch(err => console.error("✗ Error en la base de datos:", err));

module.exports = app;