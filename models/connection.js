const express = require('express')
const router = express.Router();
const app = express()
const Sequelize = require('sequelize')
const sequelize = require('../database/db.js')
var bodyParser = require('body-parser')


//middlewers
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

    //IInit Mode to databse
    const Chat = sequelize.define('chat',{
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        message: {
            type: Sequelize.STRING
        }
    });
    
    //Home page
    router.get('/',(req,res) => {
        res.send('home pagee')
    })

    

    //Afficher les donnee
    
    router.get('/post', (req,res) => {
        // res.send('Hello')
        Chat.findAll().then(chat=> {
            // var getChat = JSON.stringify(chat, null, 4)
            // var chatParsing = JSON.parse(getChat)
            // console.log(chat)
            res.render('allPosts.ejs', {chat})
        
        })
    })


    router.get('/delete/:id', (req,res) => {
        Chat.destroy({
            where: {
                id: req.params.id
            },
        }).then((del)=> {
            res.redirect('/post')
            console.log('Done', del)
        })
    })

    //get form for add new message
    router.get('/add', (req,res)=>{
        res.render('addPost.ejs')
    })


    // create new message
    router.post('/newPost', (req, res) => {
        Chat.create({name: req.body.name, message: req.body.message})
        res.redirect('/post');

    })
    
    
    //Update message
    router.post('/update/:id', (req,res) => {
        var postId = req.params.id
        var edited = req.body
        Chat.update({name: edited.name, message: edited.message}, {
            where : {
              id: postId
            }
        }).then(() => {
            console.log('updated')
        })
        
        res.redirect('/post')
    } )
    

    //Show one message
    router.get('/show/:id', (req, res) => {
        Chat.findByPk(req.params.id).then((find) => {
            res.render('post.ejs', {find})
        })
    })
    

module.exports = router;

