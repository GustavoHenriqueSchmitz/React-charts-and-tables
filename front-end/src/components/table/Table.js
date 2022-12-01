import React from "react"
import { useTable, usePagination  } from "react-table"
import "./Table.css"
import ReactSelect from 'react-select'

const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
        const defaultRef = React.useRef()
        const resolvedRef = ref || defaultRef

        React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate
        }, [resolvedRef, indeterminate])

        return <input type="checkbox" ref={resolvedRef} {...rest} />
    }
)

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
        pageCount,
        allColumns,
        gotoPage,
        nextPage,
        getToggleHideAllColumnsProps,
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
        <div className="checkboxes-container">
            <div>
                <IndeterminateCheckbox {...getToggleHideAllColumnsProps()} /> Toggle
                All
            </div>
            {allColumns.map(column => (
                <div key={column.id}>
                    <label>
                    <input type="checkbox" {...column.getToggleHiddenProps()} />{' '}
                    {column.id}
                    </label>
                </div>
            ))}
            </div>
            <div className="table-container">
                <table className="table" {...getTableProps()}>
                    
                    <thead>
                        {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
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
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                            </tr>
                        )
                        })}
                    </tbody>
                
                </table>
                <div className="pagination">
                    <button className="button" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                        {'<<'}
                    </button>{' '}
                    <button className="button" onClick={() => previousPage()} disabled={!canPreviousPage}>
                        {'<'}
                    </button>{' '}
                    <button className="button" onClick={() => nextPage()} disabled={!canNextPage}>
                        {'>'}
                    </button>{' '}
                    <button className="button" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                        {'>>'}
                    </button>{' '}
                    <span>
                        Page{' '}
                        <strong>
                        {pageIndex + 1} of {pageOptions.length}
                        </strong>{' '}
                    </span>
                    <span>
                        | Go to page:{' '}
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
                    <select
                        value={pageSize}
                        onChange={e => {
                        setPageSize(Number(e.target.value))
                        }}
                        className="select"
                    >
                        {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                        ))}
                    </select>
                </div>
        </div>
    </>
    )
}

export {Table}
