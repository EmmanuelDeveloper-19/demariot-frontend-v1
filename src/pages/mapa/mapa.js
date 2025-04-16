import React, { useContext, useState } from 'react';
import { Droplet, AlertTriangle, Thermometer, Clock } from 'lucide-react';

export const Mapa = () => {
  const [selectedMetric, setSelectedMetric] = useState('mercury');

  const latestReading = {
    mercury: 0.015,
    lead: 0.010,
    cadmium: 0.002,
    arsenic: 0.020,
    copper: 0.050,
    temperature: 25.5,
    timestamp: '2025-04-15T12:34:56Z',
    sensorId: 'SENSOR-001',
    location: 'Río Contaminado, Sector 4'
  };

  const handleChangeMetric = (e) => {
    setSelectedMetric(e.target.value);
  };

  return (
    <div className="container">
      <h1 className="titulo">Mapa de Metales Pesados</h1>
      <div className="row">
        <div className="col-md-9">
          <div className="panel">
            <svg className="svg-map">
              {/* Aquí va el mapa en SVG */}
              <text x="50%" y="50%" textAnchor="middle" fill="#aaa">
                Mapa SVG
              </text>
            </svg>
            <div className="sensor-info">
              <Clock size={16} />
              Última lectura: {new Date(latestReading.timestamp).toLocaleString()}
            </div>
            <div className="sensor-info">
              <Thermometer size={16} />
              Temp: {latestReading.temperature} °C
            </div>
            <div className="sensor-info">
              Sensor ID: {latestReading.sensorId}
            </div>
            <div className="sensor-info">
              Ubicación: {latestReading.location}
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="panel">
            <h2>Últimas Lecturas</h2>

            <div className="reading-card">
              <div className="reading-icon">
                <Droplet size={20} />
                <span>Mercurio (Hg)</span>
              </div>
              <span className="font-mono font-bold">
                {latestReading.mercury.toFixed(3)} mg/L
              </span>
            </div>

            <div className="reading-card">
              <div className="reading-icon">
                <Droplet size={20} />
                <span>Plomo (Pb)</span>
              </div>
              <span className="font-mono font-bold">
                {latestReading.lead.toFixed(3)} mg/L
              </span>
            </div>

            <div className="reading-card">
              <div className="reading-icon">
                <Droplet size={20} />
                <span>Cadmio (Cd)</span>
              </div>
              <span className="font-mono font-bold">
                {latestReading.cadmium.toFixed(3)} mg/L
              </span>
            </div>

            <div className="reading-card">
              <div className="reading-icon">
                <Droplet size={20} />
                <span>Arsénico (As)</span>
              </div>
              <span className="font-mono font-bold">
                {latestReading.arsenic.toFixed(3)} mg/L
              </span>
            </div>

            <div className="reading-card">
              <div className="reading-icon">
                <Droplet size={20} />
                <span>Cobre (Cu)</span>
              </div>
              <span className="font-mono font-bold">
                {latestReading.copper.toFixed(3)} mg/L
              </span>
            </div>

            <div className="alert">
              <AlertTriangle size={20} />
              Niveles de arsénico superan el límite seguro.
            </div>
          </div>

          <div className="panel">
            <label htmlFor="metric-select">Seleccionar métrica:</label>
            <select
              id="metric-select"
              value={selectedMetric}
              onChange={handleChangeMetric}
              className="metric-select"
            >
              <option value="mercury">Mercurio</option>
              <option value="lead">Plomo</option>
              <option value="cadmium">Cadmio</option>
              <option value="arsenic">Arsénico</option>
              <option value="copper">Cobre</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mapa;
