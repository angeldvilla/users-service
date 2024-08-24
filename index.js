const express = require('express');
const soap = require('soap');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const userService = require('./src/service/soapService');
const sequelize = require('./src/config/db');

const wsdl = require('fs').readFileSync('src/users.wsdl', 'utf8');

const app = express();

app.name = 'Users API';

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        app.listen(3002, function () {
            console.log('SOAP server listening on port 3002');
        });
        soap.listen(app, '/users', userService, wsdl);
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
