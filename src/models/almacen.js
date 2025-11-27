const { DataTypes } = require("sequelize");
const sequelize = require("../settings/db");

const Almacen = sequelize.define(
    "Almacen",
    {
        id_almacen: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        ubicacion: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        capacidad: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        responsable: {
            type: DataTypes.STRING(100),
            allowNull: true
        }
    },
    {
        tableName: "almacen",
        timestamps: false
    }
);

module.exports = Almacen;
