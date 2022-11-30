const express = require('express');
const { Sequelize } = require('sequelize');

const server = {
    app: express(),
    port: 3330,

    database: new Sequelize('employees', 'root', '', {
        host: '127.0.0.1',
        port: 3306,
        logging: false,
        dialect: 'mysql',
        timezone: '-03:00',
        define: {
            underscored: true
        }
    }),
}

module.exports = server;