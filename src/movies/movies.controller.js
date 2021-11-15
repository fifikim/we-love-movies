const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// VALIDATION MIDDLEWARE

/**
 * checks that route param matches valid movie ID, else returns 404 status and error message
 */
async function movieIdExists(req, res, next) {
  const { movieId } = req.params;
  const foundMovie = await service.read(movieId);

  if (foundMovie) {
    res.locals.movie = foundMovie;
    res.locals.movieId = movieId;
    return next();
  }
  return next({
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
  const isShowing = req.query.is_showing;
  const movies = await service.list(isShowing);
  res.json({ data: movies });
}

/**
 * responds with information for movie with ID matching route param
 */
async function read(req, res) {
  res.json({ data: res.locals.movie });
}

/**
 * responds with theaters that are showing specified movie
 */
 async function readTheaters(req, res, next) {
  const theaters = await service.readTheaters(res.locals.movieId);
  res.json({ data: theaters });
}

/**
* responds with reviews from specified movie
*/
async function readReviews(req, res, next) {
  const reviews = await service.readReviews(res.locals.movieId);
  res.json({ data: reviews });
}


module.exports = {
  list,
  read: [asyncErrorBoundary(movieIdExists), read],
  readTheaters: [ asyncErrorBoundary(isIdValid), readTheaters ],
  readReviews: [ asyncErrorBoundary(isIdValid), readReviews ],
};
