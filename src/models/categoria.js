const { DataTypes } = require("sequelize");
const sequelize = require("../settings/db");

const Categoria = sequelize.define(
    "Categoria",
    {
        id_categoria: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        codigo: {
            type: DataTypes.STRING(20),
            allowNull: true,
            unique: true
        },
        activo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    },
    {
        tableName: "categoria",
        timestamps: false
    }
);

module.exports = Categoria;
