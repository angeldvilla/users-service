const fs = require('fs');
const { Router } = require("express");
const router = Router();

//funciones
const { viewProductsClient,
        searchProduct,
        filterProductsByCategory, 
        filterProductsByBrand } = require('../service/viewProducts');

//WSDL
const usersWSDL = fs.readFileSync('src/wsdl/users.wsdl', 'utf8');
const rolesWSDL = fs.readFileSync('src/wsdl/roles.wsdl', 'utf8');
const statusesWSDL = fs.readFileSync('src/wsdl/status.wsdl', 'utf8');
const loginWSDL = fs.readFileSync('src/wsdl/login.wsdl', 'utf8');

// rutas
router.get("/", (req, res) => {
    res.send(`
        <html>
            <head>
            <title>Servicio de Gestión de Usuarios</title>
            </head>
            <body>
            <h1>Bienvenido a Servicio de Gestión de Usuarios SEXSHOP 👙🩲</h1>
            <p>Este servicio SOAP permite navegar para explorar como iniciar sesion, los roles, estados, y usuarios registrados en nuestra tienda:</p>
            <ul>
                <li><a href="/role">ROLES</a></li>
                <li><a href="/statuses">ESTADOS</a></li>
                <li><a href="/users">USUARIOS</a></li>
                <li><a href="/login">INICIO DE SESION</a></li>
            </ul>
            </body>
        </html>
        `);
}); 

router.get("/users", (req, res) => {
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

router.get("/roles", (req, res) => {
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

router.get("/statuses", (req, res) => {
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

router.get("/login", (req, res) => {
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
 router.get('/statuses/wsdl', (req, res) => {
    res.set('Content-Type', 'text/xml');
    res.send(statusesWSDL);
});

router.get('/roles/wsdl', (req, res) => {
    res.set('Content-Type', 'text/xml');
    res.send(rolesWSDL);
});

router.get('/users/wsdl', (req, res) => {
    res.set('Content-Type', 'text/xml');
    res.send(usersWSDL);
});

router.get('/login/wsdl', (req, res) => {
    res.set('Content-Type', 'text/xml');
    res.send(loginWSDL);
});

// Ruta para obtener productos desde el servicio de usuarios
router.get('/products', async (req, res) => {
    try {
        const xmlResponse = await viewProductsClient(req, res);
        res.set('Content-Type', 'text/xml'); // Establece el tipo de contenido como XML
        return res.status(200).send(xmlResponse); // Envía la respuesta XML
    } catch (error) {
        console.error('Error al obtener productos:', error);
        return res.status(500).send(`<error>Error al obtener productos: ${error.message}</error>`);
    }
});

router.get('/products/search/:name', async (req, res) => {
    try {
        const xmlResponse = await searchProduct(req, res);
        res.set('Content-Type', 'text/xml');
        return res.status(200).send(xmlResponse);
    } catch (error) {
        console.error('Error al buscar este producto:', error);
        return res.status(500).send(`<error>Error al buscar este producto: ${error.message}</error>`);
    }
});

router.get('/products/filterCategory/:category', async (req, res) => {
    try {
        const xmlResponse = await filterProductsByCategory(req, res);
        res.set('Content-Type', 'text/xml');
        return res.status(200).send(xmlResponse);
    } catch (error) {
        console.error('Error al obtener productos por categoría:', error);
        return res.status(500).send(`<error>Error al obtener productos por categoría: ${error.message}</error>`);
    }
});

router.get('/products/filterBrand/:brand', async (req, res) => {
    try {
        const xmlResponse = await filterProductsByBrand(req, res);
        res.set('Content-Type', 'text/xml');
        return res.status(200).send(xmlResponse);
    } catch (error) {
        console.error('Error al obtener productos por marca:', error);
        return res.status(500).send(`<error>Error al obtener productos por marca: ${error.message}</error>`);
    }
});

module.exports = router;
