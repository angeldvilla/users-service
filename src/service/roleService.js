const Roles = require("../models/roles");


const rolesService = {
    RoleService: {
        RolesPort: {
            /* Funciones para roles */
            getRoles: async function () {
                try {
                    const roles = await Roles.findAll();
                    return {
                        roles: roles.map(r => r.dataValues)
                    };

                } catch (error) {
                    console.error('Error al obtener los roles:', error);
                    throw new Error('No se pudieron obtener los roles');
                }
            },

            createRole: async function (args) {
                try {
                    const role = await Roles.create(args);
                    return {
                        success: 'Rol creado con éxito',
                        role: role.dataValues
                    };

                } catch (error) {
                    console.error('Error al crear el rol:', error);
                    throw new Error('Error al crear el rol');
                }
            },
        },
    },
};

module.exports = rolesService;
