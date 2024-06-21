const express = require('express')
const Task = require('../models/task')
const router = new express.Router()

//creo il task
router.post('/tasks', async (req, res) => {
  const task = new Task(req.body)

  try {
    await task.save()
    res.status(201).send(task)
  } catch (e) {
    res.status(400).send(e)
  }
})

//recupero l'intera lista dei task
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({})
    res.send(tasks)
  } catch (e) {
    res.status(500).send(e)
  }
})

//prendo il singolo task
router.get('/tasks/:id', async (req, res) => {
  const _id = req.params.id

  try {
    const task = await Task.findById(_id)
    if (!task) {
      return res.status(404).send()
    }

    res.send(task)
  } catch (e) {
    res.status(500).send({ error: 'Internal server error' })
  }
})

//Aggiorno
router.patch('/tasks/:id', async (req, res) => {
  const _id = req.params.id

  //Se vogliono fare una modifica che non è compresa nell'array allora imposto un messaggio di errore
  const updates = Object.keys(req.body)
  const allowesUpdates = ['description', 'complete']
  const isValidOperation = updates.every((update) => allowesUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' })
  }

  try {
    const task = await Task.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!task) {
      return res.status(404).send()
    }
    res.send(task)
  } catch (e) {
    res.status(400).send(e)
  }
})

//Cancello
router.delete('/tasks/:id', async (req, res) => {
  const _id = req.params.id

  try {
    const task = await Task.findByIdAndDelete(_id)

    if (!task) {
      return res.status(404).send()
    }

    res.send(task)
  } catch {
    res.status(500).send(e)
  }
})

module.exports = router
