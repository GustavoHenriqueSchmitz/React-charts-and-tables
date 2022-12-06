import Chart from 'react-apexcharts'

function ColumnGraphic({options}) {

    return (
        <Chart options={options.options} series={options.series} type="bar" height={350}/>
    )
}

export { ColumnGraphic }