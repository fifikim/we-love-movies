const knex = require("../db/connection");

/**
 * @param {integer} is_showing 
 * @returns if called from "/movies" route: returns all movies
 * if route contains "?is_showing=true" query: lists only movies showing
 */
function list(is_showing) {
  if (is_showing) {
    return knex("movies_theaters")
      .select("*")
      .where({ is_showing: true })
      .groupBy("movie_id");
  }
  return knex("movies").select("*");  
}

/**
 * @param {integer} movie_id 
 * @returns movie with matching movie_id
 */
function read(movie_id) {
  return knex("movies").select("*").where({ movie_id }).first();
}

module.exports = {
  list,
  read,
};