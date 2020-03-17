const express = require('express');
const orderRoutes = require('./order.route');
const productRoutes = require('./product.route');
const userRoutes = require('./user.route');

const router = express.Router();

router.use('/orders', orderRoutes);
router.use('/products', productRoutes);
router.use('/users', userRoutes);


module.exports = router;
