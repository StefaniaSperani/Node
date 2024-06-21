const mongoose = require('mongoose')

// Definizione dello schema per il modello
const Task = mongoose.model('Task', {
  description: {
    type: String,
    required: true,
    trim: true,
  },
  complete: {
    type: Boolean,
    default: false,
  },
})

module.exports = Task
