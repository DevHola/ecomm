const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true
  },
   address: {
    type: Schema.Types.ObjectId,
    ref: 'address'
  }, 
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }

})
UserSchema.pre('save', function (next) {
  const user = this
  if (this.isModified('password') || this.isNew) {
    bcrypt.hash(user.password, 10, function (err, hash) {
      if (err) {
        return next(err)
      }
      user.password = hash
      next()
    })
  } else {
    return next()
  }
})
// Remember this is the compare password function used in login function
UserSchema.methods.comparePassword = function (password, next) {
  const user = this
  return bcrypt.compareSync(password, user.password)
}
module.exports = mongoose.model('user', UserSchema)
