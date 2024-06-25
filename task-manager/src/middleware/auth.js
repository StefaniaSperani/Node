const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
  try {
    //inizio cercando l'header fornita dall'utente
    const token = req.header('Authorization').replace('Bearer ', '')
    //convalido l'header e trova l'utente
    const decoded = jwt.verify(token, 'thisismycourse')
    //cercando l'utente con quell'id e con l'auth token memorizzato
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

    if (!user) {
      throw new Error()
    }

    req.token = token
    req.user = user
    next()
  } catch (e) {
    res.status(401).send({
      error: 'Please authenticate',
    })
  }
}
module.exports = auth
