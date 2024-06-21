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
app.post('/users', (req, res) => {
  const user = new User(req.body)

  user
    .save()
    .then(() => {
      res.status(201).send(user)
    })
    .catch((e) => {
      res.status(400).send(e)
    })
})

//prendo tutta la lista degli users
app.get('/users', (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users)
    })
    .catch((e) => {
      res.status(500).send(e)
    })
})

//prendo il singolo utente
app.get('/users/:id', (req, res) => {
  const _id = req.params.id

  User.findById(_id)
    .then((user) => {
      if (!user) {
        return res.status(404).send()
      }

      res.send(user)
    })
    .catch((e) => {
      res.status(500).send({ error: 'Internal server error' })
    })
})

//creo il task
app.post('/tasks', (req, res) => {
  const task = new Task(req.body)

  task
    .save()
    .then(() => {
      res.status(201).send(task)
    })
    .catch((e) => {
      res.status(400).send(e)
    })
})

//recupero l'intera lista dei task
app.get('/tasks', (req, res) => {
  Task.find({})
    .then((tasks) => {
      res.send(tasks)
    })
    .catch((e) => {
      res.status(500).send(e)
    })
})

//prendo il singolo task
app.get('/tasks/:id', (req, res) => {
  const _id = req.params.id

  Task.findById(_id)
    .then((task) => {
      if (!task) {
        return res.status(404).send()
      }

      res.send(task)
    })
    .catch((e) => {
      res.status(500).send({ error: 'Internal server error' })
    })
})

//apro il server
app.listen(port, () => {
  console.log('server is up on port ' + port)
})
