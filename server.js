const express = require('express')
const app = express()
const db = require('./models/connection')
var bodyParser = require('body-parser')
let ejs = require('ejs');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.set('view engine', 'ejs')

app.get('/',(req,res)=>{
        let chatting = db.chatParsed
        res.render('index.ejs', {chatting : chatting})

})

app.post('/newPost', (req,res)=> {
    console.log(req.body)
    db.newMessage({name: req.body.name, message: req.body.message})
    .then(nM => {
            console.log('message added', nM.name)
    })
    // .then(nM => {
    // })
    res.redirect('/')
    console.log(db.chatParsed)
})


var server = app.listen(3003 ,  console.log('Port listen in 3000'))

