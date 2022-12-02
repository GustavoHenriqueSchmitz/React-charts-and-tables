import './GraphicTable.css'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function ButtonsGraphicTable({textButtonLeft, textButtonRight}) {
    return (
        <div className="buttons-graphic-table">
            <div className="buttons button-left sub-title"><Link className="links" to="/grafico">{textButtonLeft}</Link></div>
            <div className="buttons button-right sub-title"><Link className="links" to="/tabela">{textButtonRight}</Link></div>
        </div>
    )
}

ButtonsGraphicTable.propTypes = {
    textButtonLeft: PropTypes.string.isRequired,
    textButtonRight: PropTypes.string.isRequired
}

export { ButtonsGraphicTable }