const knex = require("../db/connection");

/**
 * @param {boolean} is_showing 
 * @returns returns list of all movies or movies currently showing
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