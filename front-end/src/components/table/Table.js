import React from "react"
import { useTable } from "react-table"
import "./Table.css"

function Table({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    })

    // Render the UI for your table
    return (
        <div className="table-container">
            <table className="table" {...getTableProps()}>
                
                <thead>
                    {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()} className="table-title">{column.render('Header')}</th>
                        ))}
                    </tr>
                    ))}
                </thead>
                
                <tbody {...getTableBodyProps()} className="table-body">
                    {rows.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                        })}
                        </tr>
                    )
                    })}
                </tbody>
            
            </table>
        </div>
    )
}

export {Table}
