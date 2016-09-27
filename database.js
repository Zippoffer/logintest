'use strict'

const mongoose = require('mongoose')

// const MONGODB_URL = 'mongodb://localhost:27017/logintothis'
const MONGODB_URL = 'mongodb://me:mee@ds041486.mlab.com:41486/logintothis'


mongoose.Promise = Promise


module.exports.connect = ()=> mongoose.connect(MONGODB_URL)
module.exports.disconnect = ()=> mongoose.disconnect(MONGODB_URL)
