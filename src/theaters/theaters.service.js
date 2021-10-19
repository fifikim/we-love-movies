const knex = require("../db/connection");

function list() {
  return knex("theaters").select("*");
}

function theatersByMovie(movie_id) {
  return knex("movies_theaters as mt")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .select("t.*")
    .where({ "mt.movie_id": movie_id });
}

function moviesByTheater(theater_id) {
  return knex("movies_theaters as mt")
  .join("theaters as t", "mt.theater_id", "t.theater_id")
  .join("movies as m", "m.movie_id", "mt.movie_id")
  .select("m.*")
  .where({ "mt.theater_id": theater_id });
}

module.exports = {
  list,
  theatersByMovie,
  moviesByTheater,
};