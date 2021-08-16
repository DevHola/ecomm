const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const VendorSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }

})
VendorSchema.pre('save', function (next) {
  const vendor = this
  if (this.isModified('password') || this.isNew) {
    bcrypt.hash(vendor.password, 10, function (err, hash) {
      if (err) {
        return next(err)
      }
      vendor.password = hash
      next()
    })
  } else {
    return next()
  }
})
// Remember this is the compare password function used in login function
VendorSchema.methods.comparePassword = function (password, next) {
  const vendor = this
  return bcrypt.compareSync(password, vendor.password)
}
module.exports = mongoose.model('Vendor', VendorSchema)
