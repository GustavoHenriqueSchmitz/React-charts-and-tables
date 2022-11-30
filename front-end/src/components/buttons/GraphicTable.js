import './GraphicTable.css'
import PropTypes from 'prop-types'

function ButtonsGraficTable({textButtonLeft, textButtonRight}) {
    return (
        <div className="container-buttons">
            <div className="buttons button-left">{textButtonLeft}</div>
            <div className="buttons button-right">{textButtonRight}</div>
        </div>
    )
}

ButtonsGraficTable.propTypes = {
    textButtonLeft: PropTypes.string.isRequired,
    textButtonRight: PropTypes.string.isRequired
}

export { ButtonsGraficTable }