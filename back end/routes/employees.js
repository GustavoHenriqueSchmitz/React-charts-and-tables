const { getEmployees, getSalary } = require('../controllers/employees')
const server = require('../models/server')

server.router.get('/employees', getEmployees)
server.router.get('/employees/salary', getSalary)
