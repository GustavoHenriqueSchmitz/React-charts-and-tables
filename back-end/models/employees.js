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
        type: Sequelize.DECIMAL(15,2),
        allowNull: false,
    },

    salaryTarget: {
        type: Sequelize.DECIMAL(15,2),
        allowNull: true,
    },

    entryDate: {
        type: Sequelize.DATEONLY(),
        allowNull: false
    },

    resignationDate: {
        type: Sequelize.DATEONLY(),
        allowNull: true
    }

})

module.exports = Employees;
