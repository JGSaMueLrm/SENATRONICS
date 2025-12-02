# Sistema de Inventario SENATRONICS

Sistema completo de gestión de inventario desarrollado con Node.js, Express y MySQL.

## 🚀 Características

- ✅ 6 entidades principales (Usuario, Categoría, Proveedor, Almacén, Producto, Movimiento_Inventario)
- ✅ API REST completa con autenticación JWT
- ✅ Gestión automática de stock
- ✅ Relaciones entre entidades (Foreign Keys)
- ✅ Datos de ejemplo incluidos
- ✅ Control de acceso basado en roles

## 📋 Requisitos

- Node.js v14+
- MySQL 5.7+
- npm

## 🔧 Instalación

```bash
# 1. Crear base de datos en MySQL
CREATE DATABASE `senati-db`;

# 2. Instalar dependencias
npm install

# 3. Cargar datos de ejemplo
node seed.js

# 4. Iniciar servidor
node server.js
```

El servidor correrá en `http://localhost:3000`

## 🔑 Credenciales de Prueba

- **Admin**: `admin` / `admin123`
- **Almacenero**: `maria.garcia` / `maria123`

## 📚 Documentación de API

### Base URL
```
http://localhost:3000
```

### Autenticación

Para rutas protegidas (🔒), incluye el header:
```
Authorization: Bearer <TOKEN>
```

---

### 1️⃣ Autenticación

#### Login
**POST** `http://localhost:3000/auth/login`
```json
{
  "username": "admin",
  "password": "admin123"
}
```

#### Registro
**POST** `http://localhost:3000/auth/register`
```json
{
  "username": "nuevo.usuario",
  "password": "password123",
  "nombre": "Nombre Completo",
  "rol": "vendedor",
  "email": "email@test.com"
}
```

---

### 2️⃣ Usuarios (Público)

#### Ver Todos
**GET** `http://localhost:3000/usuarios`

#### Crear Usuario
**POST** `http://localhost:3000/usuarios`
```json
{
  "username": "vendedor1",
  "password": "123",
  "nombre": "Juan Vendedor",
  "rol": "vendedor",
  "email": "juan@test.com"
}
```

#### Actualizar Usuario 🔒
**PUT** `http://localhost:3000/usuarios/:id`
```json
{
  "nombre": "Juan Actualizado",
  "rol": "supervisor"
}
```

#### Eliminar Usuario 🔒
**DELETE** `http://localhost:3000/usuarios/:id`

---

### 3️⃣ Productos 🔒

#### Ver Todos
**GET** `http://localhost:3000/productos`

#### Ver Uno
**GET** `http://localhost:3000/productos/:id`

#### Ver Bajo Stock
**GET** `http://localhost:3000/productos/bajo-stock`

#### Crear
**POST** `http://localhost:3000/productos`
```json
{
  "nombre": "Mouse Gamer",
  "marca": "Logitech",
  "modelo": "G203",
  "categoria": "Electrónica",
  "precio_compra": 50,
  "precio_venta": 80,
  "stock_actual": 20,
  "stock_minimo": 5,
  "id_proveedor": 1,
  "id_almacen": 1
}
```

#### Actualizar
**PUT** `http://localhost:3000/productos/:id`
```json
{
  "precio_venta": 85.00,
  "stock_minimo": 10
}
```

#### Eliminar
**DELETE** `http://localhost:3000/productos/:id`

---

### 4️⃣ Categorías 🔒

#### Ver Todas
**GET** `http://localhost:3000/categorias`

#### Ver Una
**GET** `http://localhost:3000/categorias/:id`

#### Crear
**POST** `http://localhost:3000/categorias`
```json
{
  "nombre": "Muebles",
  "descripcion": "Sillas y escritorios"
}
```

#### Actualizar
**PUT** `http://localhost:3000/categorias/:id`
```json
{
  "descripcion": "Muebles de oficina ergonómicos"
}
```

#### Eliminar
**DELETE** `http://localhost:3000/categorias/:id`

---

### 5️⃣ Proveedores 🔒

#### Ver Todos
**GET** `http://localhost:3000/proveedores`

#### Ver Uno
**GET** `http://localhost:3000/proveedores/:id`

#### Crear
**POST** `http://localhost:3000/proveedores`
```json
{
  "nombre": "Sillas Peru SAC",
  "telefono": "999000111",
  "correo": "ventas@sillas.pe",
  "direccion": "Av. Industrial 555"
}
```

#### Actualizar
**PUT** `http://localhost:3000/proveedores/:id`
```json
{
  "telefono": "999000222"
}
```

#### Eliminar
**DELETE** `http://localhost:3000/proveedores/:id`

---

### 6️⃣ Almacenes 🔒

#### Ver Todos
**GET** `http://localhost:3000/almacenes`

#### Ver Uno
**GET** `http://localhost:3000/almacenes/:id`

#### Crear
**POST** `http://localhost:3000/almacenes`
```json
{
  "nombre": "Almacén Norte",
  "ubicacion": "Trujillo"
}
```

#### Actualizar
**PUT** `http://localhost:3000/almacenes/:id`
```json
{
  "ubicacion": "Trujillo - Centro"
}
```

#### Eliminar
**DELETE** `http://localhost:3000/almacenes/:id`

---

### 7️⃣ Movimientos de Inventario 🔒

> **Nota**: Los movimientos son registros históricos. Solo se pueden crear y consultar, no modificar ni eliminar.

#### Ver Todos
**GET** `http://localhost:3000/movimientos`

#### Ver Uno
**GET** `http://localhost:3000/movimientos/:id`

#### Registrar Movimiento
**POST** `http://localhost:3000/movimientos`

Actualiza automáticamente el stock del producto.

```json
{
  "id_producto": 1,
  "tipo_movimiento": "entrada",
  "cantidad": 5,
  "usuario_responsable": "admin",
  "motivo": "Compra de lote extra"
}
```

**Tipos válidos**: `"entrada"`, `"salida"`, `"ajuste"`

---

## 📦 Estructura del Proyecto

```
SENATRONICS/
├── src/
│   ├── models/          # Modelos Sequelize
│   │   ├── user.js
│   │   ├── producto.js
│   │   ├── categoria.js
│   │   ├── proveedor.js
│   │   ├── almacen.js
│   │   └── movimiento-inventario.js
│   ├── controllers/     # Lógica de negocio
│   ├── routes/          # Rutas REST
│   ├── middleware/      # Autenticación JWT
│   │   └── authentification.js
│   └── settings/        # Configuración
│       └── db.js
├── seed.js              # Datos de ejemplo
├── server.js            # Punto de entrada
└── package.json
```

## 🛠️ Tecnologías

- **Express.js** - Framework web
- **Sequelize ORM** - Manejo de base de datos
- **MySQL** - Base de datos
- **JWT** - Autenticación
- **bcryptjs** - Encriptación de contraseñas

## 🔐 Seguridad

- Contraseñas encriptadas con bcrypt
- Autenticación JWT con tokens de 8 horas
- Rutas protegidas por middleware
- Validación de datos en controladores

## 📝 Notas Importantes

1. **IDs Auto-incrementales**: Los IDs no se reinician al eliminar registros (comportamiento normal de MySQL)
2. **Movimientos**: No se pueden editar/eliminar para mantener integridad del historial
3. **PATCH vs PUT**: Este proyecto usa PUT para actualizaciones (puedes enviar solo los campos a cambiar)
4. **Usuarios Públicos**: GET y POST de usuarios son públicos para permitir registro

## 📄 Licencia

ISC
