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
  async update(id, data = {}) {
    try {
      if (mongoose.Types.ObjectId.isValid(id)) {
        const order = await this.findOneAndUpdate({ _id: id }, { $set: data }).exec();
        return order;
      }
    } catch (error) {
      throw error;
    }
  },

  async getById(id) {
      try {
          if (mongoose.Types.ObjectId.isValid(id)) {
          const order = await this.findOne({ _id: id }).exec();
          return order;
          }
      } catch (error) {
          throw error;
      }
  },

  async remove(id) {
      try {
          if (mongoose.Types.ObjectId.isValid(id)) {
          const order = await this.findOneAndRemove({ _id: id }).exec();
          return order;
          }
      } catch (error) {
          throw error;
      }
  },

  async list(data = {}) {
      try {
          const { limit = 20, page = 1} = data
          const skip = (Number(page) - 1) * Number(limit)
          const order = await this.find({})
              .limit(Number(limit))
              .skip(skip)
              .exec();
          return order;
      } catch (error) {
          throw error;
      }
  },
  
};

/**
 * @typedef Order
 */
module.exports = mongoose.model('Order', orderSchema);
