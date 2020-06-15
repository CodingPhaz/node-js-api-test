const Sequelize = require('sequelize')
const sequelize = require('../database/db.js')

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

    // Chat.init({
    // }, {
    //     sequelize,
    //     modelName: 'chat'
    // }
    // )


    //Afficher les donnee
  const chatList = Chat.findAll()


let newPost = function newChat(post){
    return Chat.create(post)
}

module.exports= { 
    newPost, 
    sequelize, 
    chatList }


