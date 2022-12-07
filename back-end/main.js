require('./routes/employees')
const server = require('./models/server');
const express = require('express');
const cors = require('cors');

// Initialize server, async function.
(async () => {

    // Config server to use json
    server.app.use(express.json());
    server.app.use(express.urlencoded({
        extended: false
    }));
    // Config cors and routes for the server, using /api with the base route.
    server.app.use(cors())
    server.app.use('/api', server.router)

    // Test connection with the database and define the models.
    try {
        await server.database.authenticate();
        await server.database.sync();
        console.log('Connection with database established.')
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    // Start the server.
    try {
        server.app.listen(server.port, () => {
            console.log(`Server running in ${server.port}...`)
        });
    } catch(error) {
        console.log(error)
    }
})()
