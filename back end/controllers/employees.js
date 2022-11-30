const Employees = require('../models/employees')

async function getEmployees(req, res) {
    const employees = await Employees.findAll()
    res.send(employees)
    res.end()
}

module.exports = getEmployees