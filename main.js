const express = require('express');
const cors = require('cors');
const server = require('./models/server');

server.app.use(express.json());
server.app.use(express.urlencoded({
    extended: false
}));
server.app.use(cors())

server.app.listen(3330, () => {
    console.log(`Server running in ${server.port}...`)
});