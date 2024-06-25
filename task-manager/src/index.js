const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

//creo il server
const app = express()
const port = process.env.PORT || 3000

// app.use((req, res, next) => {
//   if (req.method === 'GET') {
//     res.send('GET requests are disabled')
//   } else {
//     next()
//   }
// })

// app.use((req, res, next) => {
//   res.status(503).send('Server maintenace')
// })

//trasformo in json
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

// Without middleware:     new request -> run route handler
// With middleware:        new request -> do something -> run route handler
//Utilizzo il middleware per personalizzare il server in base alle esigenze

//apro il server
app.listen(port, () => {
  console.log('server is up on port ' + port)
})

const Task = require('./models/task')
const User = require('./models/user')

const main = async () => {
  // const task = await Task.findById('667ae07a6b70a9e126054916')
  // await task.populate('owner')
  // console.log(task.owner)
  const user = await User.findById('667ad8b8c23b46602957ca9c')
  await user.populate('tasks')
  console.log(user.tasks)
}

main()
