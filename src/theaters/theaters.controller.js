const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
// const mapProperties = require("../utils/map-properties");

/**
 * if called from "/:movieId/theaters": responds with list of theaters showing movie with ID matching route param
 * if called from "/theaters": responds with list of all theaters including nested list of movies shown
 */
async function list(req, res) {
  if (res.locals.movieId) { 
    const theaters = await service.theatersByMovie(res.locals.movieId);
    res.json({ data: theaters });
  } 
  const theaters = await service.list();
  for (let theater of theaters) {
    theater['movies'] = await service.moviesByTheater(theater.theater_id);
  }
  res.json({ data: theaters });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
