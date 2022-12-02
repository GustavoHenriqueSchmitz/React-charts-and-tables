import { ButtonsGraphicTable } from "./buttons/GraphicTable"
import { Header } from "./header/Header"

function Graphic() {
    return (
        <>
            <Header title="GRÁFICO"/>
            <ButtonsGraphicTable textButtonLeft="Gráfico" textButtonRight="Tabela"/>
        </>
    )
}

export { Graphic }
