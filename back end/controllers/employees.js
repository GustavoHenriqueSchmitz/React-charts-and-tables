const { Sequelize } = require('sequelize')
const Employees = require('../models/employees')

async function getEmployees(req, res) {
    
    const employees = await Employees.findAll({
        attributes: [
            'name',
            'age',
            'jobFunction',
            'salary',
            [Sequelize.fn('concat', 'R$ ', Sequelize.fn('format', Sequelize.col('salary'), 'pt_BR')), 'salary'],
            [Sequelize.fn('concat', 'R$ ', Sequelize.fn('format', Sequelize.col('salary_target'), 'pt_BR')), 'salaryTarget'],
        ],
    })

    res.send(employees)
    res.end()
}

async function getSalary(req, res) {
    const salary = await Employees.findAll({
        attributes: [
            'salary'
        ]
    })

    res.send(salary)
    res.end()
}

module.exports = { getEmployees, getSalary }