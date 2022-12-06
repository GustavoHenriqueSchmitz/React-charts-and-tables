const { getEmployees, graphicDonut, graphicColumn, graphicLine } = require('../controllers/employees')
const server = require('../models/server')

server.router.get('/employees', getEmployees)
server.router.get('/graphic/donut', graphicDonut)
server.router.get('/graphic/column', graphicColumn)
server.router.get('/graphic/line', graphicLine)
