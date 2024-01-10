const movieModel = require("../Models/movieModels");
const PDFDocument = require("pdfkit");

const addNewMovie = async (req, res) => {
  console.log(req.user);
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
    await movie.save();
    res
      .status(200)
      .json({ status: "La película se ha actualizado correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", product: null, error: error.message });
  }
};

const avgRatingMovies = async (req, res) => {
  try {
    const movie = await movieModel.aggregate([
      {
        $addFields: {
          ratingNumeric: { $toDouble: "$rating" }, // Convierte el campo rating a tipo numérico
        },
      },
      {
        $group: {
          _id: null,
          mediaRating: { $avg: "$ratingNumeric" },
        },
      },
    ]);
    const roundedRating = parseFloat(movie[0].mediaRating.toFixed(2));
    console.log(movie);
    res.status(200).json({
      status: `La valoracion media de todas las películas es: ${parseFloat(
        roundedRating.toFixed(2)
      )}`,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", product: null, error: error.message });
  }
};

const movieToPdf = async (req, res) => {
  try {
    const movieId = req.params.id;
    const movie = await movieModel.findById(movieId);
    const doc = new PDFDocument();

    const buffers = [];
    doc.on("data", (chunk) => buffers.push(chunk));

    doc.fontSize(20).text(`${movie.title}`, { align: "center" });
    doc.moveDown();
    doc.moveDown();
    doc.text(`Descripción: ${movie.description}`);
    doc.moveDown();
    doc.text(`Género: ${movie.category}`);
    doc.moveDown();
    doc.text(`Director: ${movie.director}`);
    doc.moveDown();
    doc.text(`Rating: ${movie.rating}`);
    doc.moveDown();

    doc.text(`Año: ${movie.year}`);

    doc.moveDown();

    doc.on("end", () => {
      const pdfBuffer = Buffer.concat(buffers);
      res.setHeader("Content-Type", "application/pdf");
      res.status(200).send(pdfBuffer);
    });
    doc.end();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al generar el PDF", error: error.message });
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
  avgRatingMovies,
  movieToPdf,
};
