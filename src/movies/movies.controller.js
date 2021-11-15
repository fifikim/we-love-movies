const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// VALIDATION MIDDLEWARE

function isShowing(req, res, next) {
  if (req.query.is_showing && req.query.is_showing !== true) {
    return next({
      status: 400,
      message: `Invalid request query.`,
    })
  };
  return next();
}

/**
 * checks that route param matches valid movie ID, else returns 404 status and error message
 */
async function movieIdExists(req, res, next) {
  const { movieId } = req.params;
  let foundMovie;
  
  // use appropriate service fn by query in url
  if (req.originalUrl.includes("theaters")) {
    foundMovie = await service.readTheaters(movieId);
  } else if (req.originalUrl.includes("reviews")) {
    foundMovie = await service.readReviews(movieId);
  } else {
    foundMovie = await service.read(movieId);
  }

  if (foundMovie) {
    res.locals.movie = foundMovie;
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
  let data;
  if (req.query.is_showing && req.query.is_showing === "true") {
    data = await service.listShowing();
  } else {
    data = await service.list();
  }
  res.json({ data });
}

/**
 * responds with information for movie with ID matching route param
 */
async function read(req, res) {
  res.json({ data: res.locals.movie });
}

module.exports = {
  list: [isShowing, asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieIdExists), read],
};
