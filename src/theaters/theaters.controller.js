const service = require("./theaters.service");

/**
 * if called from "/:movieId/theaters": responds with list of theaters showing movie with ID matching route param
 * if called from "/theaters": responds with list of all theaters including nested list of movies shown
 */
 async function list(req, res, next) {
  const theaters = await service.list();
  res.json({ data: theaters });
}

module.exports = {
  list,
};
