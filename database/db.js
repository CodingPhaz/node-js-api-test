const Sequelize = require('sequelize')

module.exports =  new Sequelize('testdbnode', 'root', 'root', {
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions:{
        timezone : 'Etc/GMT0',
    },
    sync: { force: true },
    pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

})