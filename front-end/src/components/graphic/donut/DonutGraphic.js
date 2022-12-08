import Chart from 'react-apexcharts'
import './DonutGraphic.css'
import PropTypes from 'prop-types'

function DonutGraphic({series, labels}) {

    const options = {
        series: series,
        labels: labels,
        title: {
            text: 'Salários dos funcionários | Por intervalo',
            align: 'top'
        },
    }

    return (
        <>
            <div className="chart-container">
                <Chart options={options} series={options.series} type="donut" width={480} />
            </div>
        </>
    )
}

DonutGraphic.propTypes = {
    series: PropTypes.array.isRequired,
    labels: PropTypes.array.isRequired,
}

export { DonutGraphic }
