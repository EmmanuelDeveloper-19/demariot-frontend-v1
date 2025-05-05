import { MapContainer, TileLayer, Polygon, CircleMarker, Popup } from "react-leaflet"

export const LocationData = () => {
    const zonasPeligrosas = [
        { coords: [[18.8237, -96.9846]], nivel: "alto" },
        { coords: [[18.8238, -96.9845]], nivel: "medio" },
        { coords: [[18.8236, -96.9847]], nivel: "bajo" },
        { coords: [[18.8239, -96.9844]], nivel: "alto" },
        { coords: [[18.8235, -96.9848]], nivel: "medio" },
        { coords: [[18.82365, -96.98455]], nivel: "bajo" },
        { coords: [[18.82375, -96.98445]], nivel: "alto" },
        { coords: [[18.82385, -96.98465]], nivel: "medio" },
        { coords: [[18.82355, -96.98475]], nivel: "bajo" },
        { coords: [[18.82395, -96.98435]], nivel: "alto" }
    ];

    return (
        <MapContainer
            center={[18.823733346952984, -96.98463438111725]}
            zoom={13}
            style={{ height: '100%', width: '100%', zIndex: '0', position: 'relative'}}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />

            {zonasPeligrosas.map((zona, index) => (
                <Polygon
                    key={index}
                    positions={zona.coords}
                    pathOptions={{
                        color: zona.nivel === "alto" ? "red" : "orange",
                        fillOpacity: 0.4,
                    }}
                />
            ))}

            {/* Marcador de ejemplo */}
            <CircleMarker
                center={[18.823733346952984, -96.98463438111725]}
                radius={60}
                pathOptions={{ color: 'red' }}
            >
                <Popup>Nivel de plomo: 1.2mg/L (Peligroso)</Popup>
            </CircleMarker>
        </MapContainer>
    )
}