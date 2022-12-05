import { Header } from './header/Header';
import React, { useEffect, useState } from 'react';
import { api } from '../service/axios';
import { ButtonsGraphicTable } from './buttons/GraphicTable';
import { GenerateTable } from './table/GenerateTable';
import { SliderColumnFilter } from './table/GenerateTable'

function Table() {

    const [data, setData] = useState(React.useMemo(
        () => [],[]
    ))
    
    const columns = React.useMemo(
        () => [
            {
                Header: 'Nome',
                accessor: 'name',
                filter: 'fuzzyText',
            },
            {
                Header: 'Idade',
                accessor: 'age',
                Filter: SliderColumnFilter,
            },
    
            {
                Header: 'Função',
                accessor: 'jobFunction',
                filter: 'fuzzyText',
            },
            {
                Header: 'Salário',
                accessor: 'salary',
                filter: 'fuzzyText',
                Cell: ({ value }) => { return `R$ ${value?value:0}` }         
            },
            {
                Header: 'Meta',
                accessor: 'salaryTarget',
                filter: 'fuzzyText', 
                Cell: ({ value }) => { return `R$ ${value?value:0}` }         
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