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




router.post('/register', ({body:{email, password}}, res, err) =>{
	User
		.create({email, password})
		.then(()=>{
			res.redirect('/login')
		})
		.catch(err)
})



// ****************************************************************************
// *                     ////////******login******\\\\\\\\                    *
// ****************************************************************************

router.get('/login', (req, res) => {
	res.render('login', {
		title: 'login'
	})
})
router.post('/login', ({session, body: {email,password}},res, err) => {
	User.findOne({email, password})
	.then(user => {
      if (user) {
        return new Promise((resolve, reject) => {
          bcrypt.compare(password, user.password, (err, matches) => {
            if (err) {
              reject(err)
            } else {
              resolve(matches)
            }
          })
        })
      } else {
        res.render('login', { msg: 'Email does not exist in our system' })
      }
    })
.then((matches) => {
      if (matches) {
        session.email = email
        res.redirect('/')
      } else {
        res.render('login', { msg: 'Password does not match' })
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
router.post('/logout', ({session},req, res, next) => {
  req.session.destroy(err => {
    if (err) throw err
    res.redirect('/login')
  })
})


module.exports = router
