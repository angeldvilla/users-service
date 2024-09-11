const express = require('express');
const soap = require('soap');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const sequelize = require('./src/config/db');

//servicios
const userService = require('./src/service/userService');
const rolesService = require('./src/service/roleService');
const statusService = require('./src/service/statService');

//WSDL
const usersWSDL = fs.readFileSync('src/wsdl/users.wsdl', 'utf8');
const rolesWSDL = fs.readFileSync('src/wsdl/roles.wsdl', 'utf8');
const statusesWSDL = fs.readFileSync('src/wsdl/status.wsdl', 'utf8');

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

        // Página de presentación usuarios
        app.get('/users', (req, res) => {
            res.send(`
            <html>
                <head>
                <title>Servicio de Usuarios</title>
                </head>
                <body>
                <h1>Bienvenido al Servicio de Usuarios</h1>
                <p>Este servicio SOAP permite realizar las siguientes operaciones:</p>
                <ul>
                    <li>Obtener todos los usuarios: <code>getAllUsers</code></li>
                    <li>Obtener detalles de un usuario: <code>getUserDetail</code></li>
                    <li>Crear un usuario: <code>createUser</code></li>
                    <li>Actualizar un usuario: <code>updateUser</code></li>
                    <li>Eliminar un usuario: <code>deleteUser</code></li>
                </ul>
                <p>Puedes ver el archivo WSDL desde el siguiente enlace:</p>
                <a href="/users/wsdl">Ver WSDL</a>
                </body>
            </html>
            `);
        });

        // Página de presentación estados
        app.get('/statuses', (req, res) => {
            res.send(`
            <html>
                <head>
                <title>Servicio de Estados</title>
                </head>
                <body>
                <h1>Bienvenido al Servicio de Estados</h1>
                <p>Este servicio SOAP permite realizar las siguientes operaciones:</p>
                <ul>
                    <li>Obtener todos los estados: <code>getStatus</code></li>
                    <li>Crear un estado: <code>createStatus</code></li>
                </ul>
                <p>Puedes ver el archivo WSDL desde el siguiente enlace:</p>
                <a href="/statuses/wsdl">Ver WSDL</a>
                </body>
            </html>
            `);
        });

        // Página de presentación roles
        app.get('/roles', (req, res) => {
            res.send(`
            <html>
                <head>
                <title>Servicio de Roles</title>
                </head>
                <body>
                <h1>Bienvenido al Servicio de Roles</h1>
                <p>Este servicio SOAP permite realizar las siguientes operaciones:</p>
                <ul>
                    <li>Obtener todos los roles: <code>getRoles</code></li>
                    <li>Crear un rol: <code>createRole</code></li>
                </ul>
                <p>Puedes ver el archivo WSDL desde el siguiente enlace:</p>
                <a href="/roles/wsdl">Ver WSDL</a>
                </body>
            </html>
            `);
        });

        // Servir el archivo WSDL
        app.get('/statuses/wsdl', (req, res) => {
            res.set('Content-Type', 'text/xml');
            res.send(statusesWSDL);
        });

        // Servir el archivo WSDL
        app.get('/roles/wsdl', (req, res) => {
            res.set('Content-Type', 'text/xml');
            res.send(rolesWSDL);
        });

        // Servir el archivo WSDL
        app.get('/users/wsdl', (req, res) => {
            res.set('Content-Type', 'text/xml');
            res.send(usersWSDL);
        });

        app.listen(port, function () {
            soap.listen(app, '/users', userService, usersWSDL);
            soap.listen(app, '/roles', rolesService, rolesWSDL);
            soap.listen(app, '/statuses', statusService, statusesWSDL);
            console.log(`Servidor SOAP corriendo en el puerto ${port}`);
        });
    })
    .catch(err => {
        console.error('No se puede conectar a la base de datos:', err);
    });
