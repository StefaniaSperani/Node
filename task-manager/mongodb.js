// CRUD create read update delete

const { MongoClient, ObjectId } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const client = new MongoClient(connectionURL)
const databaseName = 'task-manager'

// MongoClient.connect(connectionURL, (error, client) => {
//     if (error) {
//         return console.log('Unable to connect to database!')
//     }

//     console.log('Sono connesso')
//     const db = client.db(databaseName)
//     console.log(db.collection('users'))

//     db.collection('users').insertMany([{ a: 1 }, { a: 2 }, { a: 3 }]);
// })

const connectionDb = async () => {
  // Use connect method to connect to the server
  try {
    await client.connect()
    console.log('Connected successfully to server')
    const db = client.db(databaseName)
    const collection = db.collection('tasks')

    //FINDONE
    // const taskId = await collection.findOne({
    //   _id: new ObjectId('66741d7aaa9cc22066e3c425'),
    // })

    // if (taskId) {
    //   console.log(taskId)
    // } else {
    //   console.log('Task not found')
    // }

    //FIND
    // const task = await collection
    //   .find({
    //     completed: false,
    //   })
    //   .toArray((error, task) => {
    //     console.log(task)
    //   })

    // if (task) {
    //   console.log(task)
    // } else {
    //   console.log('Task not found')
    // }

    //UPDATEONE
    // const task = await collection.updateOne(
    //   {
    //     _id: new ObjectId('66741d7aaa9cc22066e3c426'),
    //   },
    //   {
    //     $set: {
    //       description: 'Pet cats',
    //     },
    //   }
    // )
    // if (task) {
    //   console.log(task)
    // } else {
    //   console.log('Task not updated')
    // }

    //UPDATEMANY
    // const task = await collection.updateMany(
    //   {
    //     completed: false,
    //   },
    //   {
    //     $set: {
    //       completed: true,
    //     },
    //   }
    // )
    // if (task) {
    //   console.log(task)
    // } else {
    //   console.log('Task not updated')
    // }

    //DELETEMANY
    // const task = await collection.deleteMany({
    //   _id: new ObjectId('66741d7aaa9cc22066e3c426'),
    // })
    // if (task) {
    //   console.log(task)
    // } else {
    //   console.log('Task not updated')
    // }
  } catch (error) {
    console.log('Unable to connect', error)
  }
  return 'done.'
}

connectionDb()
