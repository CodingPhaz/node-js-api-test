const express = require('express')
const app = express()
const db = require('./models/connection')
// const = require('./models/connection')
var bodyParser = require('body-parser')
let ejs = require('ejs');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
// app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs')

app.get('/',(req,res)=>{
    // for(chat in con.chat){
        let chatting = db.chatParsed
        // req.body(con.chatt)
        // res.send(con.chatt)
        // let html = ejs.render('<%= chatting; %>', {chatting: chatting});

        res.render('index.ejs', {chatting : chatting})
        // res.send(chatting)
        // app.render('views/index', { chatting: 'result' })
    // }

})

app.post('/newPost', (req,res)=> {
    // console.dir(req.body);
    console.log(req.body)
    db.newMessage({name: req.body.name, message: req.body.message})
    .then(nM => {
        console.log('message added', nM.name)
    })
    console.log(db.chatParsed)
    // res.redirect('/')
    // Chat.create({ name: req.body.name, message: req.body.message}).then(newM=> {
        // console.log(newpost)
})


var server = app.listen(3003 ,  console.log('Port listen in 3000'))


server.on('request', (req, res) => {
   if (req.method === 'POST') {
        collectRequestData(req, res => {
            console.log(res);
        });
   } 
   // Here the index.html should be reloaded
 res.redirect('/'); // --->Redirect to index here.
});