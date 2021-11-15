const router = require("express").Router();
const controller = require("./movies.controller");
const reviewsRouter = require("../reviews/reviews.router");
const theatersRouter = require("../theaters/theaters.router");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .use("/:movieId/theaters", controller.movieIdExists, theatersRouter);

router
  .use("/:movieId/reviews", controller.movieIdExists, reviewsRouter);

router
  .route("/:movieId/theaters")
  .get(controller.read)
  .all(methodNotAllowed);

router
  .route("/:movieId/reviews")
  .get(controller.read)
  .all(methodNotAllowed);

router
  .route("/:movieId")
  .get(controller.read)
  .all(methodNotAllowed);

router
  .route("/")
  .get(controller.list)
  .all(methodNotAllowed);

module.exports = router;