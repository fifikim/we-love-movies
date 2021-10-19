const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const cors = require("cors");
const reviewsRouter = require("../reviews/reviews.router");
const theatersRouter = require("../theaters/theaters.router");

router
  .use("/:movieId/theaters", controller.movieIdExists, theatersRouter);

router
  .use("/:movieId/reviews", controller.movieIdExists, reviewsRouter);

router
  .route("/:movieId")
  .get(cors(), controller.read)
  .all(methodNotAllowed);

router
  .route("/")
  .get(cors(), controller.list)
  .all(methodNotAllowed);

module.exports = router;