const knex = require("../db/connection");

function list(is_showing) {
  if (is_showing) {
    return knex("movies_theaters")
      .select("*")
      .where({ is_showing: true })
      .groupBy("movie_id");
  }
  return knex("movies").select("*");  
}

function theaterList(theater_id) {
  return knex("movies_theaters as mt")
    .join("movies as m", "m.movie_id", "mt.movie_id")
    .select("m.*")
    .where({ "mt.theater_id": theater_id});
}

function read(movie_id) {
  return knex("movies").select("*").where({ movie_id }).first();
}

module.exports = {
  list,
  read,
  theaterList,
};