const express = require('express');
const testRoutes = require('./test.route');

const router = express.Router();

router.use('/tests', testRoutes);

module.exports = router;
