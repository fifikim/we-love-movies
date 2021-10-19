const router = require("express").Router();
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const cors = require("cors");

router
  .route("/:reviewId")
  .put(cors(), controller.update)
  .delete(cors(), controller.delete)
  .all(methodNotAllowed);

router
  .route("/")
  .get(cors(), controller.list)
  .all(methodNotAllowed);

module.exports = router;