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
router.post('/login', ({session, body: {email,password}},res, err) => {		//session and body are destructured from req
	User.findOne({email, password})																					//email and password are destructured from body
		.then(user => {																												//lower-case 'user' is created here it carries email and password
			console.log(user)
			if (user) {
				res.render('index', {user})
			}
		})
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
