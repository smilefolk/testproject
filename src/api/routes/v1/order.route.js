const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/order.controller');

const router = express.Router();
router.route('/')
    .get(controller.listOrder)
    .post(controller.createOrder)
    .patch(controller.updateOrder)
    .delete(controller.removeOrder)

module.exports = router;
