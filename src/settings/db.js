const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    "senati-db",
    "root",
    "",
    {
        host: "localhost",
        dialect: "mysql",
        logging: false, // Cambiar a console.log para ver las queries SQL
        timezone: "-05:00" // Zona horaria de Perú
    }
);

module.exports = sequelize;