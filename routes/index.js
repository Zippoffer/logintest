'use strict'

const {Router} = require('express')
const router = Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

router.get('/', (req, res) => {
  res.render('index', {
    title: 'home'
  })
})


// ****************************************************************************
// *                 ///////*******register********\\\\\\\\\\                 *
// ****************************************************************************

router.get('/register', (req, res) => {
	res.render('register', {
		title: 'register'
	})
})



router.post('/register', ({ body: { email, password, confirmation } }, res, err) => {
  if (password === confirmation) {
    console.log('hello')
    User.findOne({ email })
      .then(user => {
        if (user) {
          res.render('register', { msg: 'Email is already registered' })
        } else {
          return new Promise((resolve, reject)=>{

          bcrypt.hash(password, 10, (err, hash)=> {
            if(err) {
              reject(err)
            }else{
              resolve(hash)
            }
          })
        })
      }
    })
         .then(hash => User.create({ email, password: hash }))
      .then(() => res.redirect('/login'), { msg: 'User created' })
      .catch(err)
  } else {
    res.render('register', { msg: 'Password & password confirmation do not match' })
  }
})


// ****************************************************************************
// *                     ////////******login******\\\\\\\\                    *
// ****************************************************************************

router.get('/login', (req, res) => {
	res.render('login', {
		title: 'login'
	})
})

router.post('/login', ({session, body: { email, password } }, res, err) => {			//session and body are destructured from req
  User.findOne({ email })			//email and password are destructured from body
    .then(user => {			//lower-case 'user' is created here it carries email and password
      if (user) {
        return new Promise((resolve, reject) => {
          bcrypt.compare(password, user.password, (err, matches) => {
            if (err) {
              reject(err)
            } else {
              resolve(matches)
							res.render('index', {user})
            }
          })
        })
      } else {
        res.render('login', { msg: 'Email does not exist in our system' })
      }
    })
    .catch(err)
})

// ****************************************************************************
// *                   ////////******logout*******\\\\\\\\\\                  *
// ****************************************************************************

router.get('/logout', (req, res) => {
	res.render('logout', {
		title: 'logout'
	})
})
router.post('/logout', ({session}, res, next) => {		//session is destructured from req
	console.log('hello')
  session.destroy(err => {
    if (err) throw err
    res.redirect('/login')
  })
})


module.exports = router
