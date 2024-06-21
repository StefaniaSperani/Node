require('../src/db/mongoose')
const User = require('../src/models/user')

// User.findByIdAndUpdate('66743e4ab536b2645af61800', {
//   age: 31,
// }).then((user) => {
//   console.log(user)
//   return User.countDocuments({
//     age: 31,
//   })
//     .then((result) => {
//       console.log(result)
//     })
//     .catch((e) => {
//       console.log(e)
//     })
// })

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, {
    age,
  })
  const count = await User.countDocuments({ age })

  return count
}

updateAgeAndCount('66743522f84c81064ff6e90f', 2)
  .then((count) => {
    console.log(count)
  })
  .catch((e) => {
    console.log(e)
  })
