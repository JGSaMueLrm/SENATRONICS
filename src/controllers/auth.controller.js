const { Usuario } = require("../models/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
    async register(req, res) {
        try {
            const { username, password, nombre, rol, email } = req.body;

            // Verificar si el usuario ya existe
            const existingUser = await Usuario.findOne({ where: { username } });
            if (existingUser) {
                return res.status(400).json({ mensaje: "El nombre de usuario ya está en uso" });
            }

            const password_hashed = await bcrypt.hash(password, 10);

            const new_user = await Usuario.create({
                username,
                password: password_hashed,
                nombre,
                rol,
                email,
                activo: true
            });

            res.status(201).json({
                mensaje: "Usuario creado exitosamente",
                usuario: {
                    id: new_user.id_usuario,
                    username: new_user.username,
                    nombre: new_user.nombre,
                    rol: new_user.rol
                }
            });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al registrar usuario", error: error.message });
        }
    },

    async login(req, res) {
        try {
            const { username, password } = req.body;

            console.log("Intento de login para:", username);

            if (!username || !password) {
                return res.status(400).json({ mensaje: "Usuario y contraseña son requeridos" });
            }

            // Buscar usuario por username
            const user = await Usuario.findOne({ where: { username } });

            if (!user) {
                return res.status(404).json({ mensaje: "Usuario no encontrado" });
            }

            if (!user.activo) {
                return res.status(403).json({ mensaje: "Usuario inactivo" });
            }

            const user_valid = await bcrypt.compare(password, user.password);

            if (!user_valid) {
                return res.status(401).json({ mensaje: "Contraseña incorrecta" });
            }

            const token = jwt.sign(
                {
                    id: user.id_usuario,
                    username: user.username,
                    rol: user.rol
                },
                "clavesecreta",
                { expiresIn: '8h' }
            );

            res.json({
                mensaje: "Login exitoso",
                token,
                usuario: {
                    id: user.id_usuario,
                    nombre: user.nombre,
                    rol: user.rol,
                    email: user.email
                }
            });
        } catch (error) {
            console.error("Error en login:", error);
            res.status(500).json({ mensaje: "Error en el servidor", error: error.message });
        }
    },

    async logout(req, res) {
        res.json({ mensaje: "Logout exitoso" });
    }
};