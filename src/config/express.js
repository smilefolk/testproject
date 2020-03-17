const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
const routesV1 = require('../api/routes/v1');
const { logs } = require('./vars');
const strategies = require('./passport');
const error = require('../api/middlewares/error');
const uuidv1 = require('uuid/v1');
const fileupload = require('express-fileupload');

/**
* Express instance
* @public
*/
const app = express();

// request logging. dev: console | production: file
app.use(morgan(logs));

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// gzip compression
app.use(compress());

// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
// app.use(cors());

app.use(fileupload({
  limits: { fileSize: 104857600 }, // 100MB
}));
// enable authentication
app.use(passport.initialize());

app.use((req, res, next) => {
  req.transactionId = uuidv1();
  next();
});
// mount api v1 routes
app.use('/apis/test/v1', routesV1);

// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);

module.exports = app;
