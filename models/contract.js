const {Sequelize, dbInstance} = require('./db');

class Contract extends Sequelize.Model {
    static
}
Contract.init({
    terms: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('new', 'in_progress', 'terminated')
    }
}, {
    sequelize: dbInstance,
    modelName: 'Contract'
});

module.exports = Contract;
