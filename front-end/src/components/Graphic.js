import React, { useEffect, useState } from "react"
import { api } from "../service/axios"
import { ButtonsGraphicTable } from "./buttons/GraphicTable"
import { DonutGraphic } from "./graphic/donut/DonutGraphic"
import { ColumnGraphic } from "./graphic/column/ColumnGraphic"
import { Header } from "./header/Header"
import { LineGraphic } from "./graphic/line/LineGraphic"

function Graphic() {

    const [salary, setSalary] = useState(React.useMemo(
        () => [],[]
    ))
    const [employees, setEmployees] = useState(React.useMemo(
        () => [],[]
    ))
    const [employeesQuantity, setEmployeesQuantity] = useState(React.useMemo(
        () => [],[]
    ))

    useEffect(()=> {
        async function getDatas() {
            const salary = await api.get('/graphic/donut')
            const employees = await api.get('/graphic/column')
            const employeesQuantity = await api.get('/graphic/line')
            setSalary(salary.data)
            setEmployees(employees.data)
            setEmployeesQuantity(employeesQuantity.data)
        }
        getDatas()
    }, [])

    try {

        const optionsDonut = {
            series: salary,
            labels: ['0 a 500', '500 a 1000', '1000 a 2000', '2000 a 10000', '10000 >']
        }

        const optionsColumn = {

            series: [{
                    name: 'Salário',
                    data: [
                        employees[0].salary,
                        employees[1].salary,
                        employees[2].salary,
                        employees[3].salary,
                        employees[4].salary,
                        employees[5].salary,
                        employees[6].salary,
                        employees[7].salary,
                        employees[8].salary
                    ]
                }, {
                    name: 'Meta Salarial',
                    data: [
                        employees[0].salaryTarget,
                        employees[1].salaryTarget,
                        employees[2].salaryTarget,
                        employees[3].salaryTarget,
                        employees[4].salaryTarget,
                        employees[5].salaryTarget,
                        employees[6].salaryTarget,
                        employees[7].salaryTarget,
                        employees[8].salaryTarget
                    ]
                },
            ],
            options: {
                dataLabels: {
                    enabled: false
                },
                xaxis: {
                    categories: [
                        employees[0].name,
                        employees[1].name,
                        employees[2].name,
                        employees[3].name,
                        employees[4].name,
                        employees[5].name,
                        employees[6].name,
                        employees[7].name,
                        employees[8].name
                    ],
                },
                yaxis: {
                    title: {
                        text: 'Funcionários | Comparação de Salários'
                    }
                },
            },
        };

        console.log(employeesQuantity)
    
        return (
            <>
                <Header title="GRÁFICO"/>
                <ButtonsGraphicTable textButtonLeft="Gráfico" textButtonRight="Tabela"/>
                <DonutGraphic options={optionsDonut}/>
                <ColumnGraphic options={optionsColumn}/>
                <LineGraphic name="Total de funcionários"
                    categories={['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dec']}
                    data={employeesQuantity} 
                    text="Quantidade | Funcionários"/>
            </>
        )
    } catch {}
}

export { Graphic }