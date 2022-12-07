import Chart from 'react-apexcharts'
import './DonutGraphic.css'

function DonutGraphic({series, labels}) {

    const options = {
        series: series,
        labels: labels
    }

    return (
        <>
            <div className="chart-container">
                <Chart options={options} series={options.series} type="donut" width="500px" />
            </div>
        </>
    )
}

export { DonutGraphic }