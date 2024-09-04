const express = require('express');
const soap = require('soap');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const sequelize = require('./src/config/db');

//servicios
const userService = require('./src/service/userService');
const rolesService = require('./src/service/roleService');
const statusService = require('./src/service/statService');

//WSDL
const usersWSDL = require('fs').readFileSync('src/wsdl/users.wsdl', 'utf8');
const rolesWSDL = require('fs').readFileSync('src/wsdl/roles.wsdl', 'utf8');
const statusesWSDL = require('fs').readFileSync('src/wsdl/status.wsdl', 'utf8');

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
        console.log('La conexión se ha establecido correctamente.');
        soap.listen(app, '/users', userService, usersWSDL);
        soap.listen(app, '/roles', rolesService, rolesWSDL);
        soap.listen(app, '/statuses', statusService, statusesWSDL);
        
        app.listen(3002, function () {
            console.log('Servidor SOAP corriendo en el puerto 3002');
        });
    })
    .catch(err => {
        console.error('No se puede conectar a la base de datos:', err);
    });
