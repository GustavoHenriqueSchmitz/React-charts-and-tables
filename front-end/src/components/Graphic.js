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
            console.log(salary.data)
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

export { Graphic }
