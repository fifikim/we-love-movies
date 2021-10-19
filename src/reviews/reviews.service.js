const knex = require("../db/connection");

/**
 * @param {integer} movie_id 
 * @returns reviews matching movie_id
 */
function list(movie_id) {
  return knex("reviews").select("*").where({ movie_id });
}

/**
 * @param {integer} review_id 
 * @returns review matching review_id
 */
function read(review_id) {
  return knex("reviews").select("*").where({ review_id }).first();
}

/**
 * updates review with matching review_id
 * @param {text} updatedReview 
 */
function update(updatedReview) {
  return knex("reviews")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, "*");
}

/**
 * @param {integer} critic_id 
 * @returns critic matching critic_id
 */
function readCritic(critic_id) {
  return knex("critics")
    .select("*")
    .where({ critic_id })
    .first();
}

/**
 * deletes review with matching review_id
 * @param {integer} review_id  
 */
function destroy(review_id) {
  return knex("reviews").where({ review_id }).del();
}

module.exports = {
  list,
  read,
  update,
  readCritic,
  delete: destroy,
};