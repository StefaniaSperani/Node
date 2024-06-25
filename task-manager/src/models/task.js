const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const taskSchema = new mongoose.Schema({
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

// Definizione dello schema per il modello
const Task = mongoose.model('Task', taskSchema)

module.exports = Task
