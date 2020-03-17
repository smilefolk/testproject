const mongoose = require('mongoose');

/**
 * Product Schema
 * @private
 */
const productSchema = new mongoose.Schema({
  productCode: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true,
  },
  productName: {
    type: String,
    index: true,
  },
});


/**
 * Statics
 */
productSchema.statics = {

  
};

/**
 * @typedef Product
 */
module.exports = mongoose.model('Product', productSchema);
