import React from "react"
import { useTable, usePagination  } from "react-table"
import "./Table.css"
import ReactSelect from 'react-select'

function colunaSelect(column){
    return (
        <div key={column?.data?.id}>
            <label>
            <input type="checkbox" {...column?.data?.getToggleHiddenProps()} />{' '}
            {column?.data?.Header}
            </label>
        </div>
    )
}

function Table({ columns, data }) {
    
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page, 
    
        canPreviousPage,
        canNextPage,
        pageOptions,
        allColumns,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
        } = useTable(
            {
                columns,
                data,
                initialState: { pageIndex: 0 },
            },
            usePagination
        )

    // Render the UI for your table
    return (
        <>
            <div className="options-container">
                <div className="show-option">
                    <select
                        value={pageSize}
                        onChange={e => {
                        setPageSize(Number(e.target.value))
                        }}
                        className="show-select text"
                        >
                        {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Mostar {pageSize}
                        </option>
                        ))}
                    </select>
                </div>
                <div className="hide-columns-option text">
                    <ReactSelect
                        options={allColumns}
                        isMulti
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        components={{ Option: colunaSelect }}
                        allowSelectAll={true}
                        className="hide-columns-select"
                    />
                </div>
            </div>

            <div className="table-container">
                <table className="table" {...getTableProps()}>
                    
                    <thead>
                        {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                            <th className="sub-title" {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                        ))}
                    </thead>
                    
                    <tbody {...getTableBodyProps()} className="table-body">
                        {page.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td className="text" {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                            </tr>
                        )
                        })}
                    </tbody>
                </table>
                
                <div className="pagination">
                    <div className="pagination-buttons">
                        <button className="button-navigate" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                            {'<<'}
                        </button>{' '}
                        <button className="button-navigate" onClick={() => previousPage()} disabled={!canPreviousPage}>
                            {'<'}
                        </button>{' '}
                        <button className="button-navigate" onClick={() => nextPage()} disabled={!canNextPage}>
                            {'>'}
                        </button>{' '}
                        <button className="button-navigate" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                            {'>>'}
                        </button>{' '}
                    </div>
                    <div>
                        <span className="text">
                            Página{' '}
                            <strong>
                            {pageIndex + 1} de {pageOptions.length}
                            </strong>{' '}
                        </span>
                        <span className="text">
                            | Ir para página:{' '}
                            <input
                            type="number"
                            defaultValue={pageIndex + 1}
                            onChange={e => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0
                                gotoPage(page)
                            }}
                            style={{ width: '100px' }}
                            />
                        </span>{' '}
                    </div>
                </div>
        </div>
    </>
    )
}

export {Table}
