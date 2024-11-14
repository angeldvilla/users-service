const bcrypt = require('bcrypt');
const Users = require("../models/users");
const Roles = require("../models/roles");
const Status = require('../models/status');

const SALT_ROUNDS = 10;

const userService = {
    UserService: {
        UsersPort: {
            /* Funciones para usuarios */
            getAllUsers: async function () {
                try {
                    const users = await Users.findAll({
                        include: [Roles, Status]
                    });

                    const userResponse = users.map(user => {
                        return {
                            id: user.id,
                            nombre: user.name,
                            apellido: user.lastname,
                            direccion: user.address,
                            telefono: user.phone,
                            correo: user.email,
                            usuario: user.username,
                            rol: user.Role ? user.Role.rol : null,
                            estado: user.Status ? user.Status.status_name : null
                        };
                    })

                    return {
                        users: userResponse
                    };

                } catch (error) {
                    console.log('Error al obtener los usuarios:', error);
                    return { message: 'No se encontraron los usuarios' };
                }
            },

            getUserDetail: async function (args) {
                try {
                    const user = await Users.findByPk(args.id, {
                        include: [Roles, Status]
                    });
                    if (!user) {
                        throw new Error('Usuario no encontrado');
                    }

                    const userResponse = {
                        id: user.id,
                        nombre: user.name,
                        apellido: user.lastname,
                        direccion: user.address,
                        telefono: user.phone,
                        correo: user.email,
                        usuario: user.username,
                        rol: user.Role ? user.Role.rol : null,
                        estado: user.Status ? user.Status.status_name : null
                    };


                    return {
                        userDetails: userResponse
                    };

                } catch (error) {
                    console.log('Error al obtener los detalles del usuario:', error);
                    return { message: 'Error al obtener los detalles del usuario' };
                }
            },

            createUser: async function (args) {
                try {
                    const existingUser = await Users.findOne({ where: { username: args.username } });
                    if (existingUser) {
                        throw new Error('El usuario ya existe');
                    }

                    // Encriptar la contraseña
                    const hashedPassword = await bcrypt.hash(args.password, SALT_ROUNDS);
                    args.password = hashedPassword;

                    const newUser = await Users.create(args);

                    const roleName = await Roles.findOne({ where: { id: args.role_id } });
                    const status = await Status.findOne({ where: { id: args.status_id } });
                    return {
                        success: 'Usuario creado con éxito',
                        userId: newUser.id.toString(),
                        name: newUser.name,
                        rol: roleName.rol,
                        status: status.status_name,
                    };

                } catch (error) {
                    console.log('Error al crear el usuario:', error);
                    return { message: 'Error al crear el usuario' };
                }
            },
            
            updateUser: async function (args) {
                try {
                    const user = await Users.findByPk(args.id);
                    if (!user) {
                        throw new Error('Usuario no encontrado');
                    }

                    // Actualizar campos del usuario
                    user.name = args.name || user.name;
                    user.lastname = args.lastname || user.lastname;
                    user.address = args.address || user.address;
                    user.phone = args.phone || user.phone;
                    user.email = args.email || user.email;
                    user.username = args.username || user.username;
                    user.password = args.password ? await bcrypt.hash(args.password, SALT_ROUNDS) : user.password;
                    
                    const userUpdated = await user.save();

                    const userResponse = {
                        id: userUpdated.id,
                        nombre: userUpdated.name,
                        apellido: userUpdated.lastname,
                        direccion: userUpdated.address,
                        telefono: userUpdated.phone,
                        correo: userUpdated.email,
                        usuario: userUpdated.userUpdatedname,
                        rol: userUpdated.Role ? userUpdated.Role.rol : null,
                        estado: userUpdated.Status ? userUpdated.Status.status_name : null
                    }

                    return {
                        success: 'Usuario actualizado con éxito',
                        user: userResponse
                    };

                } catch (error) {
                    console.log('Error al actualizar el usuario:', error);
                    return { message: 'Error al actualizar el usuario' };
                }
            },

            deleteUser: async function (args) {
                try {
                    const user = await Users.findByPk(args.id);
                    if (!user) {
                        throw new Error('Usuario no encontrado');
                    }

                    await user.destroy();
                    return { success: 'Usuario eliminado exitosamente' };

                } catch (error) {
                    console.log('Error al eliminar usuario:', error);
                    return { message: 'Error al eliminar usuario' };
                }
            },
        },
    },
};

module.exports = userService;
