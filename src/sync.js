const sequelize = require('../src/db');
const User = require('../model/user');

const syncDb = async () => {
    try {
        await sequelize.sync({ force: false });
        console.log('sequelize models synchronized successfully');
    } catch (err) {
        console.error('error synchronizing the database:', err);
    }
};

module.exports = syncDb;