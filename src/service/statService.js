const Status = require('../models/status');

const statusService = {
    StatuService: {
        StatusPort: {
            /* Funciones para estados */
            getStatus: async function () {
                try {
                    const status = await Status.findAll();
                    return {
                        status: status.map(s => s.dataValues)
                    };

                } catch (error) {
                    console.log('Error al obtener los roles:', error);
                    return { message: 'No se pudieron obtener los roles'};
                }
            },

            createStatus: async function (args) {
                try {
                    const stat = await Status.create(args);
                    return {
                        success: 'Estado de usuario creado con éxito',
                        stat: stat.dataValues
                    };

                } catch (error) {
                    console.log('Error al crear el estado de usuario:', error);
                    return { message: 'Error al crear el estado de usuario' };
                }
            },
        },
    },
};

module.exports = statusService;
