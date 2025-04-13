
export const Home = () => {

    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="card card-flex">
                        <div className="col-md-6 contenido-izquierdo">
                            <iframe
                                title="Mapa de rio Blanco Veracruz"
                                className="mapa"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.123456789!2d-97.123456!3d18.123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85c5b123456789ab%3A0x123456789abcdef!2sR%C3%ADo%20Blanco%2C%20Veracruz%2C%20M%C3%A9xico!5e0!3m2!1ses-419!2smx!4v1610000000000!5m2!1ses-419!2smx"
                                referrerpolicy="no-referrer-when-downgrade">
                            </iframe>

                        </div>
                        <div className="col-md-6 contenido-derecho">
                            <h1>DemarIoT Dashboard</h1>
                            <p className="texto">
                            Bienvenido al panel de control de Demariot,
                            en este sistema puedes obtener información en tiempo real de los 
                            datos recopilados por el prototipo 
                            </p>
                            <button>Ver información del prototipo </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}