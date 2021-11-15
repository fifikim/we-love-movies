const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

// maps critic properties to result's nested critic object
const addCritic = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization.name",
});

/**
 * @returns returns list of all movies or movies currently showing
 */
function list(isShowing) {
  if (isShowing) {
    return knex("movies as m")
      .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
      .distinct("m.*")
      .where({ "mt.is_showing": true })
      .orderBy("m.movie_id");
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

function readTheaters(movieId) {
  return knex("movies_theaters as mt")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .select("t.*")
    .where({ "mt.movie_id": movieId });
}

function readReviews(movieId) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*")
    .where({ "r.movie_id": movieId })
    // iterate thru selected reviews & add critic to each
    .then((reviews) => reviews.map(review => addCritic(review)));
}

module.exports = {
  list,
  read,
  readTheaters,
  readReviews,
};