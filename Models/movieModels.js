const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: [String],
    required: true,
    enum: [
      "Action",
      "Thriller",
      "Horror",
      "Drama",
      "Comedy",
      "Adventure",
      "Science-fiction",
      "Documentary",
      "Animated-film",
      "Crime",
      "Fantasy",
      "War",
      "Musical",
      "Romance",
    ],
  },
  director: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  posterUrl: {
    type: String,
    required: true,
  },
  trailerUrl: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const movie = mongoose.model("Movie", movieSchema, "Movies");
module.exports = movie;
