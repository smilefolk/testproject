const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/test.controller');
const { authorize, SUPER_ADMIN, PRODUCT_OWNER } = require('../../middlewares/auth');
const {
  listUsers,
} = require('../../validations/banner.validation');

const router = express.Router();
router.route('/test').get(controller.test);

module.exports = router;
