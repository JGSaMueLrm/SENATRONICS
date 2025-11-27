# Sistema de Inventario - Backend Express

Sistema completo de gestión de inventario desarrollado con Node.js, Express y MySQL.

## 🚀 Características

- ✅ 6 entidades principales (Usuario, Categoría, Proveedor, Almacén, Producto, Movimiento_Inventario)
- ✅ API REST completa con autenticación JWT
- ✅ Gestión automática de stock
- ✅ Relaciones entre entidades (Foreign Keys)
- ✅ Datos de ejemplo incluidos

## 📋 Requisitos

- Node.js v14+
- MySQL 5.7+
- npm o yarn

## 🔧 Instalación

```bash
# Instalar dependencias
npm install

# Configurar base de datos en src/settings/db.js
# Base de datos: senati-db
# Usuario: root
# Contraseña: (vacía por defecto)

# Cargar datos de ejemplo
node seed.js

# Iniciar servidor
node server.js
```

## 🌐 Endpoints

- **Autenticación**: `/auth/login`, `/auth/register`
- **Categorías**: `/categorias`
- **Proveedores**: `/proveedores`
- **Almacenes**: `/almacenes`
- **Productos**: `/productos`
- **Movimientos**: `/movimientos`

## 🔑 Credenciales de Prueba

- Usuario: `admin` / Contraseña: `admin123`
- Usuario: `maria.garcia` / Contraseña: `maria123`

## 📦 Estructura del Proyecto

```
backend-express/
├── src/
│   ├── models/          # Modelos de Sequelize
│   ├── controllers/     # Lógica de negocio
│   ├── routes/          # Rutas REST
│   ├── middleware/      # Autenticación JWT
│   └── settings/        # Configuración DB
├── seed.js              # Datos de ejemplo
└── server.js            # Punto de entrada
```

## 🛠️ Tecnologías

- Express.js
- Sequelize ORM
- MySQL
- JWT (jsonwebtoken)
- bcryptjs

## 📄 Licencia

ISC
