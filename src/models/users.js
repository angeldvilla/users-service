const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Role = require('./roles');
const Status = require('./status');

const Users = sequelize.define('Users', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Role,
            key: 'id'
        },
    },
    status_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Status,
            key: 'id'
        },
    }
}, {
    timestamps: false,
});

module.exports = Users;


Users.belongsTo(Role, { foreignKey: 'role_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Role.hasMany(Users, { foreignKey: 'role_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Users.belongsTo(Status, { foreignKey: 'status_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Status.hasMany(Users, { foreignKey: 'status_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });