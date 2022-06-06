const mongoose = require('mongoose');


const listModel = mongoose.Schema({
  list: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  name: {
    type: String,
    required: true,
  },
  items: {
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