const bcrypt = require('bcrypt');
const Users = require("../models/users");
const Roles = require("../models/roles");
const Status = require('../models/status');

const SALT_ROUNDS = 10;

const userService = {
    UserService: {
        UsersPort: {
            getAllUsers: async function () {
                try {
                    const users = await Users.findAll({
                        include: [Roles]
                    });
                    return { users: JSON.stringify(users.map(user => user.dataValues)) };
                } catch (err) {
                    console.error('Error fetching users:', err);
                    throw new Error('Could not fetch users');
                }
            },
            getUserDetail: async function (args) {
                try {
                    const user = await Users.findByPk(args.id, {
                        include: [Roles]
                    });
                    if (!user) {
                        throw new Error('User not found');
                    }
                    return { userDetails: JSON.stringify(user.dataValues) };
                } catch (err) {
                    console.error('Error fetching user details:', err);
                    throw new Error('Could not fetch user details');
                }
            },
            createUser: async function (args) {
                try {
                    const existingUser = await Users.findOne({ where: { username: args.username } });
                    if (existingUser) {
                        throw new Error('User already exists');
                    }

                    // Encriptar la contraseña
                    const hashedPassword = await bcrypt.hash(args.password, SALT_ROUNDS);
                    args.password = hashedPassword;

                    const newUser = await Users.create(args);
                    const roleName = Roles.find(rol => rol.id === newUser.rol_id).rol;
                    const status = Status.find(stat => stat.id === newUser.status_id).status_name;
                    return {
                        success: 'User created successfully',
                        userId: newUser.id.toString(),
                        name: newUser.name,
                        rol: roleName,
                        status: status,
                    };
                } catch (err) {
                    console.error('Error creating user:', err);
                    throw new Error('Error creating user');
                }
            },
            updateUser: async function (args) {
                try {
                    const user = await Users.findByPk(args.id);
                    if (!user) {
                        throw new Error('User not found');
                    }

                    // Actualizar campos del usuario
                    user.username = args.username || user.username;
                    user.password = args.password ? await bcrypt.hash(args.password, SALT_ROUNDS) : user.password;
                    user.email = args.email || user.email;
                    user.name = args.name || user.name;
                    await user.save();

                    return {
                        success: 'User updated successfully',
                        userId: user.id,
                        name: user.name
                    };
                } catch (err) {
                    console.error('Error updating user:', err);
                    throw new Error('Error updating user');
                }
            },
            deleteUser: async function (args) {
                try {
                    const user = await Users.findByPk(args.id);
                    if (!user) {
                        throw new Error('User not found');
                    }

                    await user.destroy();
                    return { success: 'User deleted successfully' };
                } catch (err) {
                    console.error('Error deleting user:', err);
                    throw new Error('Error deleting user');
                }
            }
        }
    }
};

module.exports = userService;
