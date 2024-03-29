const {
  addNewMovie,
  getAllMovies,
  getMovieById,
  mostPopular,
  recentMovies,
  deleteMovies,
  patchMovies,
  avgRatingMovies,
  movieToPdf,
} = require("../Controllers/movieControllers");

const { verifyToken, verifyAdmin } = require("../Middlewares/auth");
const router = require("express").Router();

/**
 * @swagger
 * /Movies/avgRatingMovies:
 *   get:
 *     summary: Obtiene la media de las peliculas
 *     description: Obtiene la valoración media de todas las películas en la base de datos
 *     responses:
 *       200:
 *         description: Valoración media obtenida correctamente
 *       400:
 *         description: Error en la solicitud, verifique los datos enviados.
 */
router.get("/avgRatingMovies", avgRatingMovies);

/**
 * @swagger
 * /Movies/recentMovies:
 *   get:
 *     summary: Obtiene las películas ordenadas por fecha de creación
 *     description: Obtiene la lista de 10 películas ordenadas por fecha de creación
 *     responses:
 *       200:
 *         description: Películas obtenidas correctamente
 *       400:
 *         description: Error en la solicitud, verifique los datos enviados.
 */
router.get("/recentMovies", recentMovies);

/**
 * @swagger
 * /Movies/mostPopular:
 *   get:
 *     summary: Obtiene las películas mejor valoradas
 *     description: Obtiene la lista de las 10 películas mejor valoradas en orden descendente
 *     responses:
 *       200:
 *         description: Películas obtenidas correctamente
 *       400:
 *         description: Error en la solicitud, verifique los datos enviados.
 */
router.get("/mostPopular", mostPopular);

/**
 * @swagger
 * /Movies/addNewMovie:
 *   post:
 *     summary: Añade una nueva película
 *     description: Añade una nueva película con la información proporcionada.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               director:
 *                 type: string
 *               rating:
 *                 type: string
 *               posterUrl:
 *                 type: string
 *               trailerUrl:
 *                 type: string
 *               year:
 *                 type: string
 *               createdAt:
 *                 type: string
 *             example:
 *               title: Título de la película
 *               description: Descripción de la película
 *               category: Género de la película
 *               director: Director de la película
 *               rating: Nota de la película
 *               posterUrl: URL del poster
 *               trailerUrl: URL del trailer
 *               year: Año de la película
 *               createdAt: Fecha de creación en la base de datos
 *     responses:
 *       201:
 *         description: Película añadida correctamente.
 *       400:
 *         description: Error en la solicitud, verifique los datos enviados.
 */
router.post("/addNewMovie", verifyAdmin, addNewMovie);

/**
 * @swagger
 * /Movies/getAllMovies:
 *   get:
 *     summary: Obtiene todas las películas
 *     description: Obtiene la coleccion completa de películas
 *     responses:
 *       200:
 *         description: Películas obtenidas correctamente
 *       400:
 *         description: Error en la solicitud, verifique los datos enviados.
 */
router.get("/getAllMovies", getAllMovies);
/**
 * @swagger
 * /Movies/{id}:
 *   get:
 *     summary: Obtiene una película determinada por id
 *     description: Obtiene una película determinada por id con la información proporcionada.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la película a obtener.
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Película obtenida correctamente.
 *       400:
 *         description: Error en la solicitud, verifique los datos enviados.
 */
router.get("/:id", getMovieById);

/**
 * @swagger
 * /Movies/{id}/movieToPdf:
 *   get:
 *     summary: Genera un archivo PDF de la película
 *     description: Genera un PDF del detalle de la película proporcionada por ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la película a obtener.
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Película obtenida correctamente.
 *       400:
 *         description: Error en la solicitud, verifique los datos enviados.
 */
router.get("/:id/movieToPdf", movieToPdf);

/**
 * @swagger
 * /Movies/{:id}:
 *   delete:
 *     summary: Elimina la película seleccionada
 *     description: Elimina una película por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la película a eliminar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Película eliminada correctamente
 *       400:
 *         description: Error en la solicitud, verifique los datos enviados.
 */
router.delete("/:id", verifyAdmin, deleteMovies);

/**
 * @swagger
 * /Movies/patchMovies:
 *   patch:
 *     summary: Actualiza los datos de un usuario
 *     description: Actualiza un usuario con la información proporcionada.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la pelicula a actualizar.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               director:
 *                 type: string
 *               rating:
 *                 type: string
 *               posterUrl:
 *                 type: string
 *               trailerUrl:
 *                 type: string
 *               year:
 *                 type: string
 *               createdAt:
 *                 type: string
 *             example:
 *               title: Título de la película
 *               description: Descripción de la película
 *               category: Género de la película
 *               director: Director de la película
 *               rating: Nota de la película
 *               posterUrl: URL del poster
 *               trailerUrl: URL del trailer
 *               year: Año de la película
 *               createdAt: Fecha de creación en la base de datos
 *     responses:
 *       201:
 *         description: Usuario creado correctamente.
 *       400:
 *         description: Error en la solicitud, verifique los datos enviados.
 */
router.patch("/:id", verifyAdmin, patchMovies);
module.exports = router;
