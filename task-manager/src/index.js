const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

//creo il server
const app = express()
const port = process.env.PORT || 3000
//trasformo in json
app.use(express.json())

//creo lo user
app.post('/users', async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    res.status(201).send(user)
  } catch (e) {
    res.status(400).send(e)
  }
})

//prendo tutta la lista degli users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find({})
    res.send(users)
  } catch (e) {
    res.status(500).send(e)
  }
})

//prendo il singolo utente
app.get('/users/:id', async (req, res) => {
  const _id = req.params.id

  try {
    const user = await User.findById(_id)
    if (!user) {
      returnres.status(400).send()
    }
    res.send(user)
  } catch (e) {
    res.status(500).send({ error: 'Internal server error' })
  }
})

//Aggiorno
app.patch('/users/:id', async (req, res) => {
  const _id = req.params.id

  //Se vogliono fare una modifica che non è compresa nell'array allora imposto un messaggio di errore
  const updates = Object.keys(req.body)
  const allowesUpdates = ['name', 'email', 'password', 'age']
  const isValidOperation = updates.every((update) => allowesUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' })
  }

  try {
    const user = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!user) {
      return res.status(404).send()
    }
    res.send(user)
  } catch (e) {
    res.status(400).send(e)
  }
})

//Cancello
app.delete('/users/:id', async (req, res) => {
  const _id = req.params.id

  try {
    const user = await User.findByIdAndDelete(_id)

    if (!user) {
      return res.status(404).send()
    }

    res.send(user)
  } catch {
    res.status(500).send(e)
  }
})

//creo il task
app.post('/tasks', async (req, res) => {
  const task = new Task(req.body)

  try {
    await task.save()
    res.status(201).send(task)
  } catch (e) {
    res.status(400).send(e)
  }
})

//recupero l'intera lista dei task
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({})
    res.send(tasks)
  } catch (e) {
    res.status(500).send(e)
  }
})

//prendo il singolo task
app.get('/tasks/:id', async (req, res) => {
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
app.patch('/tasks/:id', async (req, res) => {
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
app.delete('/tasks/:id', async (req, res) => {
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

//apro il server
app.listen(port, () => {
  console.log('server is up on port ' + port)
})
