const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// validation middleware
async function reviewIdExists(req, res, next) {
  const { reviewId } = req.params;
  const review = await reviewsService.read(reviewId);
  if (review) {
    res.locals.reviewId = review.review_id;
    return next();
  }
  next({
    status: 404,
    message: `Review cannot be found: ${reviewId}`,
  });
}

async function list(req, res) {
  const reviews = await reviewsService.list(res.locals.movieId);
  for (let review of reviews) {
    review['critic'] = await reviewsService.readCritic(review.critic_id);
  };
  res.json({ data: reviews });
}

async function update(req, res) {
  const updatedReview = {
    ...req.body.data,
    review_id: res.locals.reviewId,
  };
  await reviewsService.update(updatedReview);
  const result = await reviewsService.read(updatedReview.review_id);
  result['critic'] = await reviewsService.readCritic(result.critic_id);
  res.json({ data: result });
}

async function destroy(req, res) {
  const { reviewId } = res.locals;
  await reviewsService.delete(reviewId);
  res.sendStatus(204);
}

module.exports = {
  list: asyncErrorBoundary(list),
  update: [asyncErrorBoundary(reviewIdExists), update],
  delete: [asyncErrorBoundary(reviewIdExists), destroy],
};
