const { getEmployees, graphicDonut, graphicColumn, graphicLine } = require('../controllers/employees')
const server = require('../models/server')

server.router.get('/employees', getEmployees) // Route to get all employees datas.
server.router.get('/graphic/donut', graphicDonut) // Route to get the data for the donut graphic.
server.router.get('/graphic/column', graphicColumn) // Route to get the data for the column graphic.
server.router.get('/graphic/line', graphicLine) // Route to get the data for the line graphic.
