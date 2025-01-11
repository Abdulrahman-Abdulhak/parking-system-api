const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('test', 'munier', 'moner1234', {
    host: 'localhost',
    dialect: 'mysql'
});

const User = sequelize.define('User', {
    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userType: {
        type: DataTypes.ENUM('Employee', 'Visitor'),
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    carPlate: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

const createUsersTable = async () => {
    await User.sync();
};

module.exports = { User, createUsersTable };