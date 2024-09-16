const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Users = require('./users');

const Login = sequelize.define('Login', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Users,
            key: 'id',
        },
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },

}, {
    timestamps: true,
});

module.exports = Login;

Login.belongsTo(Users, { foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });