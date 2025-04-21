import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";

const datosContaminacion = [
    {
        lat: 18.8500,
        lng: -97.0333,
        metal: 'Plomo',
        concentracion: 35,
        color: 'white',
    },
    {
        lat: 18.8600,
        lng: -97.0300,
        metal: 'Mercurio',
        concentracion: 20,
        color: 'blue',
      },
      {
        lat: 18.8700,
        lng: -97.0250,
        metal: 'Arsénico',
        concentracion: 15,
        color: 'yellow',
      },
];

export const MapaContaminacion = () => {
    return (
      <MapContainer
        center={[18.85, -97.03]} // Centrado en Río Blanco, Veracruz
        zoom={13}
        style={{ height: 400, width: 400 }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />
  
        {datosContaminacion.map((punto, index) => (
          <CircleMarker
            key={index}
            center={[punto.lat, punto.lng]}
            radius={15}
            pathOptions={{ color: punto.color, fillColor: punto.color, fillOpacity: 0.6 }}
          >
            <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent>
              <div>
                <strong>{punto.metal}</strong><br />
                {punto.concentracion} ppm
              </div>
            </Tooltip>
          </CircleMarker>
        ))}
      </MapContainer>
    );
  }