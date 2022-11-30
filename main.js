require('./routes/employees')
const server = require('./models/server');
const express = require('express');
const cors = require('cors');

(async () => {

    server.app.use(express.json());
    server.app.use(express.urlencoded({
        extended: false
    }));
    server.app.use(cors())
    // Define the application routes
    server.app.use('/api', server.router)

    try {
        await server.database.authenticate();
        await server.database.sync();
        console.log('Connection with database established.')
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    try {
        server.app.listen(server.port, () => {
            console.log(`Server running in ${server.port}...`)
        });
    } catch(error) {
        console.log(error)
    }
})()
