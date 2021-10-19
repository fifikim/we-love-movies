const theatersService = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
// const mapProperties = require("../utils/map-properties");

async function list(req, res) {
  if (res.locals.movieId) {
    const theaters = await theatersService.theatersByMovie(res.locals.movieId);
    res.json({ data: theaters });
  }
  const theaters = await theatersService.list();
  for (let theater of theaters) {
    theater['movies'] = await theatersService.moviesByTheater(theater.theater_id);
  }
  res.json({ data: theaters });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
