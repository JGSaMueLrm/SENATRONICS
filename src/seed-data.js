const bcrypt = require('bcryptjs');
const models = require('./models');
const { Usuario, Categoria, Proveedor, Almacen, Producto, MovimientoInventario } = models;

async function seedDatabase() {
    try {
        console.log('🌱 Iniciando carga de datos de ejemplo...');

        // 1. USUARIOS - 2 registros de ejemplo
        const usuariosData = [
            {
                nombre: 'Juan Pérez',
                rol: 'administrador',
                username: 'admin',
                password: await bcrypt.hash('admin123', 10),
                email: 'admin@inventario.com',
                activo: true
            },
            {
                nombre: 'María García',
                rol: 'almacenero',
                username: 'maria.garcia',
                password: await bcrypt.hash('maria123', 10),
                email: 'maria@inventario.com',
                activo: true
            }
        ];

        for (const userData of usuariosData) {
            await Usuario.findOrCreate({
                where: { username: userData.username },
                defaults: userData
            });
        }
        console.log('✓ Usuarios creados');

        // 2. CATEGORÍAS - 2 registros de ejemplo
        const categoriasData = [
            {
                nombre: 'Electrónica',
                descripcion: 'Productos electrónicos y tecnología',
                codigo: 'ELECT-001',
                activo: true
            },
            {
                nombre: 'Oficina',
                descripcion: 'Artículos y suministros de oficina',
                codigo: 'OFIC-001',
                activo: true
            }
        ];

        for (const categoriaData of categoriasData) {
            await Categoria.findOrCreate({
                where: { nombre: categoriaData.nombre },
                defaults: categoriaData
            });
        }
        console.log('✓ Categorías creadas');

        // 3. PROVEEDORES - 2 registros de ejemplo
        const proveedoresData = [
            {
                nombre: 'Tech Solutions SAC',
                telefono: '987654321',
                correo: 'ventas@techsolutions.com',
                direccion: 'Av. Tecnología 123, Lima',
                ruc: '20123456789',
                contacto: 'Carlos Ruiz'
            },
            {
                nombre: 'Distribuidora Nacional EIRL',
                telefono: '912345678',
                correo: 'contacto@disnacional.com',
                direccion: 'Jr. Comercio 456, Callao',
                ruc: '20987654321',
                contacto: 'Ana Torres'
            }
        ];

        for (const proveedorData of proveedoresData) {
            await Proveedor.findOrCreate({
                where: { ruc: proveedorData.ruc },
                defaults: proveedorData
            });
        }
        console.log('✓ Proveedores creados');

        // 4. ALMACENES - 2 registros de ejemplo
        const almacenesData = [
            {
                nombre: 'Almacén Central',
                ubicacion: 'Lima - San Juan de Lurigancho',
                capacidad: 500.00,
                responsable: 'Pedro Sánchez'
            },
            {
                nombre: 'Almacén Secundario',
                ubicacion: 'Callao - Ventanilla',
                capacidad: 250.00,
                responsable: 'Laura Mendoza'
            }
        ];

        for (const almacenData of almacenesData) {
            await Almacen.findOrCreate({
                where: { nombre: almacenData.nombre },
                defaults: almacenData
            });
        }
        console.log('✓ Almacenes creados');

        // Obtener IDs de registros creados
        const proveedor1 = await Proveedor.findOne({ where: { ruc: '20123456789' } });
        const proveedor2 = await Proveedor.findOne({ where: { ruc: '20987654321' } });
        const almacen1 = await Almacen.findOne({ where: { nombre: 'Almacén Central' } });
        const almacen2 = await Almacen.findOne({ where: { nombre: 'Almacén Secundario' } });

        // 5. PRODUCTOS - 2 registros de ejemplo
        const productosData = [
            {
                nombre: 'Laptop HP ProBook 450',
                marca: 'HP',
                modelo: 'ProBook 450 G8',
                categoria: 'Electrónica',
                descripcion: 'Laptop empresarial con procesador Intel Core i5, 8GB RAM, 256GB SSD',
                precio_compra: 2000.00,
                precio_venta: 2500.00,
                stock_actual: 15,
                stock_minimo: 5,
                id_proveedor: proveedor1.id_proveedor,
                id_almacen: almacen1.id_almacen,
                codigo_barras: '7891234567890',
                estado: 'activo'
            },
            {
                nombre: 'Escritorio de Oficina',
                marca: 'OfficePro',
                modelo: 'Ejecutivo 2000',
                categoria: 'Oficina',
                descripcion: 'Escritorio de oficina color nogal, 1.50m x 0.80m',
                precio_compra: 300.00,
                precio_venta: 450.00,
                stock_actual: 8,
                stock_minimo: 3,
                id_proveedor: proveedor2.id_proveedor,
                id_almacen: almacen2.id_almacen,
                codigo_barras: '7899876543210',
                estado: 'activo'
            }
        ];

        for (const productoData of productosData) {
            await Producto.findOrCreate({
                where: { codigo_barras: productoData.codigo_barras },
                defaults: productoData
            });
        }
        console.log('✓ Productos creados');

        // Obtener productos creados
        const producto1 = await Producto.findOne({ where: { codigo_barras: '7891234567890' } });
        const producto2 = await Producto.findOne({ where: { codigo_barras: '7899876543210' } });

        // 6. MOVIMIENTOS DE INVENTARIO - 2 registros de ejemplo
        const movimientosData = [
            {
                id_producto: producto1.id_producto,
                tipo_movimiento: 'entrada',
                cantidad: 10,
                fecha: new Date(),
                usuario_responsable: 'Juan Pérez',
                motivo: 'Compra inicial de inventario',
                documento: 'FACT-001-2024',
                observaciones: 'Primera compra del mes, productos en excelente estado'
            },
            {
                id_producto: producto2.id_producto,
                tipo_movimiento: 'entrada',
                cantidad: 5,
                fecha: new Date(),
                usuario_responsable: 'María García',
                motivo: 'Reposición de stock',
                documento: 'FACT-002-2024',
                observaciones: 'Reposición mensual programada'
            }
        ];

        for (const movimientoData of movimientosData) {
            await MovimientoInventario.create(movimientoData);
        }
        console.log('✓ Movimientos de inventario creados');

        console.log('\n✅ ¡Datos de ejemplo cargados exitosamente!');
        console.log('\n📊 Resumen:');
        console.log('   - 2 Usuarios');
        console.log('   - 2 Categorías');
        console.log('   - 2 Proveedores');
        console.log('   - 2 Almacenes');
        console.log('   - 2 Productos');
        console.log('   - 2 Movimientos de Inventario');
        console.log('\n🔑 Credenciales de prueba:');
        console.log('   Usuario: admin / Contraseña: admin123');
        console.log('   Usuario: maria.garcia / Contraseña: maria123\n');

    } catch (error) {
        console.error('❌ Error al cargar datos:', error);
    }
}

module.exports = seedDatabase;
