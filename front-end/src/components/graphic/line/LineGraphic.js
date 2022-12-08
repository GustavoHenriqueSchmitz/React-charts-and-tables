import Chart from 'react-apexcharts'
import PropTypes from 'prop-types'

function LineGraphic({name, data, categories, text}) {

    try {
        const options = {
            series: [{
                name: name,
                data: data
            }],
            options: {
                chart: {
                    height: 350,
                    type: 'line',
                    zoom: {
                        enabled: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                curve: 'smooth'
                },
                title: {
                    text: text,
                    align: 'top'
                },
                grid: {
                    row: {
                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                },
                xaxis: {
                    categories: categories,
                }
            },
        };
        
        return (
            <Chart options={options.options} series={options.series} type="line" height={350} />
        )
    } catch {}
}

LineGraphic.propTypes = {
    name: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
    text: PropTypes.string.isRequired,
}

export { LineGraphic }
