import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import { getColorimetrySensorData } from "../../services/sensores";
import "leaflet/dist/leaflet.css";

const getColorPorConcentracion = (concentracion) => {
    if (concentracion >= 1.0) return "red";     // peligroso
    if (concentracion >= 0.5) return "orange";  // medio
    return "yellow";                            // bajo
};

export const LocationData = () => {
    const [datosMetales, setDatosMetales] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getColorimetrySensorData();

                const datos = Array.isArray(res.data)
                    ? res.data
                    : res.data.colorimetrySensor || [];

                const conCoordenadas = datos.filter(
                    (d) =>
                        d.location &&
                        Array.isArray(d.location.coordinates) &&
                        d.location.coordinates.length === 2 &&
                        typeof d.location.coordinates[0] === "number" &&
                        typeof d.location.coordinates[1] === "number"
                );

                setDatosMetales(conCoordenadas);
            } catch (err) {
                console.error("Error al obtener datos:", err);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 10000);
        return () => clearInterval(interval);
    }, []);

    // Estadísticas rápidas
    const total = datosMetales.length;
    const peligrosos = datosMetales.filter(d => d.metals.concentration_mgL >= 1.0).length;
    const medios = datosMetales.filter(d => d.metals.concentration_mgL >= 0.5 && d.metals.concentration_mgL < 1.0).length;
    const bajos = total - peligrosos - medios;

    return (
        <div style={{ display: 'flex', position: 'relative' }}>
            {/* Mapa */}
            <MapContainer
                center={[18.8237, -96.9846]}
                zoom={14}
                style={{ height: '500px', width: '100%' }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />

                {datosMetales.map((sensor, index) => {
                    const coords = sensor.location.coordinates;
                    if (!Array.isArray(coords) || coords.length !== 2) return null;

                    const [lng, lat] = coords;
                    const color = getColorPorConcentracion(sensor.metals.concentration_mgL);

                    return (
                        <CircleMarker
                            key={index}
                            center={[lat, lng]}
                            radius={15}
                            pathOptions={{ color, fillColor: color, fillOpacity: 0.6 }}
                        >
                            <Popup>
                                <strong>Sensor:</strong> {sensor.id_sensor}<br />
                                <strong>Metal:</strong> {sensor.metals.metal}<br />
                                <strong>Concentración:</strong> {sensor.metals.concentration_mgL} mg/L<br />
                                <strong>Nivel:</strong> {
                                    color === "red" ? "Peligroso" :
                                        color === "orange" ? "Medio" : "Bajo"
                                }<br />
                                {sensor.timestamp && (
                                    <>
                                        <strong>Fecha:</strong> {new Date(sensor.timestamp).toLocaleString()}<br />
                                    </>
                                )}
                            </Popup>
                        </CircleMarker>
                    );
                })}
            </MapContainer>

            {/* Leyenda */}
            <div style={{
                position: "absolute",
                bottom: 20,
                left: 20,
                backgroundColor: "white",
                padding: "10px",
                borderRadius: "8px",
                boxShadow: "0 0 6px rgba(0,0,0,0.2)",
                fontSize: "14px"
            }}>
                <strong>Leyenda:</strong><br />
                <div><span style={{ backgroundColor: "red", width: 12, height: 12, display: "inline-block", marginRight: 6 }} /> Peligroso (≥ 1.0 mg/L)</div>
                <div><span style={{ backgroundColor: "orange", width: 12, height: 12, display: "inline-block", marginRight: 6 }} /> Medio (0.5 - 0.99 mg/L)</div>
                <div><span style={{ backgroundColor: "yellow", width: 12, height: 12, display: "inline-block", marginRight: 6 }} /> Bajo (&lt; 0.5 mg/L)</div>
            </div>

            {/* Estadísticas rápidas */}
            <div style={{
                position: "absolute",
                top: 20,
                right: 20,
                backgroundColor: "#fff",
                padding: "10px 15px",
                borderRadius: "8px",
                boxShadow: "0 0 6px rgba(0,0,0,0.2)",
                fontSize: "14px",
                minWidth: "160px"
            }}>
                <strong>Resumen</strong><br />
                Total sensores: {total}<br />
                🟥 Peligrosos: {peligrosos}<br />
                🟧 Medios: {medios}<br />
                🟨 Bajos: {bajos}
            </div>
        </div>
    );
};
