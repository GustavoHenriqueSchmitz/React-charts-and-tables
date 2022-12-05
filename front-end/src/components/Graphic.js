import React, { useEffect, useState } from "react"
import { api } from "../service/axios"
import { ButtonsGraphicTable } from "./buttons/GraphicTable"
import { GenerateGraphic } from "./graphic/GenerateGraphic"
import { Header } from "./header/Header"

function Graphic() {

    const [series, setSeries] = useState(React.useMemo(
        () => [],[]
    ))

    useEffect(()=> {
        async function getSalary() {
            const salary = await api.get('/employees/salary')
            setSeries(salary.data)
        }
        getSalary()
    }, [])

    const options = {
        series: series,
        labels: ['0 a 500', '500 a 1000', '1000 a 2000', '2000 a 10000', '10000 >']
    }

    return (
        <>
            <Header title="GRÁFICO"/>
            <ButtonsGraphicTable textButtonLeft="Gráfico" textButtonRight="Tabela"/>
            <GenerateGraphic options={options}/>
        </>
    )
}

// Define a custom filter filter function!
function filterGreaterThan(rows, id, filterValue) {
    return rows.filter(row => {
        const rowValue = row.values[id]
        return rowValue >= filterValue
    })
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = val => typeof val !== 'number'

export { Graphic }
