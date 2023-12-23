const {
  addNewMovie,
  getAllMovies,
} = require("../Controllers/movieControllers");

const verifyToken = require("../Middlewares/auth");
const router = require("express").Router();

router.post("/addNewMovie", addNewMovie);

module.exports = router;
