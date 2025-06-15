import React, { useState } from "react";
import { Modal } from "../../components/Modal";

export const Prototype = () => {
  const [showModal, setShowModal] = useState(false);

  const handleMuestra = () => {
    setShowModal(true);
  }
  return (
    <div className="container">
      <h1 className="text-subtitle text-primary">Gestión del prototipo </h1>
      <div className="row">
        <div className="col-md-6">
          <h1 className="text-subtitle text-primary">Estatus del prototipo</h1>
          <div className="row mt-1">
            <p className="text-primary">Estado: </p>
            <span className="btn btn-outline-primary">Encendido</span>
          </div>
          <div className="row mt-1">
            <p className="text-primary">Nivel de bateria: </p>
            <span className="text-primary text-bold">50 %</span>
          </div>
          <div className="row mt-1">
            <p className="text-primary">Ubicación : <span>1233°</span></p>
            <span className="btn btn-outline-primary">Ver ubicación</span>
          </div>
        </div>

        <div className="col-md-6">
          <h1 className="text-primary text-subtitle">Acciones</h1>
          <div className="row">
            <button className="btn btn-primary">Encender prototipo</button>
          </div>
          <div className="row mt-1">
            <button className="btn btn-primary" onClick={() => handleMuestra()}>Recoger muestra</button>
          </div>
        </div>
      </div>
      <div className="row mt-1">
        <div className="table-container mt-1">
          <table className="content-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre del sensor</th>
                <th>Valores</th>
                <th>Fecha de recopilación</th>
                <th>Coordenadas</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={showModal}
        title="Muestra"
        message={
          <div className="flex-column">
            <p>Datos del analisis</p>
            <div className="input-box">
              <label>Color arrojado: </label>
              <input placeholder="Ingrese el color en rgba"/>
            </div>
          </div>
        }
        onCancel={() => setShowModal(false)}
      />
    </div>
  )
}
/* 

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
      <div className="container">
        <h1 className="text-primary text-subtitle">Gestión del Prototipo IoT</h1>
  
        <section className="info-grid">
          <div className="card bg-primary">
            <p className="text-primary text-body text-bold">ID del prototipo</p>
            <p className="text-primary text-body">{prototype.id_prototype}</p>
          </div>
          <div>
            <h1>Estado</h1>
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
  };*/