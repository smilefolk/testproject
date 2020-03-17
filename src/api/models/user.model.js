const mongoose = require('mongoose');

/**
 * User Schema
 * @private
 */
const userSchema = new mongoose.Schema({
  userCode: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true,
  },
  firstName: {
    type: String,
    index: true,
  },
  lastName: {
    type: String,
    index: true,
  },
  email: {
    type: String,
    index: true,
  },
});


/**
 * Statics
 */
userSchema.statics = {
    async update(id, data = {}) {
        try {
          if (mongoose.Types.ObjectId.isValid(id)) {
            const user = await this.findOneAndUpdate({ _id: id }, { $set: data }).exec();
            return user;
          }
        } catch (error) {
          throw error;
        }
    },
    
    async getById(id) {
        try {
            if (mongoose.Types.ObjectId.isValid(id)) {
            const user = await this.findOne({ _id: id }).exec();
            return user;
            }
        } catch (error) {
            throw error;
        }
    },

    async remove(id) {
        try {
            if (mongoose.Types.ObjectId.isValid(id)) {
            const user = await this.findOneAndRemove({ _id: id }).exec();
            return user;
            }
        } catch (error) {
            throw error;
        }
    },

    async list(data = {}) {
        try {
            const { limit = 20, page = 1} = data
            const skip = (Number(page) - 1) * Number(limit)
            const user = await this.find({})
                .limit(Number(limit))
                .skip(skip)
                .exec();
            return user;
        } catch (error) {
            throw error;
        }
    },
};

/**
 * @typedef User
 */
module.exports = mongoose.model('User', userSchema);
