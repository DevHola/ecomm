const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ReviewSchema = new Schema({
  rating: {
    type: Number,
    required: true
  },
  reviewer: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  experience: {
    type: String,
    required: true
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
   createdAt: {
    type: Date,
    default: Date.now
  }
})
module.exports = mongoose.model('Review', ReviewSchema)
