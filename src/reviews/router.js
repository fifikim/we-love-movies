const router = require('express').Router();
const controller = require('./controller');
const methodNotAllowed = require('../errors/methodNotAllowed');

router
  .route('/')
  .put(controller.update)
  .post(controller.create)
  .all(methodNotAllowed);


module.exports = router;