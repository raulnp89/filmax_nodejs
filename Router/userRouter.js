const { signUp, login } = require("../Controllers/userControllers");
const verifyToken = require("../Middlewares/auth");
const router = require("express").Router();

/**
 * @swagger
 * /Users/signUp:
 *   post:
 *     summary: Crea un nuevo usuario
 *     description: Crea un nuevo usuario con la información proporcionada.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               name: Nombre del usuario
 *               email: usuario@example.com
 *               password: 123456
 *     responses:
 *       201:
 *         description: Usuario creado correctamente.
 *       400:
 *         description: Error en la solicitud, verifique los datos enviados.
 */
router.post("/signUp", signUp);
router.post("/login", login);

module.exports = router;
