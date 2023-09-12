const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET_JWT


const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    maxlength: 50,
    minlength: 3,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: [6]
  }
})

UserSchema.pre('save', async function() {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.getToken = function() {
  const payload = {
        user: this.name,
        id: this._id 
    }
    const token = jwt.sign(payload, process.env.SECRET_JWT, {
      expiresIn: process.env.JWT_LIFETIME,
    })
    return token
}
UserSchema.methods.checkPasswords = async function (password) {
  const isCorrect = bcrypt.compare(password, this.password)
  return isCorrect
}

module.exports = mongoose.model('User', UserSchema)