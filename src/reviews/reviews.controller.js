const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// VALIDATION MIDDLEWARE

/**
 * checks that route param matches valid review ID
 * else returns 404 status and error message
 */
async function reviewIdExists(req, res, next) {
  const { reviewId } = req.params;
  const review = await service.read(reviewId);
  if (review) {
    res.locals.reviewId = reviewId;
    return next();
  }
  next({
    status: 404,
    message: `Review cannot be found: ${reviewId}`,
  });
}

// ROUTE HANDLERS

/**
 * responds with list of reviews for movie with ID matching route param
 * including nested critic information
 */
async function list(req, res) {
  const reviews = await service.list(res.locals.movieId);
  for (let review of reviews) {
    review['critic'] = await service.readCritic(review.critic_id);
  };
  res.json({ data: reviews });
}

/**
 * updates review with ID matching route param
 * responds with updated review including nested critic information
 */
async function update(req, res) {
  const updatedReview = {
    ...req.body.data,
    review_id: res.locals.reviewId,
  };
  await service.update(updatedReview);
  const result = await service.read(updatedReview.review_id);
  result['critic'] = await service.readCritic(result.critic_id);
  res.json({ data: result });
}

/**
 * deletes review with ID matching route param
 * responds with 204 status
 */
async function destroy(req, res) {
  const { reviewId } = res.locals;
  await service.delete(reviewId);
  res.sendStatus(204);
}

module.exports = {
  list: asyncErrorBoundary(list),
  update: [asyncErrorBoundary(reviewIdExists), update],
  delete: [asyncErrorBoundary(reviewIdExists), destroy],
};
