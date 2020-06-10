const Sequelize = require('sequelize')
const sequelize = new Sequelize('testdbnode', 'root', 'root', {
    host: 'localhost',
    dialect: 'mariadb',
    pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})


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

    //Afficher les donnee
    Chat.findAll()
        .then(chat => {
            var getData = JSON.stringify(chat,null,4);
                module.exports.chatParsed = JSON.parse(getData)
       })



let newPost = function newChat(post){
    return Chat.create(post)
}

module.exports.newMessage= newPost

