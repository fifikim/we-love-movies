const knex = require('../db/connection');

function create(review) {
  return knex('reviews')
    .insert(review)
    .returning('*')
    .then((createdReviews) => createdReviews[0]);
}

function update(updatedReview) {
  return knex('reviews')
    .select('*')
    .where({ review_id: updatedReview.review_id})
    .update(updatedReview, "*")
    .then((updatedReviews) => updatedReviews[0]);
}

function list(movie_id) {
  return knex('reviews') 
    .select('*')
    .where({ movie_id });
}

module.exports = {
  create,
  update,
  list,
};