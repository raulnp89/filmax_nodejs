const {
  addNewMovie,
  getAllMovies,
  getMovieById,
} = require("../Controllers/movieControllers");

const verifyToken = require("../Middlewares/auth");
const router = require("express").Router();

router.post("/addNewMovie", addNewMovie);

router.get("/getAllMovies", getAllMovies);
router.get("/:id", getMovieById);

module.exports = router;
