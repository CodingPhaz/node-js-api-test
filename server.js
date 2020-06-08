const express = require('express')
const app = express()
const chatted = require('./models/connection')
const path = require('path')
var bodyParser = require('body-parser')
let ejs = require('ejs');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
// app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs')

app.get('/',(req,res)=>{
    // for(chat in con.chat){
        let chatting = chatted.chatted
        // req.body(con.chatt)
        // res.send(con.chatt)
        // let html = ejs.render('<%= chatting; %>', {chatting: chatting});

        res.render('index.ejs', {chatting : chatting})
        // res.send(chatting)
        // app.render('views/index', { chatting: 'result' })
    // }

})

app.post('/newPost', (req,res)=> {
    console.dir(req.body);
    res.send(req.body)
    console.log(req.body)
})


app.listen(3000,console.log('Port listen in 3000'))