const userModel = require("../Models/userModels");
const bcrypt = require("bcrypt");
const { generateToken } = require("../Utils/utils");
const { verifyToken, refreshToken } = require("../Middlewares/auth");

const signUp = async (req, res) => {
  try {
    const newUser = new userModel({
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
      role: req.body.role,
    });
    await newUser.save();
    res.status(201).json({
      status: "Success",
      message: "Usuario creado correctamente",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({ status: "Error al crear el usuario" });
    if (error.code === 11000) {
      return res
        .status(200)
        .json({ status: "Failed", data: null, error: "El correo ya existe" });
    }
  }
};

const login = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (user) {
      const validatePassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (validatePassword) {
        const token = generateToken({ id: user.id, email: user.email }, false);
        const refreshToken = generateToken(
          { id: user.id, email: user.email },
          true
        );
        console.log(token);
        res.status(200).json({
          status: "succeeded",
          data: {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token,
            refreshToken: refreshToken,
          },
          error: null,
        });
        return; // Agregamos esta línea para salir de la función después de enviar la respuesta exitosa
      }
    }
    // Si no se cumple ninguna de las condiciones anteriores, enviamos la respuesta de error
    res.status(404).json({ status: "failed", data: null });
  } catch (error) {
    res.status(500).json({ error: "Error al hacer login", data: null });
  }
};



module.exports = { signUp, login };