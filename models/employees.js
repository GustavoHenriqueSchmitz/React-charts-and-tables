const Sequelize = require('sequelize')
const server = require('./server');

const Employees = server.database.define('employees', {
    
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },

    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    age: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },

    jobFunction: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    salary: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
    },

    salaryTarget: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
    }
})

module.exports = Employees;
