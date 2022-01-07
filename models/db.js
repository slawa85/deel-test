const Sequelize = require('sequelize');
const dbInstance = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite3'
});

module.exports = {
    Sequelize,
    dbInstance
}
