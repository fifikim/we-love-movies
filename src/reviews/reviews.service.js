const knex = require("../db/connection");

function list(movie_id) {
  return knex("reviews").select("*").where({ movie_id });
}

function read(review_id) {
  return knex("reviews").select("*").where({ review_id }).first();
}

function update(updatedReview) {
  return knex("reviews")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, "*");
}

function readCritic(critic_id) {
  return knex("critics")
    .select("*")
    .where({ critic_id })
    .first();
}

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