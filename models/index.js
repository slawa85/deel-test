const Contract = require('./contract');
const Job = require('./job');
const Profile = require('./profile');
const { Sequelize, dbInstance } = require('./db');

Profile.hasMany(Contract, { as: 'Contractor', foreignKey: 'ContractorId' });
Profile.hasMany(Contract, { as: 'Client', foreignKey: 'ClientId' });

Job.belongsTo(Contract);

Contract.belongsTo(Profile, {as: 'Contractor'});
Contract.belongsTo(Profile, {as: 'Client'});
Contract.hasMany(Job);

module.exports = {
  Sequelize,
  Profile,
  Contract,
  Job,
  dbInstance
};
