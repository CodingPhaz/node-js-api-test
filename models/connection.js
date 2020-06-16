const express = require('express')
const router = express.Router();
const app = express()
const Sequelize = require('sequelize')
const sequelize = require('../database/db.js')
var bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json())
app.set('view engine', 'ejs')


sequelize.authenticate()
    .then(() => {
        console.log('Connection is OK')
    })
    .catch(err => {
        console.log('Unable to connect to database : ', err)
    })


    const Chat = sequelize.define('chat',{
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        message: {
            type: Sequelize.STRING
        }
    });
    

    router.get('/',(req,res) => {
        res.send('home pagee')
    })


    //Afficher les donnee
    
    router.get('/post', (req,res) => {
        // res.send('Hello')
        Chat.findAll().then(chat=> {
            // var getChat = JSON.stringify(chat, null, 4)
            // var chatParsing = JSON.parse(getChat)
            console.log(chat)
            res.render('post.ejs', {chat})
        
        })
    })

    router.get('/add', (req,res)=>{
        res.render('index.ejs')
    })
    // Cree de nouveaux message
    router.post('/newPost', (req, res) => {
        Chat.create({name: req.body.name, message: req.body.message})
        .then(chatBox => {
                console.log(chatBox)
        })

        res.redirect('/post');
        // console.log(db.chatParsed)

    })


module.exports = router;

