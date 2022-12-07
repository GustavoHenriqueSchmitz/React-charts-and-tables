import Chart from 'react-apexcharts'

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
                yaxis: {
                    title: {
                        text: title
                    }
                },
            },
        };

        return (
            <Chart options={options.options} series={options.series} type="bar" height={350}/>
        )
    } catch {}
}

export { ColumnGraphic }