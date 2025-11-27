const { DataTypes } = require("sequelize");
const sequelize = require("../settings/db");

const Proveedor = sequelize.define(
    "Proveedor",
    {
        id_proveedor: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        telefono: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        correo: {
            type: DataTypes.STRING(100),
            allowNull: true,
            validate: {
                isEmail: true
            }
        },
        direccion: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        ruc: {
            type: DataTypes.STRING(11),
            allowNull: true,
            unique: true
        },
        contacto: {
            type: DataTypes.STRING(100),
            allowNull: true
        }
    },
    {
        tableName: "proveedor",
        timestamps: false
    }
);

module.exports = Proveedor;
