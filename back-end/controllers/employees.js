const { Sequelize } = require('sequelize')
const Employees = require('../models/employees')
const moment = require('moment')

// Function getEmployees, get the employees datas.
async function getEmployees(req, res) {
    
    // Make the appointment.
    const employees = await Employees.findAll({
        attributes: [
            'name',
            'age',
            'jobFunction',
            [Sequelize.fn('concat', Sequelize.fn('format', Sequelize.col('salary'), 'pt_BR')), 'salary'],
            [Sequelize.fn('concat', Sequelize.fn('format', Sequelize.col('salary_target'), 'pt_BR')), 'salaryTarget'],
        ],
    })

    // Respond with information.
    res.send(employees)
    res.end()
}

// Function graphicDonut, get the salary data from the employees to use in the donut graphic.
async function graphicDonut(req, res) {
    
    // Make the appointment.
    const salary = await Employees.findAll({
        attributes: [
            'salary'
        ]
    })

    // Counts the number of people with a given salary, within a range.
    const rangeList = [0, 0, 0, 0, 0]
    salary.map( object => {
        
        if (object.salary > 0 && object.salary <= 500) {
            rangeList[0] += 1
        }
        if (object.salary > 500 && object.salary <= 1000) {
            rangeList[1] += 1
        }
        if (object.salary > 1000 && object.salary <= 2000) {
            rangeList[2] += 1
        }
        if (object.salary > 2000 && object.salary <= 10000) {
            rangeList[3] += 1
        }
        if (object.salary > 10000) {
            rangeList[4] += 1
        }
    })

    // Return the quantity by range.
    res.send(rangeList)
    res.end()
}

// Function graphicColumn, get some employees information to use in the column graphic.
async function graphicColumn(req, res) {

    // Make the appointment
    const employees = await Employees.findAll({
        attributes: [
            'name',
            'salary',
            'salaryTarget'
        ],
    })

    // Respond with information.
    res.send(employees)
    res.end()
}

// Function graphicLine, return the quantity of employees by month.
async function graphicLine(req, res) {

    // Make the appointment
    const entryResignationDate = await Employees.findAll({
        attributes: [
            'entryDate',
            'resignationDate'
        ],
    })

    // Validate employees, and count the employees.
    const counterList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    entryResignationDate.map(object => {

        // Gets the date information of the employee being verified.
        const entryYear = Number(moment(object.entryDate).format('YYYY'))
        const entryMonth = Number(moment(object.entryDate).format('M'))
        const resignationYear = Number(moment(object.resignationDate).format('YYYY'))
        const resignationMonth = Number(moment(object.resignationDate).format('M'))
        
        // Checks whether the employee has already been fired or not.
        if (isNaN(resignationYear) || isNaN(resignationMonth)) {
            
            // Checks if the employee entered before 2022 or not, and counts him.
            if (entryYear < 2022) {
                for (let counter = 0; counter <= 11; counter += 1) {
                    counterList[counter] += 1
                }
            }
            
            else {
                for (let counterMonth = entryMonth; counterMonth <= 12; counterMonth += 1) {
                    counterList[counterMonth - 1] += 1
                }
            }
        } else {
            
            // Checks if the employee entered before 2022 or not, and counts him.
            if (entryYear < 2022) {
                for (let counter = 0; counter <= resignationMonth; counter += 1) {
                    counterList[counter] += 1
                }
            } else {
                for (let counterMonth = entryMonth; counterMonth <= resignationMonth; counterMonth += 1) {
                    counterList[counterMonth - 1] += 1
                }
            }
        }
    })

    // Return the quantity of employees by month.
    res.send(counterList)
    res.end()
}

module.exports = { getEmployees, graphicDonut, graphicColumn, graphicLine }
