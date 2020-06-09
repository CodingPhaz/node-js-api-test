const Sequelize = require('sequelize')
const sequelize = new Sequelize('testdbnode', 'root', 'root', {
    host: 'localhost',
    dialect: 'mariadb'
})
// const post = require('../server.js')


sequelize.authenticate()
    .then(() => {
        console.log('Connection is OK')
    })
    .catch(err => {
        console.log('Unable to connect to database : ', err)
    })



const Model = Sequelize.Model;
class Chat extends Model{}

Chat.init({
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    message: {
        type: Sequelize.STRING
    }
}, {
    sequelize,
    modelName: 'chat'
}
)


Chat.findAll().then(chat => {
    var getData = JSON.stringify(chat,null,4);
    var parseResult = JSON.parse(getData)
    for(const getOne in parseResult){
        console.log(`Nom : ${parseResult[getOne].name} 
        Message : ${parseResult[getOne].message}`)
    }

    let chatt = JSON.stringify(chat,null, 4)
    exports.chatted = JSON.parse(chatt)
})

// console.log('nouveaux post ajouter ',post)
Chat.create(post)

