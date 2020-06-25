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

    //Initialiser le model a la base de donnee
    const Chat = sequelize.define('chat',{
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        message: {
            type: Sequelize.STRING
        }
    });
    
    //afficher la page d'acceuil
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
            res.render('post.ejs', {chat})
        
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

        // res.send(req.params.id)
    })

    //le formulaire d'ajout de nouveaux messsage
    router.get('/add', (req,res)=>{
        res.render('index.ejs')
    })


    // Cree de nouveaux message
    router.post('/newPost', (req, res) => {
        Chat.create({name: req.body.name, message: req.body.message})
        // .then(chatBox => {
        //         // console.log(chatBox)
        // })

        //rediriger apres l'ajout d'un nouveau message
        res.redirect('/post');
        // console.log(db.chatParsed)

    })


    //Show one message
    router.get('/show/:id', (req, res) => {
        // console.log(par)
        Chat.findByPk(req.params.id).then((find) => {
            // var finder = JSON.stringify(find, null , 4)
            // console.log(find)
            res.render('message.ejs', {find})
        })
    })

    //Update message

    router.post('/update/:id', (req,res) => {
        var postId = req.params
        var edited = req.body
        // var edjs = JSON.stringify(edited, null , 4)
        console.log(edited.name)
        console.log(edited.message)
        // console.log(edjs)
        Chat.update({name: edited.name, message: edited.message}, {
            where : {
              id: postId.id
            }
        }).then(() => {
            console.log('updated')
        })

        res.redirect('/post')
    } )



module.exports = router;

