import { ButtonsGraphicTable } from "./buttons/GraphicTable"
import { GenerateGraphic } from "./graphic/GenerateGraphic"
import { Header } from "./header/Header"

function Graphic() {
    return (
        <>
            <Header title="GRÁFICO"/>
            <ButtonsGraphicTable textButtonLeft="Gráfico" textButtonRight="Tabela"/>
            <GenerateGraphic/>
        </>
    )
}

export { Graphic }
