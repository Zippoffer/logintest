'use strict'

const express = require('express')
const app = express() //this creates an instance of express
const {connect} = require('./database')
const routes = require('./routes/') //same as ./routes/index
const session = require('express-session')
const bodyParser = require('body-parser')
// const RedisStore = require('connect-redis')(session)


app.set('view engine', 'pug')


app.set('port', process.env.PORT || 3333)


app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(express.static('public'))

app.use(routes)



connect()

.then(()=> {

    app.listen(app.get("port"), () => 
        console.log(`Express server listening on port ${app.get('port')}`)
        )
})
.catch(console.error)
