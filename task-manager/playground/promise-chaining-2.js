require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('66743cbdfed45f702e258b9a')
// .then((task) => {
//   console.log(task)
//   return Task.countDocuments({
//     complete: false,
//   })
//     .then((result) => {
//       console.log(result)
//     })
//     .catch((e) => {
//       console.log(e)
//     })
// })

const deleteTaskAndCount = async (id) => {
  const task = await Task.findByIdAndDelete(id)
  const count = await Task.countDocuments({ complete: false })

  return count
}

deleteTaskAndCount('66752dfe820cbd713e6353ed')
  .then((count) => {
    console.log(count)
  })
  .catch((e) => {
    console.log(e)
  })
