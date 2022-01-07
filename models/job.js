const {Sequelize, dbInstance} = require('./db');

class Job extends Sequelize.Model {}
Job.init({
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    price: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false
    },
    paid: {
        type: Sequelize.BOOLEAN,
        default: false
    },
    paymentDate: {
        type: Sequelize.DATE
    }
}, {
    sequelize:dbInstance,
    modelName: 'Job'
});

module.exports = Job;
