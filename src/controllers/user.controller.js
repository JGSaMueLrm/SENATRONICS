const User = require("../models/user");
const bcrypt = require("bcryptjs");

// CRUD USERS

module.exports = {
    async listUsers(req, res) {
        try {
            const users = await User.findAll();
            res.json(users);
        } catch (error) {
            res.status(500).json({ mensaje: "Error al obtener usuarios", error: error.message });
        }
    },
    async createUser(req, res) {
        try {
            const { username, password, nombre, rol, email } = req.body;

            // Validar campos requeridos
            if (!username || !password || !nombre || !rol) {
                return res.status(400).json({ mensaje: "Faltan campos requeridos" });
            }

            const password_hashed = await bcrypt.hash(password, 10);

            const user_new = await User.create({
                username,
                password: password_hashed,
                nombre,
                rol,
                email,
                activo: true
            });

            // No devolver la contraseña
            const userResponse = { ...user_new.toJSON() };
            delete userResponse.password;

            res.status(201).json(userResponse);
        } catch (error) {
            res.status(500).json({ mensaje: "Error al crear usuario", error: error.message });
        }
    },
    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { username, password, nombre, rol, email } = req.body;

            const updateData = { username, nombre, rol, email };

            if (password) {
                updateData.password = await bcrypt.hash(password, 10);
            }

            await User.update(updateData, { where: { id_usuario: id } });
            res.json({ mensaje: "Usuario actualizado" });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al actualizar usuario", error: error.message });
        }
    },
    async destroidUser(req, res) {
        try {
            const { id } = req.params;
            await User.destroy({ where: { id_usuario: id } });
            res.json({ mensaje: "Usuario eliminado" });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al eliminar usuario", error: error.message });
        }
    },
};