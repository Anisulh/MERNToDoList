const mongoose = require('mongoose');


const taskModel = mongoose.Schema({
  listTitle: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'List'
  },
  name: {
    type: String,
    required: [true, 'Please enter a task']
  },
  date: {
    type: Date,
    required: [true, 'Please enter a date'],
  },
  completed: {
    type: Boolean,
    default: false,
    
  }
}, 
{
  timestamps: true
}
)

module.exports = mongoose.model('Task', taskModel)