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
