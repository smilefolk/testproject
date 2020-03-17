const BearerStrategy = require('passport-http-bearer');
// const User = require('../api/models/user.model');

const oAuth = service => async (token, done) => {
  try {
    // const userData = await homeProviders[service](token);
    // const user = await User.oAuthLogin(userData);
    // return done(null, user);
    return done(null);
  } catch (err) {
    return done(err);
  }
};

exports.facebook = new BearerStrategy(oAuth('facebook'));
exports.google = new BearerStrategy(oAuth('google'));
