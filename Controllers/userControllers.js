const userModel = require("../Models/userModels");
const bcrypt = require("bcrypt");


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
      return res.status(201).json({
        status: "Success",
        message: "User successfully logged in",
      });
    }
  } catch (error) {}
};

module.exports = { signUp, login };