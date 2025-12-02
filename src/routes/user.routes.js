const express = require("express");
const controller = require("../controllers/user.controller");
const authMiddleware = require("../middleware/authentification");
const router = express.Router();

// GET /usuarios - Público
router.get("/", controller.listUsers);

// POST /usuarios - Público (Registro)
router.post("/", controller.createUser);

// PUT /usuarios/:id - Protegido
router.put("/:id", authMiddleware, controller.updateUser);

// DELETE /usuarios/:id - Protegido
router.delete("/:id", authMiddleware, controller.destroidUser);

module.exports = router;