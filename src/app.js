const sequelize = require('./config/db');
const Users = require('./models/users');
const Roles = require('./models/roles');
const Status = require('./models/status');
const Login = require('./models/login');

sequelize.sync({ force: true })
    .then(() => {
        console.log("Base de datos sincronizada!");
    })
    .catch(err => {
        console.log('Error sincronizando la base de datos:', err);
    });