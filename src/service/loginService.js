const bcrypt = require('bcrypt');
const Login = require('../models/login');
const Users = require('../models/users');

const loginService = {
    LoginService: {
        LoginPort: {
            /* Funciones para estados */
            getLogin: async function (args) {
                try {

                    // validar usuario
                    const user = await Users.findOne({ where: { username: args.username } });

                    //Verificar si el usuario existe
                    if (!user) {
                        return {
                            success: 'Usuario no encontrado',
                            token: '',
                            isActive: false
                        }
                    }

                    // validar session
                    const session = await Login.findOne({ where: { user_id: user.id, isActive: false } });

                    // Comparar la contraseña con bcrypt
                    const validPassword = await bcrypt.compare(args.password, user.password);

                    // Verificar si la contraseña es incorrecta
                    if (!validPassword) {
                        return {
                            success: 'Contraseña incorrecta',
                            token: '',
                            isActive: false
                        };
                    }

                    // crear token para simular manualmente la autenticación
                    const token = Math.random().toString(36).substring(2);

                    // si ya hay una sesion creada para un usuario solo enviar un nuevo token y cambiar el estado isActive
                    if (session) {
                        await Login.update({
                            token: token,
                            isActive: true,
                        },
                            {
                                where: { user_id: user.id }
                            });
                    } else {
                        // Crear una nueva sesión activa
                        await Login.create({
                            token: token,
                            user_id: user.id,
                            isActive: true
                        });
                    }

                    return {
                        success: 'Inicio de sesión exitoso',
                    }

                } catch (error) {
                    console.log('Error al iniciar sesion, verifica los credenciales, intenta de nuevo:', error);
                    return { message: 'Error al iniciar sesion, verifica los credenciales, intenta de nuevo' };
                }
            },

            getLogout: async function (args) {
                try {
                    // Buscar la sesión activa por el user_id
                    const session = await Login.findOne({
                        where: { user_id: args.user_id, isActive: true }
                    });

                    if (!session) {
                        return {
                            success: 'No hay sesión activa para este usuario'
                        };
                    }

                    // Desactivar la sesión
                    await Login.update({ token: "", isActive: false }, {
                        where: { id: session.id }
                    });

                    // eliminar la sesión
                    /* await Login.destroy({
                        where: { id: session.id }
                    }); */

                    return {
                        success: 'Sesión cerrada correctamente'
                    };

                } catch (error) {
                    console.log('Error al cerrar sesión, puede ser que la sesion ya este cerrada o haya expirado:', error);
                    return { message: 'Error al cerrar sesión, puede ser que la sesion ya este cerrada o haya expirado' };
                }
            },

            validateToken: async function (args) {
                try {
                    const session = await Login.findOne({
                        where: { token: args.token, isActive: true }
                    });

                    if (!session) {
                        return {
                            success: "Token inválido o sesión no activa",
                        };
                    }

                    return {
                        success: "Token validado",
                        user: session.user_id,
                    }

                } catch (error) {
                    console.log('Error al validar token:', error);
                    return { message: 'Error al validar token' };
                }
            }
        },
    },
};

module.exports = loginService;
