const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// validation middleware
async function movieIdExists(req, res, next) {
  const { movieId } = req.params;
  const movie = await moviesService.read(movieId);
  if (movie) {
    res.locals.movieId = movie.movie_id;
    return next();
  }
  next({
    status: 404,
    message: `Movie cannot be found: ${movieId}`,
  });
}

async function list(req, res) {
  const is_showing = req.query.is_showing;
  const movies = await moviesService.list(is_showing);
  res.json({ data: movies });
}

async function read(req, res) {
  const { movieId } = req.params;
  const movie = await moviesService.read(movieId);
  res.json({ data: movie });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieIdExists), read],
  movieIdExists,
};
