const { Sequelize, DataTypes } = require ('sequelize');
const sequelize = new Sequelize ('lks25', 'root', '', {
    host : 'localhost',
    dialect : 'mysql'
})

const db = [];

db.Sequelize = Sequelize,
db.sequelize = sequelize

db.event = require('./event.js')(sequelize, DataTypes)
db.user = require('./users.js')(sequelize, DataTypes)

module.exports = db;