import Chart from 'react-apexcharts'

function GenerateGraphic() {

    const state = {
            options: {teste: 'ola', yu: 'teste2'},
            salaries: [44, 55, 41, 97, 15],
            labels: ['0 a 500', '500 a 1000', '1000 a 2000', '2000 a 10000', '10000 >']
        }

    return (
        <>
            <div className="donut">
                <Chart options={state.options} series={state.salaries} type="donut" width="380" />
            </div>
        </>
    )
}

export { GenerateGraphic }