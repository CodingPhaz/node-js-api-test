const express = require('express')
const app = express()
const con = require('./models/connection')

app.get('/',(req,res)=>{
    res.send('Hello world')
})


app.listen(3000,console.log('Port listen in 3000'))