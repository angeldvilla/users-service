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
const loginService = require('./src/service/loginService');
const { viewProductsClient, searchProduct, filterProducts } = require('./src/service/viewProducts');

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
        app.get("/users", (req, res) => {
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
        }
        );

        app.get("/roles", (req, res) => {
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

        app.get("/statuses", (req, res) => {
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

        app.get("/login", (req, res) => {
            res.send(`
    <html>
        <head>
        <title>Servicio de Login</title>
        </head>
        <body>
        <h1>Bienvenido al Servicio de Login</h1>
        <p>Este servicio SOAP permite realizar las siguientes operaciones:</p>
        <ul>
            <li>Iniciar Sesión: <code>login</code></li>
            <li>Cerrar Sesión: <code>logout</code></li>
        </ul>
        <p>Puedes ver el archivo WSDL desde el siguiente enlace:</p>
        <a href="/login/wsdl">Ver WSDL</a>
        </body>
    </html>
    `);
        });

        // Servir archivos WSDL
        app.get('/statuses/wsdl', (req, res) => {
            res.set('Content-Type', 'text/xml');
            res.send(statusesWSDL);
        });

        app.get('/roles/wsdl', (req, res) => {
            res.set('Content-Type', 'text/xml');
            res.send(rolesWSDL);
        });

        app.get('/users/wsdl', (req, res) => {
            res.set('Content-Type', 'text/xml');
            res.send(usersWSDL);
        });

        app.get('/login/wsdl', (req, res) => {
            res.set('Content-Type', 'text/xml');
            res.send(loginWSDL);
        });

        // Ruta para obtener productos desde el servicio de usuarios
        app.get('/products', async (req, res) => {
            try {
                const xmlResponse = await viewProductsClient(req, res);
                res.set('Content-Type', 'text/xml'); // Establece el tipo de contenido como XML
                return res.status(200).send(xmlResponse); // Envía la respuesta XML
            } catch (error) {
                console.error('Error al obtener productos:', error);
                return res.status(500).send(`<error>Error al obtener productos: ${error.message}</error>`);
            }
        });

        app.get('/products/search/:name', async (req, res) => {
            try {
                const xmlResponse = await searchProduct(req, res);
                res.set('Content-Type', 'text/xml');
                return res.status(200).send(xmlResponse);
            } catch (error) {
                console.error('Error al buscar este producto:', error);
                return res.status(500).send(`<error>Error al buscar este producto: ${error.message}</error>`);
            }
        });


        app.get('/products/filter/:category', async (req, res) => {
            try {
                const xmlResponse = await searchProduct(req, res);
                res.set('Content-Type', 'text/xml');
                return res.status(200).send(xmlResponse);
            } catch (error) {
                console.error('Error al obtener productos por categoría:', error);
                return res.status(500).send(`<error>Error al obtener productos por categoría: ${error.message}</error>`);
            }
        });

        app.listen(port, function () {
            soap.listen(app, '/users', userService, usersWSDL);
            soap.listen(app, '/roles', rolesService, rolesWSDL);
            soap.listen(app, '/statuses', statusService, statusesWSDL);
            soap.listen(app, '/login', loginService, loginWSDL);
            console.log(`Servidor SOAP corriendo en el puerto ${port}`);
        });
    })
    .catch(err => {
        console.log('No se puede conectar a la base de datos:', err);
    });
