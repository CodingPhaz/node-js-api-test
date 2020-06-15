const express = require('express')
const app = express()
const db = require('./models/connection')
const database = require('./database/db.js')
var bodyParser = require('body-parser')
let ejs = require('ejs');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.set('view engine', 'ejs')


app.get('/', (req,res)=> {
    res.render('index.ejs')
})


app.get('/post',(req,res)=>{
        db.chatList.then(chat=> {
            // var getChat = JSON.stringify(chat, null, 4)
            // var chatParsing = JSON.parse(getChat)
            console.log(chat)
            res.render('post.ejs', { chat})
        })
        // res.send(chatting)

})

app.post('/newPost', (req,res)=> {
    console.log(req.body)
    db.newPost({name: req.body.name, message: req.body.message})
    .then(chatBox => {
            console.log(chatBox)
    })
    // .then(nM => {
    // })
    res.redirect('/post');
    console.log(db.chatParsed)
})





var server = app.listen(3000 ,  console.log('Port listen in 3000'))

