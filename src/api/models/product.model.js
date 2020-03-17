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
  async update(id, data = {}) {
    try {
      if (mongoose.Types.ObjectId.isValid(id)) {
        const product = await this.findOneAndUpdate({ _id: id }, { $set: data }).exec();
        return product;
      }
    } catch (error) {
      throw error;
    }
  },

  async getById(id) {
      try {
          if (mongoose.Types.ObjectId.isValid(id)) {
          const product = await this.findOne({ _id: id }).exec();
          return product;
          }
      } catch (error) {
          throw error;
      }
  },

  async remove(id) {
      try {
          if (mongoose.Types.ObjectId.isValid(id)) {
          const product = await this.findOneAndRemove({ _id: id }).exec();
          return product;
          }
      } catch (error) {
          throw error;
      }
  },

  async list(data = {}) {
      try {
          const { limit = 20, page = 1} = data
          const skip = (Number(page) - 1) * Number(limit)
          const product = await this.find({})
              .limit(Number(limit))
              .skip(skip)
              .exec();
          return product;
      } catch (error) {
          throw error;
      }
  },
  
};

/**
 * @typedef Product
 */
module.exports = mongoose.model('Product', productSchema);
