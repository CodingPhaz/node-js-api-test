const Sequelize = require('sequelize')

const sequelize = new Sequelize('testdbnode', 'root', 'root', {
    host: 'localhost',
    dialect: 'mariadb'
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


Chat.findAll().then(chat => {
    var ok = JSON.stringify(chat,null,4);
    var result = JSON.parse(ok)
    for(const x in result){
        console.log(`Nom : ${result[x].name} 
        Message : ${result[x].message}`)
    }
    // for(var i = 0; i < ok.name;  i++ ){
        // console.log(ok["id"])
    // }
    // console.log('All message in chat : ', JSON.stringify(chat,null, 2))
    let chatt = JSON.stringify(chat,null, 4)
    module.exports.chatted = JSON.parse(chatt)
})

// Chat.create({ name: 'Sophonie', message: 'Salut tout marche parfaitement'}).then(sam => {
//     console.log('Your id is ', sam.id)
// })