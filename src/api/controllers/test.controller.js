const httpStatus = require('http-status');
const moment = require('moment-timezone');
const logger = require('../../config/logger');
const path = require('path');

const uploadDir = path.join(__dirname, '/..', '/..', '/..', '/uploads/');
const fs = require('fs');

exports.test = async (req, res, next) => {
  logger.info('test winston', req.user);
  logger.error('test error winston', req.user);
  res.json('test');
};
