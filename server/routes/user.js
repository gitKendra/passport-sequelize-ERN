const express = require('express')
const router = express.Router()
const passport = require('../passport')
const db = require("../models");

router.post('/', (req, res) => {
  console.log('user signup');

  const { username, password } = req.body
  // ADD VALIDATION
  db.User
    .findOrCreate({
      where: {
        username: username
      },
      defaults: {
        username: username,
        password: password
      }
    })
    .spread((user, created) => {
      if (created) {
        console.log(user.get({
          plain: true
        }))
        res.json(user)
      } else {
        res.json({
          error: `Sorry, already a user with the username: ${username}`
        })
      }
    })
})

router.post('/login', function (req, res, next) {
    console.log('routes/user.js, login, req.body: ');
    console.log(req.body)
    next()
  },
  passport.authenticate('local'), (req, res) => {
    console.log('logged in', req.user);
    var userInfo = {
      username: req.user.username
    };
    res.send(userInfo);
  }
)

router.get('/', (req, res, next) => {
  console.log('===== user!!======')
  console.log(req.user)
  if (req.user) {
    res.json({
      user: req.user
    })
  } else {
    res.json({
      user: null
    })
  }
})

router.post('/logout', (req, res) => {
  if (req.user) {
    req.logout()
    res.send({
      msg: 'logging out'
    })
  } else {
    res.send({
      msg: 'no user to log out'
    })
  }
})

module.exports = router