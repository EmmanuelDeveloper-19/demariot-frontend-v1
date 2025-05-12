import React from "react";

export const Prototype = () => {

    const prototype = {
      id_prototype: "PROTO-001",
      created_at: "2025-05-01T14:23:00Z",
      status: "Activo",
      battery: 82,
      location: {
        type: "Point",
        coordinates: [-99.1332, 19.4326] // CDMX
      },
      network: {
        signal_strength: 72,
        last_connection: "2025-05-04T08:00:00Z"
      },
      activity_log: [
        { time: "2025-05-04 08:00", event: "Conexión exitosa" },
        { time: "2025-05-03 14:21", event: "Datos enviados" },
        { time: "2025-05-03 08:00", event: "Conexión perdida" }
      ]
    };
  
    const batteryClass = prototype.battery > 75 ? 'high' : prototype.battery > 40 ? 'medium' : 'low';
    const signalClass = prototype.network.signal_strength > 70 ? 'strong' : prototype.network.signal_strength > 40 ? 'moderate' : 'weak';
  
    return (
      <div className="prototype-container">
        <h1>Gestión del Prototipo IoT</h1>
  
        <section className="info-grid">
          <div>
            <h3>ID del prototipo</h3>
            <p>{prototype.id_prototype}</p>
          </div>
          <div>
            <h3>Estado</h3>
            <span className={`status-badge ${prototype.status.toLowerCase()}`}>
              {prototype.status}
            </span>
          </div>
          <div>
            <h3>Batería</h3>
            <div className={`battery-bar ${batteryClass}`}>
              {prototype.battery}%
            </div>
          </div>
          <div>
            <h3>Última conexión</h3>
            <p>{prototype.network.last_connection}</p>
          </div>
          <div>
            <h3>Señal de red</h3>
            <div className={`signal ${signalClass}`}>
              {prototype.network.signal_strength}%
            </div>
          </div>
          <div>
            <h3>Ubicación</h3>
            <p>Lat: {prototype.location.coordinates[1]}</p>
            <p>Lng: {prototype.location.coordinates[0]}</p>
          </div>
        </section>
  
        <section className="action-buttons">
          <button className="btn primary">Actualizar firmware</button>
          <button className="btn warning">Reiniciar</button>
          <button className="btn danger">Eliminar prototipo</button>
        </section>
  
        <section className="activity-log">
          <h3>Actividad reciente</h3>
          <ul>
            {prototype.activity_log.map((log, index) => (
              <li key={index}>
                <span className="time">{log.time}</span>
                <span className="event">{log.event}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    );
  };