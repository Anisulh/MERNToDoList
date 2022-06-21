const mongoose = require('mongoose');


const taskModel = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  name: {
    type: String,
    required: [true, 'Please enter a task']
  },
  date: {
    type: String,
    required: [true, 'Please enter a date'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  priority: {
    type: Boolean,
    default: false,
  }

}, 
{
  timestamps: true
}
)

module.exports = mongoose.model('Task', taskModel)