const sequelize = require('./config/db');
const Users = require('./models/users');

sequelize.sync({ force: true })
    .then(() => {
        console.log("Database & tables created!");
    })
    .catch(err => {
        console.error('Error syncing database:', err);
    });