import Chart from 'react-apexcharts'
import PropTypes from 'prop-types'

function ColumnGraphic({
        seriesData1,
        seriesName1,
        seriesData2,
        seriesName2,
        categories,
        title,
    }) {

    try {
        const options = {
            series: [{
                    name: seriesName1,
                    data: seriesData1
                }, {
                    name: seriesName2,
                    data: seriesData2
                },
            ],
            options: {
                dataLabels: {
                    enabled: false
                },
                xaxis: {
                    categories: categories
                },
                title: {
                    text: title,
                    align: 'top'
                },
            },
        };

        return (
            <Chart options={options.options} series={options.series} type="bar" height={350}/>
        )
    } catch {}
}

ColumnGraphic.propTypes = {
    seriesData1: PropTypes.array.isRequired,
    seriesData2: PropTypes.array.isRequired,
    seriesName1: PropTypes.string.isRequired,
    seriesName2: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
}

export { ColumnGraphic }