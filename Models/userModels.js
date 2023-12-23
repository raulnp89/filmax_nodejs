const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [/^\S+@\S+\.\S+$/, "Correo incorrecto"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
    trim: true,
    minLength: 4,
  },
  role: {
    type: String,
    required: [true, "El rol es obligatorio"],
    enum: ["user", "admin"],
    default: "user",
  },
  favorites: {
    type: [String],
  },
});

const user = mongoose.model("User", userSchema, "Users");
module.exports = user;
