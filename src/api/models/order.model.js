const mongoose = require('mongoose');

/**
 * Product Schema
 * @private
 */
const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: Number,
    required: true,
    unique: true,
    index: true,
  },
  orderDate: {
    type: Date,
    default: new Date(),
  },
  productCode: [{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Product'
  }],
  userCode: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  address: {
    type: String,
  },
});


/**
 * Statics
 */
orderSchema.statics = {

  
};

/**
 * @typedef Order
 */
module.exports = mongoose.model('Order', orderSchema);
