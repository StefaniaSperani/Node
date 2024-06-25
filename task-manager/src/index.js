const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

//creo il server
const app = express()
const port = process.env.PORT || 3000
//trasformo in json
app.use(express.json())

app.use(userRouter)
app.use(taskRouter)

//apro il server
app.listen(port, () => {
  console.log('server is up on port ' + port)
})

const jwt = require('jsonwebtoken')

const myFunction = async () => {
  const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse', { expiresIn: '7 days' })
  console.log(token)

  const data = jwt.verify(token, 'thisismynewcourse')
  console.log(data)
}

myFunction()
