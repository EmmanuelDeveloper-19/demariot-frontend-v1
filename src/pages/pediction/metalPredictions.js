import { MercurioTable } from "../history/metals/mercurio"

export const MetalPrediction = () => {

    return(
        <>
            <h1 className="text-subtitle text-primary">Predicciones para Mercurio</h1>
            <p className="text-body text-primary">En esta seccion se muestran las posibles variaciones de mercurio en los proximos meses.</p>

            <MercurioTable/>
        </>
    )
}