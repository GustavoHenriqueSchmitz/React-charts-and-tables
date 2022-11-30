import './App.css';
import { Header } from './components/header/Header';
import { ButtonsGraficTable } from './components/buttons/GraphicTable';
import { Table } from './components/table/Table';
import React from 'react';

function App() {

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

  const data = React.useMemo(
    () => [
      {
        name: 'Marcelo',
        age: 19,
        jobFunction: 'Programador',
        salary: 'R$ 4.500',
        salaryTarget: 'R$ 15.000'
      },
      {
        name: 'Marcelo',
        age: 19,
        jobFunction: 'Programador',
        salary: 'R$ 4.500',
        salaryTarget: 'R$ 15.000' 
      },
      {
        col1: 'whatever',
        col2: 'you want',
      },
    ],
    []
  )

  return (
    <>
      <Header title='TABELA'/>
      <ButtonsGraficTable textButtonLeft="Gráfico" textButtonRight="Tabela"/>
      <Table columns={columns} data={data}/>
    </>
  );
}

export default App;
