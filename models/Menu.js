const { Schema, model } = require('mongoose')

const schema = new Schema({
  title: {
    type: String,
    required: true
  },
  inCart: {
    type: Boolean,
    default: false
  },
  amount: {
    type: Number,
    default: 1
  },
  price: {
    type: Number,
    default: 10
  }
})

module.exports = model('Menu', schema)
