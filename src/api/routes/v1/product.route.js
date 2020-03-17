const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/product.controller');

const router = express.Router();
router.route('/')
    .get(controller.listProduct)
    .post(controller.createProduct)
    .patch(controller.updateProduct)
    .delete(controller.removeProduct)

module.exports = router;
