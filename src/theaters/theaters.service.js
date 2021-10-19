const knex = require("../db/connection");

/**
 * @returns all theaters 
 */
function list() {
  return knex("theaters").select("*");
}

/**
 * @param {integer} movie_id 
 * @returns theaters showing movies with matching movie_id param
 */
function theatersByMovie(movie_id) {
  return knex("movies_theaters as mt")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .select("t.*")
    .where({ "mt.movie_id": movie_id });
}

/**
 * @param {integer} theater_id 
 * @returns movies being shown in theater with matching theater_id 
 */
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