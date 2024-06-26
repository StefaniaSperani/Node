const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

//creo il task
router.post('/tasks', auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  })

  try {
    await task.save()
    res.status(201).send(task)
  } catch (e) {
    res.status(400).send(e)
  }
})

//recupero l'intera lista dei task
router.get('/tasks', auth, async (req, res) => {
  // GET /tasks?complete=true --FILTER
  const match = {}
  const sort = {}

  if (req.query.complete) {
    match.complete = req.query.complete === 'true'
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':')
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
  }

  try {
    await req.user.populate({
      path: 'tasks',
      match,
      //GET /tasks?limit=10&skip=20 --PAGINATION
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        //GET /task?sortBy=createdAt:desc --SORT
        sort,
      },
    })
    res.send(req.user.tasks)
  } catch (e) {
    res.status(500).send()
  }
})

//prendo il singolo task
router.get('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id
  //puoi vederlo solo se l'ha creato l'utente con l'id specifico
  try {
    const task = await Task.findOne({ _id, owner: req.user._id })

    if (!task) {
      return res.status(404).send()
    }

    res.send(task)
  } catch (e) {
    res.status(500).send({ error: 'Internal server error' })
  }
})

//Aggiorno
router.patch('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id

  //Se vogliono fare una modifica che non è compresa nell'array allora imposto un messaggio di errore
  const updates = Object.keys(req.body)
  const allowesUpdates = ['description', 'complete']
  const isValidOperation = updates.every((update) => allowesUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' })
  }

  try {
    const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })

    if (!task) {
      return res.status(404).send()
    }

    updates.forEach((update) => (task[update] = req.body[update]))
    await task.save()
    res.send(task)
  } catch (e) {
    res.status(400).send(e)
  }
})

//Cancello
router.delete('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id

  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

    if (!task) {
      return res.status(404).send()
    }

    res.send(task)
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router
