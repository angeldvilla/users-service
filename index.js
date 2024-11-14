const express = require('express');
const soap = require('soap');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const sequelize = require('./src/config/db');

//rutas
const routes = require('./src/routes/index');

//servicios
const userService = require('./src/service/userService');
const rolesService = require('./src/service/roleService');
const statusService = require('./src/service/statService');
const loginService = require('./src/service/loginService');

//WSDL
const usersWSDL = fs.readFileSync('src/wsdl/users.wsdl', 'utf8');
const rolesWSDL = fs.readFileSync('src/wsdl/roles.wsdl', 'utf8');
const statusesWSDL = fs.readFileSync('src/wsdl/status.wsdl', 'utf8');
const loginWSDL = fs.readFileSync('src/wsdl/login.wsdl', 'utf8');

const app = express();
const port = 3002;

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


// Conexion a base de datos
sequelize.authenticate()
    .then(() => {
        console.log('La conexión se ha establecido correctamente.');

        // rutas
        app.use(routes);

        app.listen(port, function () {
            soap.listen(app, '/users', userService, usersWSDL);
            soap.listen(app, '/roles', rolesService, rolesWSDL);
            soap.listen(app, '/statuses', statusService, statusesWSDL);
            soap.listen(app, '/login', loginService, loginWSDL);
            console.log(`Servidor SOAP corriendo en el puerto ${port}`);
        });
    })
    .catch(err => {
        console.log('No se puede conectar a la base de datos: \n', err);
    });
