import { ButtonsGraphicTable } from "../buttons/GraphicTable"
import { Header } from "../header/Header"
import './principal.css'

function Principal() {
    return (
        <div className="principal">
            <Header title="PÁGINA INICIAL"/>
            <ButtonsGraphicTable textButtonLeft="Gráfico" textButtonRight="Tabela"/>
        </div>
    )
}

export { Principal }