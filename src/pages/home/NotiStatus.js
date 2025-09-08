export const NotiStatus = () => {
    return (
        <div className="card align-items-center">
            <div className="card-body align-items-center">
                <h1 className="text-primary">El estado actual del agua es: </h1>
                <div className="rounded-icon">
                    <i className="fa fa-check"></i>
                </div>
                <h1 className="text-bold text-primary">Estable</h1>
                <p className="text-primary">Los niveles se encuentran en el promedio recomendado. 
                     <a className="url-link"> Leer acerca de los niveles recomendados.</a>
                </p>

            </div>
        </div>
    )
}