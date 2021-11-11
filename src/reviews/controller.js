const service = require('./reviews.service');

//middleware

async function checkExists(req, res, next) {
  const { id } = req.params;
  const review = await service.read(id);
  if (review) {
    res.locals.review = review;
    return next();
  } else {
    next({
      status: 404,
      message: `Review cannot be found: ${review.id}`,
    });
  }
}

//route handlers
// CRUDL

async function create(req, res, next) {
  const newReview = req.body;
  const data = service.create(newReview);
  res.json({ status: 201, data });
}

async function list(req, res, next) {
  const reviews = await service.list(res.locals.review.id);
  res.json({ data: reviews });
};

module.exports = {
  create,
  list: [checkExists, list],
}