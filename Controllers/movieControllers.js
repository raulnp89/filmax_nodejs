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

const mostPopular = async (req, res) => {
  try {
    const movie = await movieModel.find().sort({ rating: -1 }).limit(10);
    console.log(movie);
    res.status(200).json({ status: "Success", movie });
  } catch (error) {
    res.status(500).json({ status: "No se encontraron las películas" });
  }
};

const recentMovies = async (req, res) => {
  try {
    const movie = await movieModel.find().sort({ createdAt: 1 });
    res.status(200).json({ status: "Success", movie });
  } catch (error) {
    res.status(500).json({ status: "No se encontraron las películas" });
  }
};

const deleteMovies = async (req, res) => {
  try {
    const movieId = req.params.id;
    const movie = await movieModel.findById(movieId);
    if (!movie) {
      return res.status(404).send("La película no existe");
    }
    await movieModel.findByIdAndDelete(movieId);
    res
      .status(200)
      .send({ status: "La película se ha eliminado correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", product: null, error: error.message });
  }
};

const patchMovies = async (req, res) => {
  try {
    const movieId = req.params.id;
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
    const movie = await movieModel.findById(movieId);
    if (!movie) {
      return res.status(404).send("La película no existe");
    }
    if (title) {
      movie.title = title;
    }
    if (description) {
      movie.description = description;
    }
    if (category) {
      movie.category = category;
    }
    if (director) {
      movie.director = director;
    }
    if (rating) {
      movie.rating = rating;
    }
    if (posterUrl) {
      movie.posterUrl = posterUrl;
    }
    if (trailerUrl) {
      movie.trailerUrl = trailerUrl;
    }
    if (year) {
      movie.year = year;
    }
    await movie.save;
    res
      .status(200)
      .json({ status: "La película se ha actualizado correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", product: null, error: error.message });
  }
};

module.exports = {
  addNewMovie,
  getAllMovies,
  getMovieById,
  mostPopular,
  recentMovies,
  deleteMovies,
  patchMovies,
};
