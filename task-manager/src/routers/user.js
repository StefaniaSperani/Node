const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

//creo lo user
router.post('/users', async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({ user, token })
  } catch (e) {
    res.status(400).send(e)
  }
})

//login user
router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.send({ user, token })
  } catch (e) {
    res.status(400).send()
  }
})

//logout user
router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })
    await req.user.save()

    res.send()
  } catch (e) {
    res.status(500).send()
  }
})

//logout user da tutte le sessioni
router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save()

    res.send()
  } catch (e) {
    res.status(500).send()
  }
})

//prendo tutta la lista degli users
// router.get('/users', auth, async (req, res) => {
//   try {
//     const users = await User.find({})
//     res.send(users)
//   } catch (e) {
//     res.status(500).send(e)
//   }
// })

//l'utente ottiene il proprio profilo quando autenticato
router.get('/users/me', auth, async (req, res) => {
  res.send(req.user)
})

//Aggiorno
router.patch('/users/me', auth, async (req, res) => {
  //Se vogliono fare una modifica che non è compresa nell'array allora imposto un messaggio di errore
  const updates = Object.keys(req.body)
  const allowesUpdates = ['name', 'email', 'password', 'age']
  const isValidOperation = updates.every((update) => allowesUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' })
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update])) // le [] perchè i valori sono dinamici
    await req.user.save()
    res.send(req.user)
  } catch (e) {
    res.status(400).send(e)
  }
})

//Cancello
router.delete('/users/me', auth, async (req, res) => {
  try {
    await req.user.deleteOne()
    // console.log(req.user)
    res.send(req.user)
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router
