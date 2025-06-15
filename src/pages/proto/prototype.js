import { ColorimetryTable } from "../history/colorimetryTable"

export const Prototype1 = () => {

    return (
        <>
            <div className="container">
                <div className="row mb-1">
                    <h1 className="text-subtitle text-primary">Gestión del prototipo</h1>
                </div>
                <div className="row mt-1">
                    <div className="col-md-6">
                        <h1 className="text-subtitle text-primary">Ubicación del prototipo</h1>
                    </div>
                    <div className="col-md-6">
                        <h1 className="text-subtitle text-primary">Acciones del prototipo</h1>
                        
                        <button className="btn btn-primary">Encender prototipo</button>
                        <br></br>
                        <button className="btn btn-secondary">Recoger muestra</button>
                    </div>
                </div>
                <div className="mt-1">
                    <ColorimetryTable/>
                </div>
            </div>
        </>
    )

}