import React from "react"
import { useTable, usePagination, useSortBy, useFilters, useGlobalFilter, useAsyncDebounce } from "react-table"
import "./GenerateTable.css"
import ReactSelect from 'react-select'

// A great library for fuzzy filtering/sorting items
import { matchSorter } from 'match-sorter'

function columnSelect(column){
    return (
        <div key={column?.data?.id}>
            <label>
            <input type="checkbox" {...column?.data?.getToggleHiddenProps()} />{' '}
            {column?.data?.Header}
            </label>
        </div>
    )
}

// Define a default UI for filtering
function GlobalFilter({
        preGlobalFilteredRows,
        globalFilter,
        setGlobalFilter,
    }) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)

    return (
        <span className="sub-title">
            Search:{' '}
        <input
        className="general-filter text"
            value={value || ""}
            onChange={e => {
                setValue(e.target.value);
                onChange(e.target.value);
            }}
            placeholder={`${count} registros...`}
            style={{
                fontSize: '3vmin',
                border: '0',
            }}
        />
        </span>
    )
}

// Define a default UI for filtering
function DefaultColumnFilter({
        column: { filterValue, preFilteredRows, setFilter },
    }) {
    const count = preFilteredRows.length

    return (
        <input
        className="default-filter text"
            value={filterValue || ''}
            onChange={e => {
            setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
            }}
            placeholder={`Pesquisar ${count} registros...`}
        />
    )
}

// This is a custom filter UI that uses a
// slider to set the filter value between a column's
// min and max values
function SliderColumnFilter({
        column: { filterValue, setFilter, preFilteredRows, id },
    }) {
    // Calculate the min and max
    // using the preFilteredRows

    const [min, max] = React.useMemo(() => {
        let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
        let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
        preFilteredRows.forEach(row => {
            min = Math.min(row.values[id], min)
            max = Math.max(row.values[id], max)
        })
        return [min, max]
    }, [id, preFilteredRows])

    return (
        <>
            <input
                className="slider-filter"
                type="range"
                min={min}
                max={max}
                value={filterValue || min}
                onChange={e => {
                    setFilter(parseInt(e.target.value, 10))
                }}
            />
            <button onClick={() => setFilter(undefined)} className="buttons text">Off</button>
        </>
    )
}

function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val

function GenerateTable({ columns, data }) {
    
    const filterTypes = React.useMemo(
        () => ({
            // Add a new fuzzyTextFilterFn filter type.
            fuzzyText: fuzzyTextFilterFn,
            // Or, override the default text filter to use
            // "startWith"
            text: (rows, id, filterValue) => {
            return rows.filter(row => {
                const rowValue = row.values[id]
                return rowValue !== undefined
                ? String(rowValue)
                    .toLowerCase()
                    .startsWith(String(filterValue).toLowerCase())
                : true
            })
        },
        }),
        []
    )
    
    const defaultColumn = React.useMemo(
        () => ({
            // Let's set up our default Filter UI
            Filter: DefaultColumnFilter,
        }),
        []
    )

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
        visibleColumns,
        preGlobalFilteredRows,
        setGlobalFilter,
        state,
        state: { pageIndex, pageSize },
        } = useTable(
            {
                columns,
                data,
                initialState: { pageIndex: 0 },
                defaultColumn, // Be sure to pass the defaultColumn option
                filterTypes,
            },
            useFilters, // useFilters!
            useGlobalFilter, // useGlobalFilter!
            useSortBy,
            usePagination,
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
                            Mostrar {pageSize}
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
                        components={{ Option: columnSelect }}
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
                            <>
                                <th className="sub-title" {...column.getHeaderProps()}>
                                    <div {...column.getSortByToggleProps()}>
                                        {column.render('Header')}
                                        <span>
                                            {column.isSorted
                                            ? column.isSortedDesc
                                                ? ' 🔽'
                                                : ' 🔼'
                                            : ''}
                                        </span>
                                    </div>
                                    <div className="filters-container">{column.canFilter ? column.render('Filter') : null}</div>
                                </th>
                            </>
                            ))}
                        </tr>
                        ))}
                        <tr>
                            <th
                                colSpan={visibleColumns.length}
                                style={{
                                    textAlign: 'left',
                                }}
                            >
                                <GlobalFilter
                                    preGlobalFilteredRows={preGlobalFilteredRows}
                                    globalFilter={state.globalFilter}
                                    setGlobalFilter={setGlobalFilter}
                                />
                            </th>
                        </tr>
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
                        <button className="button-navigate text" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                            {'<<'}
                        </button>{' '}
                        <button className="button-navigate text" onClick={() => previousPage()} disabled={!canPreviousPage}>
                            {'<'}
                        </button>{' '}
                        <button className="button-navigate text" onClick={() => nextPage()} disabled={!canNextPage}>
                            {'>'}
                        </button>{' '}
                        <button className="button-navigate text" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
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
                                className="text"
                                type="number"
                                defaultValue={pageIndex + 1}
                                onChange={e => {
                                    const page = e.target.value ? Number(e.target.value) - 1 : 0
                                    gotoPage(page)
                                }}
                                style={{ width: '46.8%', borderRadius: '1vmin'}}
                            />
                        </span>{' '}
                    </div>
                </div>
        </div>
    </>
    )
}

export { GenerateTable, SliderColumnFilter }
