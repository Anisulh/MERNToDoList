const mongoose = require('mongoose');


const userModel = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please enter a first name']
  },
  lastName: {
    type: String,
    required: [true, 'Please enter a last name']
  },
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please enter a password']
  },
  admin: {
    type: Boolean,
    required: true,
    default: false
  }
}, 
{
  timestamps: true
}
)

module.exports = mongoose.model('User', userModel)