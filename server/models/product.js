const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  image: {

  },

  stockquantity: {
    type: Number,
    required: true
  },

  price: {
    type: Number,
    required: false
  },
  desc: {
    type: String,
    required: true
  },
  category: [{
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }],
  manufacturer: {
    type: Schema.Types.ObjectId,
    ref: 'Vendor'
  }, 
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'Review'
  }], 

  createdAt: {
    type: Date,
    default: Date.now
  }

})
module.exports = mongoose.model('Product', ProductSchema)
