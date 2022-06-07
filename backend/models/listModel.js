const mongoose = require('mongoose');


const listModel = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  name: {
    type: String,
    required: true,
  },
  tasks: {
    type: Array,
  },
  listAdmin: {
    type: Boolean,
    default: true
  }
},
{
  timestamps: true
}
)

module.exports = mongoose.model('List', listModel)