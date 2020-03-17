const mongoose = require('mongoose');

/**
 * User Schema
 * @private
 */
const testSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 128,
  },
  fname: {
    type: String,
    index: true,
  },
  lname: {
    type: String,
    index: true,
  },
  email: {
    type: String,
    index: true,
  },
  telephoneNumber: {
    type: String,
  },
  picturePath: {
    type: String,
    index: true,
  },
  role: {
    type: String,
  },
  userSession: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true,
    index: true,
  },
  created: {
    type: Date,
    default: new Date(),
  },
  lastUpdate: {
    type: Date,
    default: new Date(),
  },
  lastLogin: {
    type: Date,
  },
  createdBy: {
    type: String,
  },
});


/**
 * Statics
 */
testSchema.statics = {

  
};

/**
 * @typedef Test
 */
module.exports = mongoose.model('Test', testSchema);
