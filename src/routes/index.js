const { Router } = require("express");
const router = Router();

// rutas
router.use("/users", (req, res) => {
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

router.use("/roles", (req, res) => {
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

router.use("/statuses", (req, res) => {
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

router.use("/login", (req, res) => {
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



module.exports = router;