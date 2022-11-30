const getEmployes = require('../controllers/employees')
const server = require('../models/server')

server.router.get('/employees/table', getEmployes)