const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// VALIDATION MIDDLEWARE

/**
 * checks that route param matches valid movie ID, else returns 404 status and error message
 */
async function movieIdExists(req, res, next) {
  const { movieId } = req.params;
  const movie = await service.read(movieId);
  if (movie) {
    res.locals.movieId = movieId;
    return next();
  }
  next({
    status: 404,
    message: `Movie cannot be found: ${movieId}`,
  });
}

// ROUTE HANDLERS

/**
 * if called from "/movies": responds with list of all movies 
 * if called from "/movies?is_showing=true": responds with list of movies currently showing
 */
async function list(req, res) {
  const is_showing = req.query.is_showing;
  const movies = await service.list(is_showing);
  res.json({ data: movies });
}

/**
 * responds with information for movie with ID matching route param
 */
async function read(req, res) {
  const { movieId } = req.params;
  const movie = await service.read(movieId);
  res.json({ data: movie });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieIdExists), read],
  movieIdExists,
};
