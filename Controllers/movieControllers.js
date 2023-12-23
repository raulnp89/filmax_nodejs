const movieModel = require("../Models/movieModels");

const addNewMovie = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      director,
      rating,
      posterUrl,
      trailerUrl,
      year,
    } = req.body;
    const newMovie = new movieModel({
      title,
      description,
      category,
      director,
      rating,
      posterUrl,
      trailerUrl,
      year,
    });
    await newMovie.save();
    res
      .status(201)
      .json({ status: "La película se ha insertado correctamente" });
  } catch (error) {
    res.status(500).json({ status: "Error al añadir la película" });
  }
};

const getAllMovies = async (req, res) => {
  try {
    const movie = await movieModel.find();
    res.status(200).json({ status: "success", movie });
  } catch (error) {
    res.status(500).json({ status: "No se encontraron las películas" });
  }
};

const getMovieById = async (req, res) => {
  try {
    const movieId = req.params.id;
    const movie = await movieModel.findById(movieId);
    res.status(200).json({ status: "Success", movie });
  } catch (error) {
    res.status(500).json({ status: "No se encontró la película" });
  }
};

module.exports = { addNewMovie, getAllMovies, getMovieById };
