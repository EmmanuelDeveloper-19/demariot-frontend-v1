import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, GeoJSON, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { LocationData } from '../../components/sensors/locationData';


// Configuración inicial del mapa
const MAP_CENTER = [18.838201, -97.139753]; // Coordenadas de Río Blanco, Ver.
const ZOOM_LEVEL = 14;
const MAP_STYLE = { height: '600px', width: '100%', borderRadius: '10px' };

// Componente HeatmapLayer corregido
const HeatmapLayer = ({ data }) => {
    const map = useMap();
    const layerRef = useRef(null);

    useEffect(() => {
        if (!data.length) return;

        if (!layerRef.current) {
            layerRef.current = L.layerGroup().addTo(map);
        } else {
            layerRef.current.clearLayers();
        }

        data.forEach(point => {
            L.circle([point.lat, point.lng], {
                radius: point.level * 2,
                fillColor: getColorByLevel(point.level),
                color: 'transparent',
                fillOpacity: 0.6,
                weight: 0
            }).addTo(layerRef.current);
        });

        return () => {
            if (layerRef.current) {
                layerRef.current.remove();
            }
        };
    }, [data, map]);

    return null;
};

const getColorByLevel = (level) => {
    if (level > 70) return '#ff0000';
    if (level > 40) return '#ffa500';
    return '#ffff00';
};

// Simulación de datos (serán reemplazados por API)
const usePollutionData = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulación de carga de datos
        const timer = setTimeout(() => {
            setData(generateMockData());
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return { data, loading };
};

// Generador de datos mock (para desarrollo)
const generateMockData = () => {
    const baseCoords = MAP_CENTER;
    return [
        // Puntos de contaminación alrededor del río
        { id: 1, lat: baseCoords[0] + 0.005, lng: baseCoords[1] - 0.003, level: 85, type: 'industrial', pollutants: ['Pb', 'Cd'] },
        { id: 2, lat: baseCoords[0] - 0.002, lng: baseCoords[1] + 0.004, level: 65, type: 'agricultural', pollutants: ['As', 'Hg'] },
        { id: 3, lat: baseCoords[0], lng: baseCoords[1], level: 45, type: 'urban', pollutants: ['NO2', 'SO2'] },
        { id: 4, lat: baseCoords[0] + 0.003, lng: baseCoords[1] + 0.002, level: 70, type: 'industrial', pollutants: ['Pb', 'Cr'] },
        // Agrega más puntos según sea necesario
    ];
};

// Componente de marcadores de contaminación
const PollutionMarkers = ({ data }) => {
    const getMarkerColor = (level) => {
        if (level > 70) return '#ff0000';
        if (level > 40) return '#ffa500';
        return '#ffff00';
    };

    const getMarkerRadius = (level) => {
        return Math.max(8, Math.min(level / 5, 20));
    };

    return (
        <>
            {data.map((point) => (
                <CircleMarker
                    key={point.id}
                    center={[point.lat, point.lng]}
                    radius={getMarkerRadius(point.level)}
                    fillColor={getMarkerColor(point.level)}
                    color="#000"
                    weight={1}
                    opacity={0.7}
                    fillOpacity={0.6}
                >
                    <Popup>
                        <div style={{ minWidth: '150px' }}>
                            <h4 style={{ margin: '0 0 5px 0' }}>Punto #{point.id}</h4>
                            <p><strong>Tipo:</strong> {point.type}</p>
                            <p><strong>Contaminantes:</strong> {point.pollutants.join(', ')}</p>
                            <p><strong>Nivel:</strong> {point.level}%</p>
                            <div style={{
                                height: '10px',
                                background: `linear-gradient(to right, #00ff00, #ffff00, #ff0000)`,
                                margin: '5px 0',
                                borderRadius: '5px'
                            }}></div>
                        </div>
                    </Popup>
                </CircleMarker>
            ))}
        </>
    );
};
export const MapaContaminacion = () => {
    const { data, loading } = usePollutionData();
    const mapRef = useRef();

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>
                            <h2 className="text-title text-primary">Último análisis</h2>
                            <LocationData />
                </div>
            </div>
        </div>
    );
};

{/* 
     <MapContainer
                center={MAP_CENTER}
                zoom={ZOOM_LEVEL}
                style={MAP_STYLE}
                whenCreated={map => { mapRef.current = map; }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                <GeoJSON
                    data={{
                        type: "Feature",
                        geometry: {
                            type: "LineString",
                            coordinates: [
                                [MAP_CENTER[1] - 0.01, MAP_CENTER[0] - 0.005],
                                [MAP_CENTER[1] - 0.005, MAP_CENTER[0]],
                                [MAP_CENTER[1], MAP_CENTER[0]],
                                [MAP_CENTER[1] + 0.007, MAP_CENTER[0] + 0.003],
                                [MAP_CENTER[1] + 0.01, MAP_CENTER[0] + 0.005]
                            ]
                        }
                    }}
                    style={{
                        color: '#1a73e8',
                        weight: 4,
                        opacity: 0.8
                    }}
                />

                {!loading && <HeatmapLayer data={data} />}

                {!loading && <PollutionMarkers data={data} />}
            </MapContainer>

            <div style={{
                position: 'absolute',
                bottom: '20px',
                right: '20px',
                zIndex: 1000,
                background: 'rgba(255, 255, 255, 0.9)',
                padding: '10px',
                borderRadius: '5px',
                boxShadow: '0 0 10px rgba(0,0,0,0.2)'
            }}>
                <h4 style={{ margin: '0 0 10px 0' }}>Leyenda</h4>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                    <div style={{
                        width: '15px',
                        height: '15px',
                        background: '#1a73e8',
                        marginRight: '10px',
                        borderRadius: '50%'
                    }}></div>
                    <span>Río Blanco</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                    <div style={{
                        width: '15px',
                        height: '15px',
                        background: 'red',
                        marginRight: '10px',
                        borderRadius: '50%'
                    }}></div>
                    <span>Alta contaminación</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                    <div style={{
                        width: '15px',
                        height: '15px',
                        background: 'orange',
                        marginRight: '10px',
                        borderRadius: '50%'
                    }}></div>
                    <span>Media contaminación</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{
                        width: '15px',
                        height: '15px',
                        background: 'yellow',
                        marginRight: '10px',
                        borderRadius: '50%'
                    }}></div>
                    <span>Baja contaminación</span>
                </div>
            </div>

            {loading && (
                <div style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    right: '0',
                    bottom: '0',
                    background: 'rgba(255,255,255,0.7)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000
                }}>
                    <div>Cargando datos de contaminación...</div>
                </div>
            )}*/}