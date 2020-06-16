const express = require('express')
const app = express()
var connection = require('./models/connection')


app.use('/',connection);


app.listen(3000 ,  console.log('Port listen in 3000'))

