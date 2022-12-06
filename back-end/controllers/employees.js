const { Sequelize } = require('sequelize')
const Employees = require('../models/employees')
const moment = require('moment')

async function getEmployees(req, res) {
    
    const employees = await Employees.findAll({
        attributes: [
            'name',
            'age',
            'jobFunction',
            [Sequelize.fn('concat', Sequelize.fn('format', Sequelize.col('salary'), 'pt_BR')), 'salary'],
            [Sequelize.fn('concat', Sequelize.fn('format', Sequelize.col('salary_target'), 'pt_BR')), 'salaryTarget'],
        ],
    })

    res.send(employees)
    res.end()
}

async function graphicDonut(req, res) {
    
    const salary = await Employees.findAll({
        attributes: [
            'salary'
        ]
    })

    const salaryList = [0, 0, 0, 0, 0]
    salary.map( value => {
        
        if (value.salary > 0 && value.salary <= 500) {
            salaryList[0] += 1
        }
        if (value.salary > 500 && value.salary <= 1000) {
            salaryList[1] += 1
        }
        if (value.salary > 1000 && value.salary <= 2000) {
            salaryList[2] += 1
        }
        if (value.salary > 2000 && value.salary <= 10000) {
            salaryList[3] += 1
        }
        if (value.salary > 10000) {
            salaryList[4] += 1
        }
    })

    res.send(salaryList)
    res.end()
}

async function graphicColumn(req, res) {

    const employees = await Employees.findAll({
        attributes: [
            'name',
            'salary',
            'salaryTarget'
        ],
    })

    res.send(employees)
    res.end()
}

async function graphicLine(req, res) {

    const entryResignationDate = await Employees.findAll({
        attributes: [
            'entryDate',
            'resignationDate'
        ],
    })

    const counterList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    entryResignationDate.map(value => {

        const entryYear = moment(value.entryDate).format('YYYY')
        const entryMonth = moment(value.entryDate).format('M')
        const resignationYear = moment(value.resignationDate).format('YYYY')
        const resignationMonth = moment(value.resignationDate).format('M')
        
        if (resignationYear == 'Invalid date' || resignationMonth == 'Invalid date') {
            for (let counter = entryMonth; counter <= 12; counter += 1) {
                counterList[counter - 1] += 1
            }
        }
    })

    res.send(entryResignationDate)
    res.end()

}

module.exports = { getEmployees, graphicDonut, graphicColumn, graphicLine }
