const sequelize = require('./config/db');
const Users = require('./models/users');
const Roles = require('./models/roles');

sequelize.sync({ force: true })
    .then(() => {
        console.log("Database & tables created!");
    })
    .catch(err => {
        console.error('Error syncing database:', err);
    });