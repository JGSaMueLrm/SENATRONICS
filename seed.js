// Script para ejecutar la carga de datos de ejemplo
const sequelize = require('./src/settings/db');
const seedDatabase = require('./src/seed-data');

async function run() {
    try {
        // Conectar a la base de datos
        await sequelize.authenticate();
        console.log('✓ Conectado a la base de datos\n');

        // Sincronizar modelos (crear tablas si no existen)
        await sequelize.sync({ alter: true });
        console.log('✓ Tablas sincronizadas\n');

        // Cargar datos de ejemplo
        await seedDatabase();

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

run();
