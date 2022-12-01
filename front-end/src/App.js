import './App.css';
import { Header } from './components/header/Header';
import { Table } from './components/table/Table';
import React, { useEffect, useState } from 'react';
import { api } from './service/axios';
import { ButtonsGraficTable } from './components/buttons/GraphicTable';

function App() {

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
      const employees = await api.get('/employees/table')
      setData(employees.data)
    }
    getData()
  }, [])

  return (
    <>
      <Header title='TABELA'/>
      <ButtonsGraficTable textButtonLeft="Gráfico" textButtonRight="Tabela"/>
      <Table columns={columns} data={data}/>
    </>
  );
}

export default App;
