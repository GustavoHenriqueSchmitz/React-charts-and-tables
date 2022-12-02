import { Header } from './header/Header';
import React, { useEffect, useState } from 'react';
import { api } from '../service/axios';
import { ButtonsGraphicTable } from './buttons/GraphicTable';
import { GenerateTable } from './table/GenerateTable'

function Table() {

    const [data, setData] = useState(React.useMemo(
        () => [],[]
    ))
    
    const columns = React.useMemo(
        () => [
            {
                Header: 'Nome',
                accessor: 'name',
            },
            {
                Header: 'Idade',
                accessor: 'age',
            },
    
            {
                Header: 'Função',
                accessor: 'jobFunction',
            },
            {
                Header: 'Salário',
                accessor: 'salary',
            },
            {
                Header: 'Meta',
                accessor: 'salaryTarget',
            },
        ],
        []
    )
    
        useEffect(()=> {
        async function getData() {
            const employees = await api.get('/employees')
            setData(employees.data)
        }
        getData()
    }, [])
    
    return (
        <>
            <Header title='TABELA'/>
            <ButtonsGraphicTable textButtonLeft="Gráfico" textButtonRight="Tabela"/>
            <GenerateTable columns={columns} data={data}/>
        </>
    );
}

export { Table }