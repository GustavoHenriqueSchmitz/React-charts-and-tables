import './GraphicTable.css'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function ButtonsGraficTable({textButtonLeft, textButtonRight}) {
    return (
        <div className="buttons-graphic-table">
            <div className="buttons button-left sub-title">{textButtonLeft}</div>
            <div className="buttons button-right sub-title"><Link className="links" to="/tabela">{textButtonRight}</Link></div>
        </div>
    )
}

ButtonsGraficTable.propTypes = {
    textButtonLeft: PropTypes.string.isRequired,
    textButtonRight: PropTypes.string.isRequired
}

export { ButtonsGraficTable }