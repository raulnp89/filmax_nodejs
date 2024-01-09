const userModel = require("../Models/userModels");
const movieModel = require("../Models/movieModels");
const bcrypt = require("bcrypt");
const { verifyToken, refreshToken } = require("../Middlewares/auth");
const jwt = require("jsonwebtoken");

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
    if (error.code === 11000) {
      return res
        .status(200)
        .json({ status: "Failed", data: null, error: "El correo ya existe" });
    }
    res
      .status(500)
      .json({ status: "Error al crear el usuario", error: error.message });
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
        const token = generateToken(
          { id: user.id, email: user.email, role: user.role },
          false
        );
        const refreshToken = generateToken(
          { id: user.id, email: user.email, role: user.role },
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
        return;
      }
    }
    res.status(404).json({ status: "failed", data: null });
  } catch (error) {
    res.status(500).json({
      error: "Error al hacer login",
      error: error.message,
      data: null,
    });
  }
};

const generateToken = (user, isRefreshToken) => {
  if (isRefreshToken) {
    return jwt.sign(user, process.env.REFRESH_TOKEN, {
      expiresIn: "600min",
    });
  }
  return jwt.sign(user, process.env.TOKEN_SECRET, {
    expiresIn: "150min",
  });
};

const addFavorite = async (req, res) => {
  try {
    const userId = req.user.id;
    const movieId = req.params.id;
    const user = await userModel.findById(userId);
    if (user.favorites.includes(movieId)) {
      return res
        .status(200)
        .json({ status: "La película ya existe en favoritos" });
    }
    user.favorites.push(movieId);
    await user.save();
    res.status(200).json({ status: "La película se ha añadido a favoritos" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const showFavorites = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userModel.findById(userId);
    const listMovies = [];
    for (const movieId of user.favorites) {
      console.log(movieId);
      const movie = await movieModel.findById(movieId);
      listMovies.push(movie.title);
    }
    res.status(200).json({ status: "success", listMovies });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteFavorite = async (req, res) => {
  try {
    const userId = req.user.id;
    const movieId = req.params.id;
    const user = await userModel.findById(userId);
    const index = user.favorites.indexOf(movieId);
    if (index == -1) {
      res
        .status(200)
        .json({ status: "La película no se encuentra en favoritos" });
    }
    user.favorites.splice(index, 1);
    await user.save();
    res
      .status(200)
      .json({ status: "La película se ha eliminado de favoritos" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  signUp,
  login,
  generateToken,
  addFavorite,
  showFavorites,
  deleteFavorite,
};
