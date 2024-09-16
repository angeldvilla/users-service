const sequelize = require('./config/db');
const Users = require('./models/users');
const Roles = require('./models/roles');
const Status = require('./models/status');
const Login = require('./models/login');

sequelize.sync({ force: true })
    .then(() => {
        console.log("Database & tables created!");
    })
    .catch(err => {
        console.error('Error syncing database:', err);
    });