const mongoose = require('mongoose')
const Schema = mongoose.Schema
const AddressSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  fullname: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  street: {
    type: String,
    required: true
  },
  zipcode: {
    type: Number,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
   createdAt: {
    type: Date,
    default: Date.now
  }

})
module.exports = mongoose.model('address', AddressSchema)
