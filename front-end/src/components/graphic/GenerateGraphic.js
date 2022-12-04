import Chart from 'react-apexcharts'
import './GenerateGraphic.css'

function GenerateGraphic({options}) {

    return (
        <>
            <div className="chart-container">
                <Chart options={options} series={options.series} type="donut" width="600px" />
            </div>
        </>
    )
}

export { GenerateGraphic }