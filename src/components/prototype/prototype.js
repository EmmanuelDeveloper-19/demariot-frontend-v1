export const Prototype = () => {
    return (
        <div className="" style={{
           
        }}>
            <h1 className="text-subtitle text-primary" style={{
                fontSize: "1.2rem",
                fontWeight: "700",
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem"
            }}>
                <i className="fas fa-microchip" style={{ color: "#007bff" }}></i>
                Información del Prototipo
            </h1>
            <div className="row">
                <div className="col-md-6" style={{ fontWeight: "500", color: "#555" }}>
                    <p className="text-body text-primary" style={{ marginBottom: "0.5rem" }}>
                        <i className="fas fa-map-marker-alt" style={{ marginRight: "6px", color: "#007bff" }}></i>
                        Coordenadas del prototipo:
                    </p>
                    <p className="text-body text-primary" style={{ marginBottom: "0.5rem" }}>
                        <i className="fas fa-battery-full" style={{ marginRight: "6px", color: "#28a745" }}></i>
                        Nivel de batería:
                    </p>
                    <p className="text-body text-primary" style={{ marginBottom: "0.5rem" }}>
                        <i className="fas fa-microchip" style={{ marginRight: "6px", color: "#17a2b8" }}></i>
                        Estado del dispositivo:
                    </p>
                    <p className="text-body text-primary" style={{ marginBottom: "0.5rem" }}>
                        <i className="fas fa-wifi" style={{ marginRight: "6px", color: "#ffc107" }}></i>
                        Señal de red:
                    </p>
                </div>
                <div className="col-md-6" style={{ color: "#007bff", fontWeight: "600" }}>
                    <a className="text-primary" href="#" title="Ver ubicación del prototipo" style={{
                        display: "inline-block",
                        marginBottom: "0.5rem",
                        textDecoration: "none",
                        color: "#007bff"
                    }}>1, 1</a>
                    <p className="text-primary" style={{ marginBottom: "0.5rem" }}>100%</p>
                    <p className="text-primary" style={{ marginBottom: "0.5rem" }}>Activo</p>
                    <p className="text-primary" style={{ marginBottom: "0.5rem" }}>Buena</p>
                </div>
            </div>
        </div>
    );
}
